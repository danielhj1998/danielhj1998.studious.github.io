---
layout: note
title: Programación del ATmega328P en C
---

EL ATmega328P es un microcontrolador de 8 bit con 32K de memoria FLASH programable. En su [datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf) viene el diagrama de pines, pero al trabajar en este curso con el Arduino Nano, conviene más, conocer el pinout del Arduino: 

![pinout del Arduino Nano](https://upload.wikimedia.org/wikipedia/commons/e/e4/Arduino-nano-pinout.png)

# Puertos
El ATmega328P, cuenta con 3 puertos de pintes entrada/salida `PORTB` de 8 pines (6 accesables desdel el Arduino), `PORTC` de 7 pines y `PORTD` de 8 pines.

Utilizarlos consiste de:
1. Configurar los pines del puerto como entrada `0`/salida `1` en el registro `DDRX`

    Ejemplo para configurar `PORTB` y el nibble bajo de `PORTD` como salidas:

    ```c
    #include <avr/io.h>
    
    int main(void)
    {
        DDRB = 0xFF;
        DDRD = 0x0F;
    }
    ```
    
    > Por default, los puertos están configurados como entrada `0`
    
2. Hacer uso del pin con el registro `PINX` si es entrada o `PORTX` si es salida.
    
    Ejemplo para leer el nibble alto de `PORTD` y poner en alto `1` su nibble bajo:

    ```c
    #include <avr/io.h>
    
    int main(void)
    {
        DDRD = 0x0F;
        int valor = PIND & 0xF0;
        PORTD |= 0x0F;
    }
    ```
    
## Resistencias pull-up
Los puertos digitales tienen resistencias pull-up internas. Cuando el pin está **configurado como entrada**, se puede activar su resistencia pull-up, haciendo `1` el bit del `PORTX` correspondiente.

Ejemplo para configurar el `PORTD` como entrada y activar las resistencias pull-up internas:

```c
#include <avr/io.h>

int main(void)
{
    DDRD = 0x00;
    PORTD = 0xFF;
}
```

> Por default las resistencias pull-up están desactivadas

# Librería delay
Para hacer delays con ciclos de máquina, se utiliza la librería `avr/delay.h`, con esta se pueden hacer delays en microsegundos y milisegundos con el uso de los métodos `_delay_us` y `_delay_ms` respectivamente.

Esta libería utiliza la frecuencia del CPU definida por la macro `F_CPU`, que en el caso del Arduino, debe ser de `16000000UL`, o causaría que no se pueda reprogramar con el bootloader.

Ejemplo de programa que lee los 6 pines del `PORTD` y lo saca por el `PORTB`:

```c
#define F_CPU 16000000UL

#include <avr/io.h>
#include <util/delay.h>

int val=0;

int main(void)
{
    DDRD = 0x00;
    PORTD = 0x3F;   //Resistencias pull up
    DDRC = 0x3F;

    while(1)
    {
        val = PIND & 0x3F;
        _delay_us(500);
        PORTC = val;
        _delay_ms(250);
    }
}
```
