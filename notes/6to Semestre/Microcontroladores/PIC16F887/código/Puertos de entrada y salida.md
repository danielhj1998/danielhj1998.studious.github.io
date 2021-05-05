Puertos de entrada y salida

# Configurar puertos como entrada/salida
Para configurar los puertos PORTA, PORTB, ..., PORTE se utilizan los registros TRISA, TRISB, ..., TRISE respectivamente.

Donde `1` es **`I`nput** y `0` es **`O`utput**.

Es importante que **antes** de **configurar** un puerto como **salida**, se escriban los bits de cada pin con **"`0`"** por **protección**, para que al encenderlos no llegen a generar un corto o activar algo que este conectado al pin. Esto porque `MCLR` (master clear) no limpia el contenido de los puertos a menos que se indique lo contrario.

Así que para configurar el *puerto D* como *salida* se utiliza el siguiente código
```mpasm
CLRF	PORTD
BSF 	STATUS,RP0	;B1.
CLRF	TRISD
BCF 	STATUS,RP0	;B0.
...
COMF	PORTD 		;PORTD EN HIGH
```

# Configurar puertos como digital/analógico
Los puertos `A`,`B` y `E` están configurados por default como entradas analógicos. Si se desean usar como entradas digitales, se debe cambiar su configuración desde los registros `ANSEL` y `ANSELH`.

|AN13|AN12|AN11|AN10|AN9|AN8||AN7|AN6|AN5|AN4|AN3|AN2|AN1|AN0|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|RB5|RB0|RB4|RB1|RB3|RB2||RE2|RE1|RE0|RA5|RA3|RA2|RA1|RA0|
|A|N|S|E|L|H||||A|N|S|E|L||

Los registros `ANSEL` y `ANSELH` tienen por default el valor de `1` y los pines funcionan como **inputs analógicas**. Cuando el valor es `0`, los pines funcionan como **digital** o **función especial** del puerto.

Para configurar un pin como entrada digital es necesario:
1. Configurar el puerto pin como entrada con `TRISX` (Configurada por default con `1`s=inputs).
2. Configurar el puerto como entrada analógica con `ANSEL`/`ANSELH` (Configurados por default con `1`s=inputs analógicas).