---
layout: note
---

La cuarta función de un relevador es la del enclavamiento. Es decir, que al presionar un interruptor, el circuito se mantenga encendido a pesar de usar de liberar el interruptor.

A continuación se exponen algunos circuitos que utilizan el principio de enclavamiento.

## Circuito Arranque-Paro con prioridad al paro

![circuito de arranque-paro con prioridad al paro](../../img/circuito-arranque-paro-prioridad-paro.svg)

Este circuito funciona como una flip flop, pues mantiene el estado al presionar el botón de arranque o de paro. Al presionar el botón de `ARRANQUE` se alimenta la bobina del relevador y hace que se activen los switches `K1`, esto a su vez hace que se cierre una nueva ruta para la energía hacia la bobina `K1`, por lo tanto se queda encendido y la forma de cerrarlo, es presionando el botón de `PARO`, quitando la energía.

![circuito de arranque-paro con prioridad al paro encendido](../../img/circuito-arranque-paro-prioridad-paro-on.svg)
El circuito se llama "con prioridad al paro" porque al presionar los dos botones al mismo tiempo, la máquina seguiría el estado de paro.

![circuito de arranque-paro con prioridad al paro ambos](../../img/circuito-arranque-paro-prioridad-paro-ambos.svg)

El circuito en norma **ANSI** es el siguiente:

![circuito de arranque-paro con prioridad al paro ambos](../../img/circuito-arranque-paro-prioridad-paro-ansi.svg)

## Circuito Arranque-Paro con prioridad al arranque

![circuito de arranque-paro con prioridad al arranque](../../img/circuito-arranque-paro-prioridad-arranque.svg)

![circuito de arranque-paro con prioridad al arranque](../../img/circuito-arranque-paro-prioridad-arranque-ansi.svg)

El circuito actúa muy similar al anterior, pero si se presionaran los dos, la bobina se seguiría alimentando, por lo tanto estaría encendido.

## Ejercicio: Circuito de selector doble

A continuación se muestra un circuito que tiene dos interruptores, cada uno controlando una carga, al presionar algún interruptor se debe activar su respectiva carga, pero el otro circuito debe de pararse. También existe un paro general que para ambos procesos.

![circuito arranque dos motores](../../img/circuito-arranque-doble.svg)
