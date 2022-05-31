---
layout: note
title: Desarrollo de AVR Amtel328P de Arduino en WSL
---

> # Referencia
> [Developing in C for the ATmega328P: Windows Setup Using WSL1](https://wellys.com/posts/avr_c_wsl)

Para programar el AVR ATmega328P de Arduino en WSL (Ubuntu):

1. Primero se instalan los programas y librerías:

    * `gcc-avr`: Compilador de la GNU para AVR
    * `binutils-avr`: Herramientas de programación de la GNU para AVR
    * `gdb-avr`: Depurador de la GNU para AVR
    * `gdb-libc`: Bibliotecas de `C` para el AVR
    * `avrdude`: Programador para utilizar con el bootloader del Arduino

```bash
sudo apt install gcc-avr binutils-avr gdb-avr avr-libc avrdude
```

1. Para automatizar el proceso, se utiliza [este `makefile`](https://github.com/hexagon5un/AVR-Programming/blob/ad2512ee6799e75e25e70043e8dcc8122cb4f5ab/setupProject/Makefile).
2. En WSL2 es más conveniente usar el `avrdude.exe` del [Arduino IDE](https://www.arduino.cc/en/software).
    Por ello es necesario realizar los cambios pertinentes en el `makefile`, el primero es añadir el archivo de configuración de Arduino a `PROGRAMMER_ARGS` y especificar el `COM` al que está conectado.

    ```makefile
    PROGRAMMER_TYPE = Arduino
    # extra arguments to avrdude: baud rate, chip type, -F flag, etc.
    #PROGRAMMER_ARGS = -F -V -P /dev/ttyS3 -b 115200
    PROGRAMMER_ARGS = -C"C:\Program Files\WindowsApps\ArduinoLLC.ArduinoIDE_1.8.57.0_x86__mdqgnx93n4wt      t\hardware\tools\avr/etc/avrdude.conf" -v -PCOM8 -b57600 -D
    ```
    
    También se debe cambiar `AVRDUDE`, especificando la ruta donde se encuentra.
    
    ```makefile
   AVRSIZE = avr-size
   # AVRDUDE = avrdude
   AVRDUDE = /mnt/c/Users/danielhj/Documents/Programas/bin/avrdude.exe
    ```
    
3. Así, se puede trabajar con los siguiente comandos:
    * `make`: Compilar y obtener el archivo objeto tipo `ELF`
    * `make all`: Compilar y obtener el archivo `HEX`
    * `make flash`: Compilar y subir al Arduino
