Números base DEC,BIN y HEX

### Para pasar de decimal a otra base (DEC → X):

  
1. Se divide el número entero entre la otra base: 616389/16 = 38524.3125  
2. La parte fraccionaría del número se multiplica por la base: 0.3125*16 = 5  
3. La parte entera se sigue dividendo...  
4. El proceso se repite hasta que se llega a 0 entre la base: 0/16 = 0. Eso significa que esos son los ceros a la izquierda, por lo tanto el último número diferente de 0, es el **MSB** (Most valuable bit).  
5. Se escribe el número empezando por el **MSB** al **LSB**.  

En realidad los Bits son solo para binarios, pero es para entender al idea.  
  

### Para pasar de otra base a decimal (X → DEC):

  
Solo se multiplica el valor de la cifra por la base elevada al número de posición:  
  
|	|	|	|	|	|	|	|	|
|---|---|---|---|---|---|---|---|
|0|1|0|1|0|1|0|0| | 
|2^7|2^6|2^5|2^4|2^3|2^2|2^1|2^0| |
|0| + 64| + 0| + 16| + 0| + 4| + 0| + 0| = 84 |
  

## Tabla DEC,BIN y HEX

  

| Decimal | Binario | Hexadecimal |
| --- | --- | --- |
| 0   | 0000 | 0   |
| 1   | 0001 | 1   |
| 2   | 0010 | 2   |
| 3   | 0011 | 3   |
| 4   | 0100 | 4   |
| 5   | 0101 | 5   |
| 6   | 0110 | 6   |
| 7   | 0111 | 7   |
| 8   | 1000 | 8   |
| 9   | 1001 | 9   |
| 10  | 1010 | A   |
| 11  | 1011 | B   |
| 12  | 1100 | C   |
| 13  | 1101 | D   |
| 14  | 1110 | E   |
| 15  | 1111 | F   |
