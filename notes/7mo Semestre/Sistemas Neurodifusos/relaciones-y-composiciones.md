---
layout: note
title: Relaciones y composiciones
---

# Relaciones difusas binarias
Es un tipo de conjunto difuso que relaciona dos tipos de espacios de discurso distintos.
#### Ejemplo

$$
X = {a,b,c,d}\\
Y = {\alpha, \beta, \gamma}\\
$$

![ff0e9d4d8c1ce07a802a21d031490b72.png](../../img/99745fa0b65245f78318b6db6eeef422.png)

$$
\begin{aligned}
R &= X\times Y \mapsto [0,1]\\
&= \left\{(x,y,\mu(x,y))|: (x,y)\in X\times Y\right\}
\end{aligned}
$$


#### Ejemplos de relaciones difusas binarias
* $X$ está cerca de $Y$ ($X$ e $Y$ son números).
* $X$ depende de $Y$ ($X$ e $Y$ son eventos).
* $X$ se parece a $Y$ ($X$ e $Y$ son objetos).
* Si $X$ es grande, entonces $Y$ es pequeño ($X$ es una medición e $Y$ es una acción correspondiente).

# Composición difusa
Se puede obtener la relación entre $X$ y $Z$ siguientes:
![963ac95500a4e9cb5e629bed73c50257.png](../../img/c200ddc5a30a4596bd197e342f7614db.png)

Esto se realiza mediante la composición difusa:

$$
R_1 o R_2 = \left\{(x,z,f(\mu_{R1},\mu_{R2}))|:x\in X;y\in Y;z \in Z\right\}
$$

## Composición difusa MAX-MIN
Para esta composición:

$$
R_1 o R_2 = \left\{(x,z,\text{MAX}_Y\left[MIN[\mu_{R1}(x,y),\mu_{R2}(y,z)]\right])|:x\in X;y\in Y;z \in Z\right\}
$$

Para el primer término:
![dce56a4bc7a1c7035c44f027e66ca60d.png](../../img/631030e10bbf4b4cb1b85509232c4b3e.png)
Por lo tanto el resultado es 0.7

La matriz calculada es la siguiente:

![fee199dcac360eb7615910fa19ac8c16.png](../../img/bafaaccbe04142549991952ae39d536f.png)
Por lo tanto:
![8e0e8d6f475982869ac8773fe5180dea.png](../../img/a5e3475513f741799cedbf90766b8727.png)
# Principio de extensión
Teniendo los siguientes conjuntos difusos:

$$
R = \left\{(x,y,\mu_R(x,y))|: x \in X; y \in Y\right\}
$$

![Relación difusa binaria](../../img/relacionDifusaContinua.png)

![Conjunto Difuso A](../../img/conjuntoDifusoAPrincipioExtensión.png)

Podemos extener $A$ sobre $R$ por medio de una extensión cilindrica:

![Extensión de A sobre R](../../img/extensionConjuntoAenR.png)

Ahora para obtener $R\ o\ R_A$ aplicandole el mínimo:

![Composición R o RA](../../img/composicionRoRA.png)

Ahora, se aplica el máximo proyectando sobre $Y$:

![Proyeccción R o RA en Y](../../img/proyeccionRoRAenY.png)

Obteniendo entonces el conjutno difuso $B$

![Conjunto difuso B](../../img/conjuntoDifusoBPrincipioExtensión.png)

Así que básicamente, se obtuvo el conjunto difuso $B$ a partir de $A$, por medio de la relación de composición entre $X$ e $Y$, $R$.

Ahora bien, se puede realizar la proyección de cualquier punto sobre el otro eje, por ejemplo:

![Extensión punto en X en Y](../../img/proyeccionPuntoRoRA.png)

Por lo tanto la composicion difusa transforma un **escalar** en **conjunto difuso**.
