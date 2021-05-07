# Suma en binario
0+0=0
0+1=1
1+0=1
1+1=0 $\rightarrow$ nos pasamos!

A esto se le llama *acarreo de bits*. Cuando hay un acarreo de bits en un microcontrolador se activa el **Carry Flag**.

# Resta en binario
0-0=0
1-0=1
1-1=0
0-1=1 $\rightarrow$ Ya que le *pidió* prestado al de "alado" y ese al de alado y al de alado hasta el infinito, que es 1 y se van prestando, convirtiendose en 2 sucesivamente hasta que la última cifra vale 2, restando por 1, da 1.

La resta de binarios por sistema de complementos no se puede implementar de forma eficiente por los circuitos digitales.
Por eso, para realizar restas, se utiliza el sistema de `complemento a 2`. O sea que trabajan con signo.

Consiste en lo siguiente:
* A los números positivos se les asigna bit de signo `0` seguido por el número.
* A los números negativos se les asigna bit de signo `1` seguido del `complemento a 2` del número.

## Obtener el complemento a 2 ($C_2^2$)

Para obtener el complemento a 2, es necesario:
1. Invertir o complementar el número (complemento a 1 $C_2^1$).
2. Sumar 1 al bit menos significativo `LSB`

### Forma rápida (humana)
1. Leyendo el número de derecha a izquierda, encontrar el primer `1`.
2. Copiar esos números tal cual.
3. Los demás números de la izquierda invertirlos.

Ejemplo: $C_2^2(11010110)$
|1|1|0|1|0|1|1|0|
|---|---|---|---|---|---|---|---|
|||||||1|0|
|0|0|1|0|1|0|1|0|

Por lo tanto el resultado es 00101010.

**Nota**: No se utiliza el complemento a 1 porque el cero, tiene doble representación, *+0* y *-0*.

## Resta con complemento a 2
1. Se pasa a complemento a 2 el restando.
2. Se suma el complemento con el otro número. Del resultado, se obtiene con el signo dependiendo de si el número es signado o no:
	* Signados: `MSB` (`1` negativo).
	* No signados: `Carry Flag` (`0` negativo). Ya que siempre que la suma da un número positivo, carry flag se va a 1.
	
4. Se hace el complemento a 2 del resultado para obtener la magnitud.

La resta 30 - 47:

||0|1|1|1|1|0|
|---|---|---|---|---|---|---|
|-|1|0|1|1|1|1|

Se suma con el complemento a 2:

||1||||||
|---|---|---|---|---|---|---|
||0|1|1|1|1|0|
|+|0|1|0|0|0|1|
|
||1|0|1|1|1|1|

El resultado es negativo (`1` en el `MSB` y `Carry` es `0`). Se saca el complemento a 2:

|$C_2^2$|1|0|1|1|1|1|
|---|---|---|---|---|---|---|
|=|0|1|0|0|0|1|

La magnitud es 17, por lo tanto el resultado final es -17.