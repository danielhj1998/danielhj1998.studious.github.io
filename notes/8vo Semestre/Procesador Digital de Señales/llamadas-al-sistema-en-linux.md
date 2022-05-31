---
layout: note
title: Llamadas al sistema en Linux
---

Las **llamadas al sistema** o **SYSCALLS** son la forma de solicitar recursos al sistema operativo. Estas llamadas se implementan por medio de **subrutinas** o **interrupciones** generalmente. En el caso de la Raspberry Pi, es por medio de interrupciones.

Las llamadas al sistema son varias en el caso de LINUX, se puede encontrar una lista completa [aquí](https://filippo.io/linux-syscall-table/) o con `man signal`, `man syscall` y `man syscalls`, algunas de las más comúnes son estas:

* `SIGINT <C-c>` Salir de un proceso desde la terminal
* `SIGQUIT <C-\` Salir de un programa desde terminal
* `SIGTERM` `kill -TERM <PID>` Matar un proceso
* `SIGSTOP <C-z>` Pausar un proceso
* `SIGCONT` `fg`,`bg` Reanudar un proceso
* `SIGHUP` Colgar un proceso (hacer que no responda)
* `SIGKILL` Matar un proceso cuando este no puede capturar ninguna otra llamada, causa su terminación inmediata.

Algunos comandos útiles relacionados con procesos son los siguientes:

* `kill` Send different signals to a program, not just kill intended ones
* `jobs` Lists unfinished processes associated with the current terminal session
* `pgrep` Get process ID (pid)
* `&` runs command in the background
* `$!` Last backgrounded job
* `nohup` Wraper to ignore SIGHUP signal
* `disown` Removes jobs from current shell
* `ps` Report a snapshot of the current processes
    * `-aux` All users jobs

## Llamadas al sistema en `a32`
Para realizar llamadas al sistema, se podría utilizar C para hacerlo, por ejemplo el siguiente código imprime 'Hello world' en `STDOUT`:

```c
#include <unistd.h>
ssize_t write(int fd, const void *buf, size_t count);

#define STDOUT  1
#define MSG_LEN 14

char *msg = "Hello, world!\n";

int main()
{
    write(STDOUT, msg, MSG_LEN);
    return 0;
}
```

El programa equivalente en ensamblador es el siguiente:

```arm
.equ STDOUT,    1       @ #define STDOUT    1
.equ MSG_LEN,   14      @ #define MSG_LEN   14
.equ WRITE,     4

.data
LITERAL_MSG: .asciz "Hello, world!\n"

.text
msg: .word   LITERAL_MSG     @ char *msg = "Hello, world!\n";

.global main
main:
@    write(STDOUT, MSG, MSG_LEN);
    push {r7, lr}
    mov r0, #STDOUT
    ldr r1, msg
    mov r2, #MSG_LEN
    mov r7, #WRITE
    swi #0
    pop {r7, lr}

@   return 0
    mov r0, #0
    bx lr
```

Aquí se utilizan las siguientes instrucciones: `push`, que hace que el procesador entre en estado supervisor y guarda el estado del sistema en el stack, en este caso sólo es necesario guardar `r7` y `lr`. `svc/swi` hace la llamada al sistema. Finalmente, `pop`, restaura el estado del sistema y regresa a la línea en la que se había quedado (eliminando el último elemento de la pila).

> Existe una [convención sobre qué registros utilizar para realizar llamadas al sistema](https://www.ele.uva.es/~jesus/hardware_empotrado/ARM_calling.pdf)

Otra alternativa es utilizar el compilador de C para escribir el programa en ensamblador:

```c
@ ssize_t write(int fd, const void *buf, size_t count);
.global write

.equ STDOUT, 1   @ #define STDOUT 1
.equ MSG_LEN, 14 @ #define MSG_LEN 14

.data
LITERAL_MSG: .asciz "Hello, world!\n"

.text
msg: .word LITERAL_MSG @ char *msg = "Hello, world!\n"

.global main
main:
    @ write(STDOUT, msg, MSG_LEN);
     push {lr}
     mov r0, #STDOUT
     ldr r1, msg
     mov r3, #MSG_LEN
     bl write
     pop {lr}

    @ return 0
     mov r0, #0
     bx lr
```

Donde se especifica que `.write` es un símbolo global, entonces en la etapa de enlazado, el compilador buscará el símbolo donde se implementa `write`. Entonces `bl write` hace que se guarde la siguiente dirección a ejecutar del `pc` en `lr` y brinca a `write`.
