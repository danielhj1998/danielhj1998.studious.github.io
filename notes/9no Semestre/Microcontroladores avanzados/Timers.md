---
layout: note
---

El ATmega328P cuenta con 3 temporizadores o contadores (cuando se utiliza una fuente externa), el Timer0 y Timer 2 de 8 bit y Timer3 de 16 bit. También tienen la posibilidad de generar PWM de periodo variable.

## Fuente de reloj interna o externa
Todos los timer pueden utilizar la fuente interna del microcontrolador $clk_{I/O}$, pero también pueden utilizar fuentes de reloj externas. En el caso de los timer 0 y 1 la fuente externa es **síncrona**, puesto que el microcontrolador realiza un muestreo en el pin `T0/T1` de la señal externa de reloj $clk_{T0S}$ / $clk_{T1S}$ en cada ciclo máquina. Debido al proceso mediante el cual se realiza la detección de flanco (ascendente o descendente), la frecuencia máxima de la fuente externa es menor a $\frac{f_{\text{clk}_\text{I/O}}}{2.5}$ como se explica en el [datasheet (pag.114)](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=114).

La fuente de reloj se selecciona mediante los bits `CS02:0`/`CS12:0` del registro `TCCR0B`/`TCCR1B` como se muestra en la siguiente tabla:

| `CS02`/`CS12` | `CS01`/`CS11` | `CS00`/`CS10` | Descripción                                              |
| -             | -             | -             | -                                                        |
| 0             | 0             | 0             | Sin fuente de reloj (paro)                               |
| 0             | 0             | 1             | $\text{clk}_\text{I/O}/1$ (sin preescalamiento)          |
| 0             | 1             | 0             | $\text{clk}_\text{I/O}/8$                                |
| 0             | 1             | 1             | $\text{clk}_\text{I/O}/64$                               |
| 1             | 0             | 0             | $\text{clk}_\text{I/O}/256$                              |
| 1             | 0             | 1             | $\text{clk}_\text{I/O}/1024$                             |
| 1             | 1             | 0             | Fuente de reloj externa en `T0/T1` de flanco descendente |
| 1             | 1             | 1             | Fuente de reloj externa en `T0/T1` de flanco ascendente  |

El Timer2 está conectado por default a $\text{clk}_\text{I/O}$, sin embargo tiene un *modo de operación asíncrona* que utiliza únicamente una señal de reloj externa. Esta se activa mediante el bit `AS2` del registro `ASSR`. Entonces se utiliza el cuarzo externo que se utiliza entre los pines `TOSC1` y `TOSC2` que está optimizado para un cristal de $32.768\ \text{kHz}$. Las ventajas de esto es que se puede utilizar el timer 2 como un contador en tiempo real, además seguiría funcionando en modo de suspensión del microcontrolador.

El preescalador del timer 2 se controla por medio de los pines `CS22:CS20` del registro `TCCR2B` como se muestra en la siguiente tabla ($\text{clk}_\text{TS2}$ es la señal de reloj seleccionada para Timer2):

| `CS22` | `CS21` | `CS20` | Descripción                                              |
| -      | -      | -      | -                                                        |
| 0      | 0      | 0      | Sin fuente de reloj (paro)                               |
| 0      | 0      | 1      | $\text{clk}_\text{T2S}/1$ (sin preescalamiento)          |
| 0      | 1      | 0      | $\text{clk}_\text{T2S}/8$                                |
| 0      | 1      | 1      | $\text{clk}_\text{T2S}/32$                               |
| 1      | 0      | 0      | $\text{clk}_\text{T2S}/64$                               |
| 1      | 0      | 1      | $\text{clk}_\text{T2S}/128$                              |
| 1      | 1      | 0      | $\text{clk}_\text{T2S}/256$                              |
| 1      | 1      | 1      | $\text{clk}_\text{T2S}/1024$                             |

# Cálculos de tiempo
El tiempo que le toma a cada conteo se calcula de la siguiente forma:

$$
t_\text{cont} = (\text{CM})(\text{preescala}) = \frac{1}{f_\text{clk}}(\text{preescala})
$$

