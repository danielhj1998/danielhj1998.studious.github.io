---
layout: note
---

# Instrucciones, mnemónicos y directivas
Es importante notar la diferencia entre *instrucciones*, *mnemónicos* y *directivas*, que son términos utilizados al escribir código ensamblador.

Las **instrucciones** son las que se interpretan por la computadora en el proceso de ejecución. Son las que en conjunto forman la [*arquitectura de set de instrucciones*](https://developer.arm.com/documentation/dui0802/b/A32-and-T32-Instructions) o ISA por sus siglas en inglés.

Los **mnemónicos** son palabras asociadas a una instrucción para que sea más simple para el humano interpretar y escribir código. A continuación se muestra una tabla que muestra las equivalencias entre algunas instrucciones y los mnemónicos.

| Instrucción | Mnemónico                            | Descripción     |
| -           | -                                    | -               |
| `e0810002`  | `add     r0, r1, r2`                 | `r0 <- r1 + r2` |
| `e08f3003`  | `add     r3, pc, r3`                 | `r3 <- pc + r3` |
| `e2844001`  | `add     r4, r4, #1`                 | `r4 <- r4 + 1`  |
| `e1a08001`  | `mov     r8, r1`                     | `r8 <- r1`      |

Las **directivas** son interpretadas por el ensamblador y no por la máquina en tiempo de ejecución. Son instrucciones que no aparecerán en el archivo objeto final, pero que sirven para facilitar la tarea del programador y dar instrucciones al ensamblador. También se conocen como **pseudoinstrucciones**. Estas varían de ensamblador a ensamblador.

Considerando el siguiente programa escrito para el ensamblador `gcc` de la GNU:

```arm
.global main

.equ NUM, 42

main:
        mov r0, #NUM
        bx lr
```

Existen dos directivas, la primera es `.global main` que le dice al ensamblador que existe en el archivo una etiqueta `main` que será utilizada por el linker, después para integrar el archivo objeto.

La siguiente es la directiva `.equ` que permite definir macros que al ser procesadas por el ensamblador, se intercambiaran por el valor definido. Esto sirve para definir "variables" que hagan que el código sea más legible.

Al final la línea `mov r0, #NUM` será interpretada por el ensamblador como `mov r0, #42`.

# Memoria
Las operaciones realizadas en ARM tienen que ser con registros, no se puede hacer directamente en memoria. Para eso se requiere **cargar** los datos **desde memoria**, procesarlos y luego **almacenarlos en memoria**.

Ahora bien, para cargar desde memoria se requiere conocer la **dirección de memoria** primero. Esta, al igual que los datos, debe ser cargada primero en registros para poder operar con la memoria de dicha dirección.

## Secciones
Además, la memoria del procesador, está dividida por secciones puesto que se trata de una arquitectura RISC, existe una sección para el código y otra para los datos por ejemplo. Para utilizar una u otra es necesario utilizar las directivas del ensamblador `.text` y `.data` para el código y los datos respectivamente.

```arm
.text

    /* Código */
    
.data

    /* Datos */
```

## Variables
Para definir variables, se pueden utilizar las directivas `.balign` y `.word`. La primera sirve para indicar al ensamblador que alinee la memoria para tener un arreglo de $n$ número de bytes, para esto rellena la memoria con bytes hasta llegar a un espacio de memoria que cumpla con los requerimientos.

Luego `.word` indica que el dato del argumento debe ser almacenado en un espacio de palabra, en este caso de 32 bits o 4 bytes.

```arm
.data

.balign 4
var1: .word 3
```

Aquí, `.balign` alinea hasta tener un espacio de 4 bytes. A partir de esa dirección con el label `var1`, `.word` escribe el valor de un entero con valor 3 sobre un espacio de 32 bits.

> En realidad `.balign` sólo es necesaria cuando se trabaja con espacios de memoria diferentes al tamaño de palabra (32 bits).

## Carga y almacenado
Para cargar datos se utilizan las instrucciones `ld<x>` y para almacenar, las `st<x>`. Tomando por ejemplo las instrucciones para cargar y almacenar en registros:

```arm
ldr ra,[rb] @ ra <- *rb
str ra,[rb] @ *rb <- ra
```

La primera instrucción `ldr`, carga el **valor** encontrado **en la dirección de memoria** que está almacenada `rb` y lo almacena en `ra`. Es decir `[rb]` índica el contenido de la dirección a la que apunta `rb`, `rb` es un **puntero**.

En el caso de `str`, se almacena el contenido de `ra` en la dirección a la que apunta `rb`.

> `[]` es un modo de direccionamiento, existen 3 más y se pueden consultar [aquí](https://developer.arm.com/documentation/den0013/d/ARM-Thumb-Unified-Assembly-Language-Instructions/Memory-instructions/Addressing-modes?lang=en).

### ¿Cómo se cargan direcciónes de memoria a un registro?
Ya se vió como cargar contenidos de una dirección de memoria a un registro, pero ¿Cómo cargamos una dirección de memoria en sí?

Los labels o etiquetas del ensamblador representan direcciones de memoria, entonces `var1` representa la dirección de memoria [donde se puso el valor entero 3](#variables). Sin embargo, no es posible utilizar esa dirección directamente puesto que se encuentra en una sección diferente a la del código.

Sólo se pueden utilizar direcciones directamente desde la misma sección, esto por la arquitectura RISC del procesador. Así que para facilitar eso, se deja el trabajo al ensamblador de la siguiente forma:

```arm
.data
var1: .word 3   @ Contenido de la dirección var1: 3
var2: .word 10  @ Contenido de la dirección var2: 10

.text
.global main

main:
    ldr r0, addr_var1
    ldr r1, addr_var2

addr_var1 : .word var1 @ Contenido de la dirección addr_var1: dirección var1
addr_var2 : .word var2 @ Contenido de la dirección addr_var2: dirección var2
```

Las etiquetas `addr_var1` y `addr_var2` serían las direcciones de memoria donde se almacenan las direcciones de memoria de `var1` y `var2`. Cómo `addr_var1` y `addr_var2` están en la sección `.text` son accesibles para el código y su contenido se utiliza para cargar a `r0` y `r1` con las direcciones de memoria `var1` y `var2`. Esto lo hace el ensamblador en la etapa de enlazado, cuando ya sabe las direcciones exactas de memoria para cada etiqueta.

# Saltos
Los saltos ocurren cuando una instrucción modifica al contador de programa `r15` o `pc`. Existen saltos **condicionales** e **incondicionales**.

## Saltos incondicionales

```arm
.text
.global main
main:
    @ código...
    b end
    @ código que no se va a ejecutar...
end:
    bx lr
```

El salto incondicional ocurre con la instrucción `b` (branch), que salta a la dirección especificada en el argumento.

## Saltos condicionales
Los saltos condicionales ocurren cuando se cumplen ciertas condiciones que tienen que ver con el current program status register `cpsr`, que es el registro donde se tiene el estado del programa, mismo que es cambiado por ciertas instrucciones y cuenta con las siguientes banderas:

* `N` Como resultado de la instrucción se obtuvo un número negativo
* `Z` Se obtuvo un 0, se desactiva si se obtuvo algo diferente
* `C` Ocurrió un acarreo
* `V` El valor obtenido no puede ser representado en complemento a dos de 32 bits

> No todas las instrucciones tienen modifican al `cpsr`. Una explicación del complemento a 2 y el acarreo se vió en el curso de microcontroladores en [esta nota](../../6to Semestre/Microcontroladores/Operaciones Aritméticas.html).

Los saltos en `a32` se realizan con las instrucciones `bXX` que se listan en la siguiente tabla:

| Instrucción | Descripción (inglés)                       | Condiciones                         |
| -           | -                                          | -                                   |
| `beq`       | Equal                                      | `Z  = 1`                            |
| `bne`       | Equal                                      | `Z  = 1`                            |
| `GE`        | Greater or equal than, in two's complement | `V = N`                             |
| `LT`        | Lower than, in two's complement            | `V != N`                            |
| `GT`        | Greater than, in two's complement          | `Z = 0` `&` `N = V`                 |
| `LE`        | Lower or equal than, in two's complement   | `Z = 1` `||` (`Z = 0` `&` `N = V`)                 |
| `MI` | Minus/negative        | `N = 1`                   |
| `PL` | Plus/positive or zero | `N = 0`                   |
| `VS` | Overflow set          | `V = 1`                   |
| `VC` | Overflow clear        | `V = 0`                   |
| `HI` | Higher                | `C = 1` `&` `Z = 0`       |
| `LS` | Lower or same         | `C = 0` `||` `Z = 1`          |
| `CS/HS` | Carry set/higher or same | `C = 1` |
| `CC/LO` | Carry clear/lower    | `C = 0` |

Las condiciones serán evaluadas independientemente de qué instrucción se llamó después, pero la instrucción más común que se utiliza antes el `cmp ra, rb`, que hace `r1 - r2`, sin almacenar el resultado, pero actualizando las banderas del `cpsr`.

> Para implementar estructuras `if/else`, `while`, `for`, etc. con los saltos condicionales, en [este artículo](https://thinkingeek.com/2013/01/20/arm-assembler-raspberry-pi-chapter-6/) dice como.

La información obtenida aquí proviene de los artículos [ARM assembler in Raspberry Pi](https://thinkingeek.com/arm-assembler-raspberry-pi/).
