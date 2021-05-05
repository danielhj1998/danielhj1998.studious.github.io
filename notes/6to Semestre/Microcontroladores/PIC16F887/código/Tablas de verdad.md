Tablas de verdad

Para hacer tablas lógicas, se pueden utilizar los registros `PCL` y `PCLATCH`, en conjunto con la instrucción `RETLW`.

```mpasm
				MOVLW 	0x00 	;Obten el primer dato de la tabla
				CALL	TABLA
				MOVWF 	PORTD
				
				MOVLW 	0x01 	;Obten el segundo dato de la tabla
				CALL	TABLA
				MOVWF 	PORTD
				
				...
				
TABLA		ADDWF	PCL,W
				RETLW	0xC6	;Primer dato
				RETLW	0x0C	;Segundo dato
```

Como el `PC` apunta a la siguiente instrucción y luego ejecuta la instrucción actual, primero ejecutaríá `ADDWF	PCL,W` donde `PCL` tiene la dirección de memoria de la siguiente instrucción, en este caso `RETLW	0xC6`.

De esta forma, se obtiene la siguiente tabla de verdad:

|$X<7:0>$|$Y<7:0>$|
|-|-|
|0x00|0xC6|
|0x01|0x0C|

# Directiva `dt` MPLAB
La directiva `dt` de MPLAB, genera una serie de `RETLW` por cada expresión.

```
DT	EXPR,EXPR,...
```

Así se pueden declarar tablas en una sola línea, por ejemplo:

```
DT	0XC0,0XF9,0XA4,0XB0
```

MPLAB lo ensamblaría de la siguiente forma:
```
RETLW	0xC0
RETLW	0xF9
RETLW	0xA4
RETLW	0xB0
```