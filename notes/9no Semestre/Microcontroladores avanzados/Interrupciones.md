---
layout: note
---

El ATmega328P tiene varios [vectores de interrupción](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=49). Existe una bandera de interrupciones global `I` del registro `SREG`, que habilita `1` o deshabilita `0` las interrupciones de forma global. Además de la bandera global `l`, se necesita habilitar la máscara asociada a cada interrupción para que funcione la misma. Otra forma de activar/desactivar la bandera de interrupción global, es con los métodos `cli()`/`sei()` respectivamente.

De forma automática, la bandera `I`, es desactivada cuando una interrupción ocurre, luego, cuando la interrupción es atendida (al ejecutar la operación [`RETI`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=281)), vuelve a activarse `I`. Una buena práctica de programación al trabajar con interrupciones, es desactivarlas durante puntos críticos del código, para ser activadas posteriormente.

# Interrupciones externas
El ATmega328P, cuenta con 2 vectores de interrupción externos y se activan mediante una señal en los pines `PD2` (`INT0`) y `PD3` (`INT1`). Para controlar **qué activa la llamada** a interrupciones en los pines, se utiliza el registro [`EICRA`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=54), donde `ISC11`, `ISC10` están asociados a `INT1` y `ISC01`, `ISC00` están asociados a `INT0`.

| `ISC11`/`ISC01` | `ISC10`/`ISC00` | Descripción                                                                         |
| -               | -               | -                                                                                   |
| 0               | 0               | Un nivel bajo en `INT1/INT0` genera una llamada de interrupción                     |
| 0               | 1               | Cualquier cambio de estado lógico en `INT1/INT0` genera una llamada de interrupción |
| 1               | 0               | Un flanco de bajada en `INT1/INT0` genera una llamada de interrupción               |
| 1               | 1               | Un flanco de subida en `INT1/INT0` genera una llamada de interrupción               |

Por default, las interrupciones externas están deshabilitadas. Para **activarlas**, se utilizan los bits 1 y 0 del registro [`EIMSK`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=55), para activar el `INT1` e `INT0` respectivamente.

Cuando sucede una interrupción, automáticamente su bandera asociada es activada `INTF1` e `INTF0` para `INT1` e `INT0` respectivamente. Estas se encuentran en el registro [`EIFR`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=55). Cuando la interrupción es atendida (al ejecutar la operación `RETI`), vuelve a 0. La librería `avr/interrupt.h` ejecuta `RETI` por debajo. Estas banderas sirven para **conocer la fuente** de la interrupción.

## Programación en C de interrupciones externas
Para utilizar las interrupciones externas del ATmega328P en lenguaje `C`, se puede seguir este procedimiento:

1. Importar la librería `avr/interrupt.c`
    ```c
    #include<avr/interrupt.h>
    ```
3. Definir la rutina de interrupción `ISR` para el vector de interrupción deseado `INT0_vect`/`INT1_vect`
    ```c
    ISR (INT0_vect) {
        // Código de rutina de interrupción para INT0
    }
    ISR (INT1_vect) {
        // Código de rutina de interrupción para INT1
    }
    ```
5. Configurar las interrupciones externas

    Ejemplo que habilita las interrupciones por `INT0` por flanco de subida:
    ```c
    int main(void)
    {
        cli(); // Deshabilitar interrupciones de forma global
        //otras configuraciones
        EICRA |= (1<<ISC01)|(1<<ISC00); // Interrupción en flanco de subida para INT0
        EICRA |= (1<<ISC01)|(1<<ISC00); // Interrupción en flanco de subida para INT0
        EIMSK |= (1<<INT0); // Habilitar interrupción con INT0
        sei(); // Habilitar interrupciones de forma global
    }
    ```
    
# Interrupción por cambio de pin
Estas son otro tipo de interrupción externa donde no se puede cambiar el tipo de señal de activación por otro que no sea el **cambio lógico de un pin**. El ATmega328P, permite seleccionar uno o varios pines de cada puerto para este propósito.

