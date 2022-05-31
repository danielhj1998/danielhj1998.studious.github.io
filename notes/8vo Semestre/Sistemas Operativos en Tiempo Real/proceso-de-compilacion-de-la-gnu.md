---
layout: note
title: Proceso de compilación de la GNU
---

Al compilar un programa en c, normalmente correríamos este comando:

```bash
gcc hello.c -o h1.xtn
```

Sin embargo en realidad es un proceso que consta de 4 pasos:

* Preprocesado
* Compilación
* Ensamblado
* Enlazado

Pongamos como ejemplo un programa muy sencillo en C y lo guardamos en `hello.c`.

```c
#include <stdio.h>

#define NUM 0

int main(void) {
    printf("hello world\n");
    return NUM;
}
```

> C es uno de los lenguajes de alto nivel más antiguos y por convención se ponen nombran con la extensión `.c`, sin embargo, no es necesario nombrarlo así.

## Preprocesado
```bash
cpp hello.c > hello.i
```
El preprocesador busca comandos que inicien con `#`, estas se conocen como *directivas del preprocesador*, luego los ejecuta realizando las siguientes acciones:

* Quitar los comentarios
* Expandir las macros

    En este caso, `return NUM;` pasaría a ser `return 0;`
    
* Expandir los archivos de cabecera (incluidos)

    ```c
    #include <stdio.h>
    ```
    
    El preprocesador busca en el sistema los archivos de cabecera. `stdio.h` por lo general están en `/usr/include/` para C y expandirá el archivo en ese lugar.
    
    Esto porque es un archivo estándar, pero en realidad el preprocesador comenzaría buscando en el directorio actual, luego en los directorios especificados como configuración manual y finalmente en los directorios estándar.
    
    Para este ejemplo se incluyó `stdio.h`, porque es donde se encuentra `printf`. De hecho inspeccionando `hello.i` o `stdio.h`, se encuentra la declaración:
    
    ```c
    extern int printf (const char *__restrict __format, ...);
    ```
    
    Sin embargo, como podemos darnos cuenta por `extern`, es una función que está definida en un archivo externo. Es por eso que los archivos de cabecera NO son librerías, las librerías son aquellas donde se implementan dichas funciones.
    
    Ahora bien, si insertamos ese prototipo directamente en `hello.c` de la siguiente forma:
    
    ```c
    //#include <stdio.h>
    extern int printf (const char *__restrict __format, ...);

    #define NUM 0

    int main(void) {
        printf("hello world\n");
        return NUM;
    }
    ```
    
    Al realizar el preprocesado, el archivo queda mucho más corto. Esto tiene la ventaja de que hace el programa más portable, es decir menos pesado. Pero por otro lado el programa principal se hace menos legible a medida que se van agregando muchas de estas declaraciones y por lo tanto se hace más difícil de mantener.
    
## Compilación
```bash
gcc -Wall -S hello.i -o hello.s
```
> La opción `-Wall` Sólo está para imprimir todos los Warnings, pero no es necesario

En esta etapa se toma la salida del preprocesador y se genera lenguaje ensamblador, que es la versión aún legible para el humano del lenguaje máquina.

Podría decirse que es la etapa principal de el compilador, traduce el código c a lenguaje ensamblador, pero también busca la optimization y también hacer más seguro el código.

## Ensamblado
```bash
as hello.s -o hello.o
```

En esta etapa se traduce del lenguaje ensamblador a lenguaje máquina, también se conoce como código objeto.

Este archivo es completamente ilegible pero se puede obtener información de él por medio del comando `objdump`, por ejemplo, `objdump -h` nos da información de las cabeceras del archivo y `objdump -d` desensambla el archivo, que sin embargo es igual que el `hello.s`.

Con el comando `nm` se listan los símbolos del archivo objeto. Para el caso de este ejemplo se obtiene la siguiente salida:

```bash
                 U _GLOBAL_OFFSET_TABLE_
0000000000000000 T main
                 U puts
```

Las `U` (undefined) significan que están definidas en otro lugar, mientras que la `T` indica que `main` está definido dentro de la sección de código del archivo.

## Enlazado (linking)
```bash
gcc hello.o -o h1.xtn
```

Esta etapa junta todos los códigos objeto necesarios y los junta en uno sólo. Así los que se marcan con una `U` en la tabla de símbolos, va a enlazar el código o copiarlo directamente dependiendo si se hace un enlazado dinámico o estático.
