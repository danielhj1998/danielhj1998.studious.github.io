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
