---
layout: note
---

# RAM
Esta memoria es una memoria volátil donde se escriben los datos necesarios para correr un programa.
# ROM
Esta memoria no se puede escribir, solo se puede leer de ella y contiene información necesaria para el inicio del sistema.
# EEPROM
Es una memoria que se puede escribir eléctricamente, por lo que es mucho más rápido.
# FLASH
# Bit
Es la unidad mínima de información. Tiene los valores `0` y `1`.
# Registros
Es un elemento de `memoria` dentro de una arreglo de un número determinado de bits.

Los registros se construyen con `flip-flops`.

Los registros son utlizados directamente por el procesadora para **leer** y **escribir** datos.

## Acumulador
Es un registro en el que son almacenados temporalmente resultados aritméticos y lógicos intermedios que serán tratados (el PIC16F887 solo tiene un acumulador y se llama W).

## Registro de Propósito General
Registro de RAM para almacenar y consultar datos temporalmente.
## Registro de Propósito Específico
Registro de RAM que sirve para configurar al microcontrolador y recibir información de resultados y eventos generados por el procesamiento o por eventos acontecidos dentro o fuera del dispositivo.

* **Bandera:** Es un bit de propósito específico que entrega información de resultados y eventos generados por el procesamiento o por eventos acontecidos dentro o fuera del dispositivo.
* **Registro de estado o Chismoso**: Registro de propósito específico con banderas que dejan constancia de algunas condiciones que se dieron en la última operación realizada y que podrán ser tomadas en cuenta en operaciones posteriores.
* **Contador de programa**: Registro que contiene la direacción de la memoria de programa (para el PIC16F887 es la FLASH) en donde se encuentra la siguiente instrucción a ejecutar.
* **Watchdog**: Es un registro que se incrementa por cada ciclo de máquina. Cuando llega al tope y se desborda, se ocasiona un reset de forma automática. Así que el programador debe estar al pendiente de "limpiar al perro" para evitar esto. Este mecanismo sirve para evitar que programas se ejecuten si hay errores y algún programa.

# Pila (stack)
Fragmento de RAM diseñada para guardar el contenido del Contador de Programa (o esa direcciones de memoria de programa)

# Bus de datos
Es el `bus` o `conexión` por la cual se puede **leer** y **escribir** datos en memoria.

# Bus de direcciones
Para poder direccionar los registros en memoria, es necesario tener un bus con el número correcto de bits. Por ejemplo, para una memoria de 8KB:

$
\log_2(8192)=13
$

Por lo que se requieren 13 bits de direccionamiento.
# Bus de control
# Ciclo de reloj
Un ciclo de reloj es el tiemo de oscilación del reloj son el que trabaja el procesador. Para un reloj de $1 MHz$, el ciclo de reloj será de $1\mu s$
# Ciclo de máquina
Para ejecutar una instrucción se requieren más de un ciclo de reloj. En el caso del PIC16F887 son 4:
1. El procesador obtiene el PC la dirección de la siguiente instrucción.
2. El contador de programa se incrementa en 1.
3. El procesador extrae el contenido de la instrucción a ejecutar.
4. El procesador decodifica y ejecuta la instrucción.