Se activan o desactivan las interrupciones por cambio de pin de los pines asociados a los puertos `PORTB`, `PORTC` y `PORTD` con los pines `PCIE0`, `PCIE1` y `PCIE2` del registro [`PCICR`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=57) respectivamente.

Cuando ocurre la interrupción, se levantan y bajan las banderas `PCIE0`, `PCIE1` y `PCIE2`, asociadas a los pines de los puertos `PORTB`, `PORTC` y `PORTD` respectivamente, de forma automática. Para pines dentro del mismo puerto, no hay banderas independientes.

Para configurar **qué pines** causen la interrupción, se utilizan los bits `PCINT0-PCINT7` del registro [`PCMSK0`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=57) para habilitar o desactivar la interrupción en los pines `PB0-PB7` respectivamente. De igual manera los registros `PCMSK1` y `PCMSK2` están asociados a los pines de los puertos `PORTC` y `PORTD`.

## Programación en C de interrupciones por cambio de pin

1. Importar la librería `avr/interrupt.c`
    ```c
    #include<avr/interrupt.h>
    ```
3. Definir la rutina de interrupción `ISR` para el vector de interrupción deseado `INT0_vect`/`INT1_vect`

    Ejemplo de definiciones de rutina de interrupción para `PCINT1`:
    ```c
    ISR (PCINT1_vect) {
        // Código de rutina de interrupción para PCINT1
    }
    ```
5. Configurar las interrupciones por cambio de pin

    Ejemplo que habilita las interrupciones por `PCINT1`:
    ```c
    int main(void)
    {
        cli(); // Deshabilitar interrupciones de forma global
        //otras configuraciones
        PCICR |= (1<<PCIE1); // Habilitar interrupciones por cambio de pin en PORTC
        PCMSK1 |= (1<<PCINT8)|(1<<PCINT11) // Habilitar pines PCINT11 y PCINT8 para interrupción
        sei(); // Habilitar interrupciones de forma global
    }
    ```
    
# Timers/counters
El ATmega328P cuenta con 3 temporizadores o contadores (cuando se utiliza una fuente externa), el Timer0 y Timer 2 de 8 bit y Timer3 de 16 bit. También tienen la posibilidad de generar PWM de periodo variable.

## Fuente de reloj interna o externa
Todos los timer pueden utilizar la fuente interna del microcontrolador $\text{clk}_{\text{I/O}}$, pero también pueden utilizar fuentes de reloj externas. En el caso de los timer 0 y 1 la fuente externa es **síncrona**, puesto que el microcontrolador realiza un muestreo en el pin `T0/T1` de la señal externa de reloj $\text{clk}_\text{T0S}$ / $\text{clk}_\text{T1S}$ en cada ciclo máquina. Debido al proceso mediante el cual se realiza la detección de flanco (ascendente o descendente), la frecuencia máxima de la fuente externa es menor a $\frac{f_{\text{clk}_\text{I/O}}}{2.5}$ como se explica en el [datasheet (pag.114)](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=114).

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

## Desbordamiento
Un desbordamiento del timer ocurre en un evento de conteo cuando el contador ya ha alcanzado su máxima capacidad `0xFF` para Timer 0 y 2 y `0xFFFF` para Timer1. Al desbordarse el registro correspondiente a cada timer `TCNT`, se reinicia el contador y ocurre una llamada a interrupción que activa la bandera de desbordamiento en el registro `TIFR`. Para habilitar las interrupciones por desbordamiento de algún timer, se debe actvar el bit `TOIE` de su respectivo registro `TIMSK`.

Los registros `TCNT` se pueden escribir, por lo que se puede modificar el conteo de los timers para hacer conteos exactos. Entonces si se quisiera la interrupción a sólo dos conteos, lo único que hay que hacer es poner el valor en `TCNT` a una unidad menos que su máxima capacidad (eg. 256 - 2 = 254 para un timer de 8 bit).

## Programación en C de interrupciones por desbordamiento
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

## Comparación
## Captura
