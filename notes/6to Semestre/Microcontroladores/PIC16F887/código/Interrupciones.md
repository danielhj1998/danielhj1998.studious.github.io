---
layout: note
---

Las interrupciones pausan la ejecución del programa principal, llama a una `Rutina de Servicio de Interrupción` (`ISR`). Luego continua con la ejecución del programa donde lo dejó.

Las `ISR` son escritas en una dirección de memoria llamada el `Vector de interrupción`. Dependiendo del microcontrolador puede haber varios vectores de interrupción.

# Tipos de interrupciones
|||
|-|-|
|**Reset**|Algunos microcontroladores manejan su reset como interrupción|
|**Software**|Hay condiciones especiales que al cumplirse durante la ejecución del código, generan una interrupción|
|**Hardware**|Llegan por medio de los I/O del dispositivo|
# Prioridad en las interrupciones
Las iterrupciones pueden, ellas mismas ser interrumpidas por otra interrupción (`interrupciones mascarables`) de más jerarquía o no (`interrupciones no mascarables`).
# Interrupciones en el PIC16F887
Cuenta con diferentes fuentes de interrupción, TODAS del tipo **NO mascarable**.

## Vector de interrupción
Al tener la misma prioridad, el PIC cuenta con un solo vector de interrupción y es la dirección `0x0004` de la `FLASH`. Por eso, dentro de la `ISR` se debe preguntar por la fuente de la interrupción.

En este microcontrolador, las interrupciones externas, pueden tardar hasta `4 c.m.` para ejecutarse.

## Permisos de interrupciones
Todas las fuentes de interrupción requieren de un permiso individual de interrupción. Dicho permiso termina en `IE` (Interrupt Enable). Ejemplo: `ADIE`.

Además, existe un permiso global de interrupciones que es el bit `GIE` del registro `INTCON`.

Algunas fuentes, adicionalemente, requieren de un permiso más para interrumpir.

## Mecanismo
Todas las fuentes cuentan también con una bandera de interrupción, que termina en `IF` (Interrupt Flag). La interrupción se da cuando se levanta la bandera de interrupción.

Cuando se ingresó a una instrucción se utiliza la instrucción `RETFIE` para retornar.

## Proceso de interrupción en el PIC16F887
1. Levanta la bandera de interrupción asignada.
2. Termina la ejecución de la instrucción en curso.
3. Pone `GIE` en 0.
4. Se guarda en la PILA el contenido del `PC`.
5. El apuntador de la PILA se incrementa en 1.
6. El `PC` se carga con la dirección 0x0004.


## Proceso de la instrucción `RETFIE`
Cuando se hace `RETFIE`, tiene el mismo efecto que hacer:
1. Decrementa en 1 al apuntador de la PILA.
2. Carga al `PC` con el contenido de la PILA que señala el apuntador de la PILA. 
3. Pone `GIE` en 0.

## Nota importante
Las banderas de interrupción `*IF` no se ponen en `0` de forma automática. Es **obligación** del programador ponerlas en `0` antes de retornar de la `ISR`.

Las interrupciones utilzan espacio en la PILA y por lo tanto reducen el número de subrutinas anidadas que se pueden hacer.

Al entrar a una subrutina se debe respaldar `W`, `STATUS` y `PCLATCH`.
## Interrupción por la terminal RB0/INT
La terminal `RB0/INT` puede ser fuente de interrupción. Para eso se deben cumplir las siguientes condiciones:
* Debe ser configurado como `entrada`.
* Permiso `INTCON,INTE` = `1`
* Permiso `INTCON,GIE` = `1`

Se puede configurar para activarse en flanco ascendente o descendente por medio del bit `INTEDG` (Interrupt Edge Select Bit) del registro `OPTION_REG` (Option Register). Donde:
* `1` (Default): Flanco ascendente.
* `0` : Flanco descendente.

Cuando ocurre la interrupción, se levanta la bandera `INTCON,INTF` y entra en la interrpción. De nuevo, la bandera la debe bajar el programador.

## Interrupción por el PORTB
Todo el puerto B puede ser fuente de interrupción. Para configurarlo se debe colocar **1** en los bits correspondientes a la terminal del `PORTB`, con el registro `IOCB`.

Así, se levanta la bandera `INTCON,RBIF` cuando se cambia cualquiera de los pines del `PORTB` y ocurre la interrupción.
* Debe ser configurado como `entrada`.
* Permiso `INTCON,RBIE` = `1`
* Permiso `INTCON,GIE` = `1`