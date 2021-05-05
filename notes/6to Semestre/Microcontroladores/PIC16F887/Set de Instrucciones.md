Set de Instrucciones

# Parte del datasheet
http://ww1.microchip.com/downloads/en/devicedoc/31029a.pdf

# Operandos
|||
|---|---|
|f|Dirección de registro (RAM memory address), soporta 7 bits (necesarios 9), los dos faltantes se toman de `RP1` y`RP0` (`6` y `5`)|
|W|Working register (accumulator)|
|b|Dirección de bit en un registro (0 a 7)|
|k|Valor constante de 8 bits, o en el contexto de un salto (`goto`, `call`) es una dirección de Flash, pero solo soporta 11 bits (13 necesarios), los dos faltantes se obtienen del `PCLATH`(`4` y `3`)|
|x|`0` o `1`, no importa|
|d|Destino del resultado. Con `d=1`, el resultado va al registro utilizado. Con `d=0` el resultado va a `W`. El default es `1` (el profesor quiere la instrucción completa!)|
|PC|Program counter|
|$\overline{TO}$|Time-out bit (Cuando se acaba el tiempo del Watchdog)|
|C|Carry bit si al final de la suma hay acarreo se pone en `1`|
|DC|Digit Carry bit si al final de la suma en el primer cuarteto hay acarreo se pone en `1`|
|Z|Zero bit|
|$\overline{PD}$|Power-Down bit|

# Instrucciones
Hay 35 instrucciones.
## Operaciones de registro orientadas a bytes

| Memónico       | Descripción                  | Banderas | Ciclos | Nota  |
|----------------|------------------------------|----------|--------|-------|
| ADDWF f, d | Add W and f                  | C, DC, Z | 1      | 1, 2  |
| ANDWF f, d | AND W with f                 | Z        | 1      | 1, 2  |
| CLRF f    | Clear f                      | Z        | 1      | 2     |
| CLRW – | Clear W                      | Z        | 1      |       |
| COMF f, d | Complement f                 | Z        | 1      | 1, 2  |
| DECF f, d | Decrement f, 0x00 goes to 0xFF (as a cycle)| Z        | 1      | 1, 2  |
| DECFSZ f, d | Decrement f, Skip if 0       |          | 1(2)   | 1,2,3 |
| INCF f, d | Increment f, 0xFF goes to 0x00 (as a cycle)| Z        | 1      | 1, 2  |
| INCFSZ f, d | Increment f, Skip if 0       |          | 1(2)   | 1,2,3 |
| IORWF f, d | Inclusive OR W with f        | Z        | 1      | 1, 2  |
| MOVF f, d | Move f, usefull to know if register is 0| Z        | 1      | 1, 2  |
| MOVWF f | Move W to f                  |          | 1      |       |
| NOP – | No Operation, lets a machine cycle to pass|          | 1      |       |
| RLF f, d | Rotate Left f through Carry  | C        | 1      | 1, 2  |
| RRF f, d | Rotate Right f through Carry | C        | 1      | 1, 2  |
| SUBWF f, d | Subtract W from f (f-W)           | C, DC, Z | 1      | 1, 2  |
| SWAPF f, d | Swap nibbles in f            |          | 1      | 1, 2  |
| XORWF f,d | Exclusive OR W with f        | Z        | 1      | 1, 2  |
## Operaciones de registro orientadas a bits
| Memónico       | Descripción                  | Banderas | Ciclos | Nota  |
|-------------|---------------------------|-------|----|------|------|------|--|------|
| BCF    f, b | Bit Clear f               |  | 1     | 1, 2 |
| BSF    f, b | Bit Set f                 |  | 1     | 1, 2 |
| BTFSC  f, b | Bit Test f, Skip if Clear |  | 1 (2) | 3    |
| BTFSS  f, b | Bit Test f, Skip if Set   |  | 1 (2) | 3    |

## Operaciones de literales y control
| Memónico       | Descripción                  | Banderas | Ciclos | Nota  |
|-------------|---------------------------|-------|----|------|------|------|--|------|
| ADDLW   k | Add literal and W           | C, DC, Z | 1 |
| ANDLW   k | AND literal with W          | Z        | 1 |
| CALL    k | Call Subroutine             |          | 2 |
| CLRWDT  – | Clear Watchdog Timer        | TO, PD   | 1 |
| GOTO    k | Go to address               |          | 2 |
| IORLW   k | Inclusive OR literal with W | Z        | 1 |
| MOVLW   k | Move literal to W           |          | 1 |
| RETFIE  – | Return from interrupt       |          | 2 |
| RETLW   k | Return with literal in W    |          | 2 |
| RETURN  – | Return from Subroutine      |          | 2 |
| SLEEP   – | Go into Standby mode (wake 14.6.1)| TO, PD   | 1 |
| SUBLW   k | Subtract W from literal (k-W) | C, DC, Z | 1 |
| XORLW   k | Exclusive OR literal with W | Z        | 1 |

**Notas**
1. When an I/O register is modified as a function of itself (e.g., MOVF GPIO, 1), the value used will be that value present on the pins themselves. For example, if the data latch is ‘1’ for a pin configured as input and is driven low by an external device, the data will be written back with a ‘0’.							
2. If this instruction is executed on the TMR0 register (and where applicable, d = 1), the prescaler will be cleared if assigned to the Timer0 module.

3. If the Program Counter (PC) is modified, or a conditional test is true, the instruction requires two cycles. The second cycle is executed as a NOP.

## Más específico
* `Addwf f,d` `c,dc,z` Se suma el valor almacenado en el registro `f`, con el valor almacenado en `W` y se almacena el resultado acorde a `d` y modifica las banderas `c`,`dc` y `z`.
* `Addlw k` `c,dc,z` Se suma el valor `k`, con el valor almacenado en `W` y se almacena el resultado en `W` y modifica las banderas `c`,`dc` y `z`.