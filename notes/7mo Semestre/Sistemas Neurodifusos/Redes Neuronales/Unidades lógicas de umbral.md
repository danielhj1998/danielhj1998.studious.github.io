---
layout: note
---

# Neurona de McCulloh - Pitts

![neurona McCulloh-Pitts](../../../img/neuronaMcCullochPitts.jpg)

Es una neurona cuyas entradas pueden adquirir los valores $\left\{0,1\right\}$, al igual que la salida. Utiliza la función de activación **escalón unitario**.

Esta es una de las primeras **unidades lógicas de umbral**, que demostró que se pueden obtener diferentes respuestas, siguiendo por ejemplo el comportamiento de una compuerta lógica `AND` u `OR`.

El comportamiento de esta neurona se pude visualizar utilizando el **espacio de entradas**:

$$
a = \omega_0 + \omega_1 x_1 + \omega_2 x_2
$$

Nos interesa conocer el comportamiento donde $a$ cambia, en este caso la función escalón unitario cambia en $a = 0$.

$$
0 = \omega_0 + \omega_1 x_1 + \omega_2 x_2
$$

$$
\tag{1}
x_2 = -\frac{\omega_1}{\omega_2}x_1-\frac{\omega_0}{\omega_2}
$$

![img espacioEntradasMcCullochPitts jpg](../../../img/espacioEntradasMcCullochPitts.jpg)

Como se puede apreciar en $(1)$, la ecuación es una recta dicha recta describe el comportamiento de la neurona, donde todos los valores encima de la recta serán valores de activación y los que esten por debajo serán valores donde la neurona no será activada.

Por ejemplo para una compuerta `OR`, una posible recta sería la siguiente:

$$
x_2 = -x_1 + 0.5
$$

![img espacioEntradasORMcCullochPitts jpg](../../../img/espacioEntradasORMcCullochPitts.jpg)

Para una `AND` se puede proponer está otra:

$$
x_2 = -x_1 + 1.5
$$

![img espacioEntradasANDMcCullochPitts jpg](../../../img/espacioEntradasANDMcCullochPitts.jpg)

En general la línea trazada representa la **Frontera de desisición**. Los valores por encima representan las combinaciones de las entradas que activan la neurona y los valores por debajo los que no logran activarla.

La analogía que entre las demás partes de la neurona artificial es la siguiente:

$$
\underbrace{\omega_i}_\text{Codificación del conocimiento}:\underbrace{\Sigma}_\text{Integración de la información}:\underbrace{f}_\text{Desición}
$$