Entonces el tiempo de [desbordamiento](#desbordamiento) para cada timer para cada preescala, tomando en cuenta una frecuencia de reloj de $f_\text{clk} = 16 \text{ MHz}$ (Arduino), se muestran en la siguiente tabla:

| Preescala | `T0`/`T2` (8 bit)   | `T1` (16 bit)         |
| -         | -                   | -                     |
| 1         | $16 \text{ ns}$     | $4.096 \text{ ms}$    |
| 8         | $0.128 \text{ ms}$  | $32.768 \text{ ms}$   |
| 32        | $0.512 \text{ ms}$  | $131.072 \text{ ms}$  |
| 64        | $1.024 \text{ ms}$  | $262.144 \text{ ms}$  |
| 128       | $2.048 \text{ ms}$  | $524.288 \text{ ms}$  |
| 256       | $4.096 \text{ ms}$  | $1048.576 \text{ ms}$ |
| 1024      | $16.384 \text{ ms}$ | $4194.304 \text{ ms}$ |

## Interrupción por desbordamiento
Un desbordamiento del timer ocurre en un evento de conteo cuando el contador ya ha alcanzado su máxima capacidad `0xFF` para Timer 0 y 2 y `0xFFFF` para Timer1. Al desbordarse el registro correspondiente a cada timer `TCNT`, se reinicia el contador y ocurre una llamada a interrupción que activa la bandera de desbordamiento en el registro `TIFR`. Para habilitar las interrupciones por desbordamiento de algún timer, se debe actvar el bit `TOIE` de su respectivo registro `TIMSK`.

Los registros `TCNT` se pueden escribir, por lo que se puede modificar el conteo de los timers para hacer conteos exactos. Entonces si se quisiera la interrupción a sólo dos conteos, lo único que hay que hacer es poner el valor en `TCNT` a una unidad menos que su máxima capacidad (eg. 256 - 2 = 254 para un timer de 8 bit).

### Programación en C de interrupciones por desbordamiento
Para utilizar las interrupciones por desbordamiento de los timers del ATmega328P en lenguaje `C`, se puede seguir este procedimiento:

1. Importar la librería `avr/interrupt.c`
    ```c
    #include<avr/interrupt.h>
    ```
3. Definir la rutina de interrupción `ISR` para el vector de interrupción deseado `TIMER0_OVF_vect`/`TIMER1_OVF_vect`/`TIMER2_OVF_vect`
    ```c
    ISR (TIMER0_OVF_vect) {
        // Código de rutina de interrupción de desbordamiento para TIMER0
    }
    ISR (TIMER1_OVF_vect) {
        // Código de rutina de interrupción de desbordamiento para TIMER1
    }
    ISR (TIMER2_OVF_vect) {
        // Código de rutina de interrupción de desbordamiento para TIMER2
    }
    ```
5. Configurar las interrupciones por desbordamiento y el preescalador

    Ejemplo que configura las interrupciones por desbordamiento para el Timer0, con una preescala de 1024 y en la interrupción suma un 1 al PORTD.
    ```c
    int main(void)
    {
        cli();
        TCCR0B = (1<<CS02)|(0<<CS01)|(1<<CS00); //preescala a 1024
        TIMSK0 = (1<<TOIE0); // habilitar interrupción por desbordamiento del timer0
        sei();
    }
    ```

## Interrupciones por comparación
Para cualquiera de los timers, se pueden hacer llamadas a interrupción cuando el contador llega a un valor `TCNTx`(`x` = `0`,`1`,`2`) que se iguala a cualquiera de los valores en los registros `OCRxA` o `OCRxB` . Cuando ocurre un *match*, la bandera `OCFxA` o `OCFxB` se levanta en el siguiente ciclo máquina y se hace la llamada a la respectiva interrupción, si está habilitada por medio de los bits `OCIExA` y `OCIExB` del registro `TIMSKx`

### Programación en C de interrupciones por comparación del timer

1. Importar la librería `avr/interrupt.c`

    ```c
    #include<avr/interrupt.h>
    ```
    
3. Definir la rutina de interrupción `ISR` para el vector de interrupción deseado `TIMERx_COMPA_vect`/`TIMERx_COMPB_vect`

    ```c
    ISR (TIMER0_COMPA_vect) {
        // Código de rutina de interrupción de comparación en OCR0A para TIMER0
    }
    
    ISR (TIMER0_COMPB_vect) {
        // Código de rutina de interrupción de comparación en OCR0B para TIMER0
    }
    ```
    
4. Configurar las interrupciones por desbordamiento y el preescalador

    Ejemplo que configura las interrupciones por comparación de `OCR0A` y `OCR0B` para el Timer0, con una preescala de 1024.

    ```c
    int main(void)
    {
        cli();
        TCCR0B = (1<<CS02)|(0<<CS01)|(1<<CS00); //preescala a 1024
        TIMSK0 = (1<<OCIE0A)|(1<<OCIE0B); // habilitar interrupción por comparación del timer0 para OCR0A y OCIE0B
        OCR0A = 0xF0 // Valor de comparación OCR0A
        OCR0B = 0x0F // Valor de comparación OCR0B
        sei();
    }
    ```
    
## Modos de operación
Los modos de operación se definen con los bits `WGMx2` del registro `TCCRxB` en conjunto con los bits `WGMx1:0` del registro `TCCRxA` como se muestra en la [tabla 14-8 del datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=86). En estas notas no se explican todos los modos de operación.

### Modo CTC
El modo Clear Timer on Compare match  o CTC por sus síglas en inglés, permite reiniciar el contador al alcanzar el valor en `OCRxA`. Aunque esto puede hacerse de forma *manual* por medio de la interrupción por comparación, se gastan muchos más ciclos de máquina. Utilizar el modo CTC es mucho más rápido pues es en hardware.

Esto sirve para poder variar la frecuencia de las interrupciones. Además, esto permite generar una señal de onda cuadrada de frecuencia variable como se ve en la [figura 14-5 del datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=79). Para esto, se puede configurar el microcontrolador para que cambie el nivel lógico en el pin automáticamente al ocurrir el match, tanto para el pin `OCxA` como el `OCxB`, siempre y cuando estos pines estén configurados como salidas. Esto se hace mediante los pines `COMxA1:0` y `COMxB1:0` del registro `TCCRxA` con cualquiera de las configuraciones de la [tabla 14-2 del datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=84).

Generando una forma de onda cuadrada de frecuencia variable, de forma tal que hace un toggle en cada match. Para calcular la frecuencia de dicha onda, se ocupa la siguiente fórmula:

$$
f_{OCn} = \frac{f_{clk I/O}}{2N(1+OCRn)}
$$

Donde:
$N$ es la preescala
$OCRn$ es el valor en `OCRxA`/`OCRxB`

