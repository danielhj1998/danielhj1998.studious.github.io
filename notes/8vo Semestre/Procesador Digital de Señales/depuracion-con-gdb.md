---
layout: note
title: Depuración con gdb
---

Para depurar ensamblador con el `gdb` de la GNU, se enlistan los siguientes comandos útiles:

Para iniciar el depurador en modo interactivo:

```bash
gdb --args ./<nombre del archivo objeto>
```

Algunos comandos útiles son los siguientes:
```bash
(gdb) <comando>
```

* `help` Imprimir mensaje de ayuda
* `start` Comenzar el programa
* `disassemble/disas` Desensamblar el bloque de código actual
* `info register(s) <nombre_registro1> <nombre_registro2> ...` Obtener el estado de uno o varios registros
* `p $r0 = 2` Modificar el valor de r0 por 2
* `p &var1` Imprimir la dirección de un label
* `p var1` Imprimir el contenido de la dirección de un label
* `stepi` Ejecutar siguiente instrucción
* `continue` Continua hasta encontrar el siguiente breakpoint o el final del programa
* `quit` Salir del depurador
