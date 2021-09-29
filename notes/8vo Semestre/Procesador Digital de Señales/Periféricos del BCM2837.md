---
layout: note
---

El BCM2837 (ARM Cortex-A53) cuenta con una interfaz de **entrada-salida de propósito general** o **GPIO** que permite interactuar con hardware externo. En el caso de la Raspberry Pi 3 y 4, se cuentan con **40 pines** conectados a esta interfaz.

Imagen de diagrama de pines por [Hardwarelibre](https://www.hwlibre.com/gpio-raspberry-pi/):
![Diagrama de pines I/O de las Raspberry Pi 3 y 4](https://www.hwlibre.com/wp-content/uploads/2020/03/gpio-raspberry-pi-4-3.png.webp)

Los pines pueden servir como **entrada** o **salida**, además de tener ciertos pines especiales con funciones como **PWN en hardware**, **SPI**, **I$^2$C** y **Puerto serie**. A continuación una tabla que lista los pines especiales:

| Pines  | Función         | Dispositivo |
|--------|-----------------|-------------|
| GPIO12 | PWM en hardware |             |
| GPIO13 | PWM en hardware |             |
| GPIO18 | PWM en hardware |             |
| GPIO19 | PWM en hardware |             |
| GPIO10 | MOSI            | SPI0        |
| GPIO9  | MISO            | SPI0        |
| GPIO11 | SCLK            | SPI0        |
| GPIO8  | CE0             | SPI0        |
| GPIO7  | CE1             | SPI0        |
| GPIO20 | MOSI            | SPI1        |
| GPIO19 | MISO            | SPI1        |
| GPIO11 | SCLK            | SPI1        |
| GPIO18 | CE0             | SPI1        |
| GPIO17 | CE1             | SPI1        |
| GPIO16 | CE2             | SPI1        |
| GPIO2  | Data            | I2C         |
| GPIO3  | Clock           | I2C         |
| GPIO14 | TX              | Serie       |
| GPIO15 | RX              | Serie       |

# Comandos
## `pinout`
Permite consultar la distribución de los pines de la Raspberry Pi, entrega una salida como esta:

```bash
> pinout
,--------------------------------.
| oooooooooooooooooooo J8     +====
| 1ooooooooooooooooooo        | USB
|                             +====
|      Pi Model 3B  V1.2         |
|      +----+                 +====
| |D|  |SoC |                 | USB
| |S|  |    |                 +====
| |I|  +----+                    |
|                   |C|     +======
|                   |S|     |   Net
| pwr        |HDMI| |I||A|  +======
`-| |--------|    |----|V|-------'

Revision           : a02082
SoC                : BCM2837
RAM                : 1024Mb
Storage            : MicroSD
USB ports          : 4 (excluding power)
Ethernet ports     : 1
Wi-fi              : True
Bluetooth          : True
Camera ports (CSI) : 1
Display ports (DSI): 1

J8:
   3V3  (1) (2)  5V
 GPIO2  (3) (4)  5V
 GPIO3  (5) (6)  GND
 GPIO4  (7) (8)  GPIO14
   GND  (9) (10) GPIO15
GPIO17 (11) (12) GPIO18
GPIO27 (13) (14) GND
GPIO22 (15) (16) GPIO23
   3V3 (17) (18) GPIO24
GPIO10 (19) (20) GND
 GPIO9 (21) (22) GPIO25
GPIO11 (23) (24) GPIO8
   GND (25) (26) GPIO7
 GPIO0 (27) (28) GPIO1
 GPIO5 (29) (30) GND
 GPIO6 (31) (32) GPIO12
GPIO13 (33) (34) GND
GPIO19 (35) (36) GPIO16
GPIO26 (37) (38) GPIO20
   GND (39) (40) GPIO21
```

> Este comando sólo funciona cuando se ejecuta sobre una Raspberry Pi, en caso de querer ejecutarlo para ver una maqueta se debe correr antes `export GPIOZERO_PIN_FACTORY='mock'` y luego ejecutar `pinout`

## Paquete `gpiod`
Este paquete sirve para interactuar con la GPIO desde la línea de comandos y la librería `libgpiod` para `C` y `C++`.

```bash
sudo apt update
sudo apt -y install gpiod
```

* `gpiodetect`: Muestra las diferentes interfaces de la GPIO
* `gpioinfo [interfaz]`: Muestra las líneas o pines disponibles de la interfaz (listada por gpiodetect)
* `gpioset [interfaz] [linea]=[1/0]`: Convierte la línea en salida y activa `1` o desactiva `0` la línea de la interfaz especificada
* `gpioget [interfaz] [linea]`: Convierte la línea en entrada y lee el valor actual de la línea en la interfaz especificada

###### Ejemplo:

```bash
gpioinfo gpiochip0 | grep 24
gpioset gpiochip0 24=0
gpioinfo gpiochip0 | grep 24
gpioget gpiochip0 24
gpioinfo gpiochip0 | grep 24
```

### Desarrollo con `libgpiod`

Primero se deben incluir también las cabeceras para utilizar en `C` y `C++`:

```bash
sudo apt update
sudo apt install libgpiod-dev
```

Así, se pueden usar los métodos en la librería para construir programas, por ejemplo el siguiente realiza el parpadeo de un led conectado al pin 24:

```c
/** @file   blink.c                                                     */
/** @author Gastón Hugo Salazar Silva <ghsalazar@ipn.mx>                */
/**                                                                     */
/** Es un pequeño ejemplo de las funcionalidades del interfaz del GPIO  */
/** de la Raspberry Pi por medio de la librería libgpiod.               */
/**                                                                     */
/** Para compilar el programa, se debe utilizar el comando:             */
/**     gcc blink.c -lgpiod -o blink                                    */

#include <gpiod.h>
#include <unistd.h>

int main()
{
    int state = 1;
    int input = 1;

    struct gpiod_chip *chip;
    chip = gpiod_chip_open_by_name("gpiochip0");

    struct gpiod_line *led;
    led = gpiod_chip_get_line(chip, 24);
    gpiod_line_request_output(led, "myLED", 0);

    struct gpiod_line *button;
    button = gpiod_chip_get_line(chip, 6);
    gpiod_line_request_input(button, "button");

    while (input == 1) {
        state = state ^ 1;
        gpiod_line_set_value(led, state);
        input = gpiod_line_get_value(button);
        usleep(500000);
    }

    gpiod_line_set_value(led, 1);
    gpiod_line_release(led);
    gpiod_line_release(button);
    return 0;
}
```
