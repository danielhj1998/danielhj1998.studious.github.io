Forma canónica controlable

#### Ejercicio: Demostrar que la propiedad de controlabilidad es invariante para cualquier transformación de similitud.
Se considera el sistema

$$
\begin{cases}
\dot{x} &= Ax + Bu\\
y &= Cx
\end{cases}\quad\ldots(1)
$$

con una entrada u una salida (para que las matrices de observabilidad y controlabilidad sean cuadradas).
Sea la transformación $\tilde{x} = Px$, con $P$ invertible, así:

$$
\begin{aligned}
x &= P^{-1}\tilde{x}\\
P^{-1}\dot{\tilde{x}} &= AP^{-1}\tilde{x} + Bu\\
\end{aligned}
$$

$$
\begin{cases}
\dot{\tilde{x}} = PAP^{-1}\tilde{x} + PBu\\
y = CP^{-1}\tilde{x}
\end{cases}\quad\ldots(4)
$$

$1$ y $4$ son similares $\lambda(A) = \lambda(PAP^{-1})$
Sabemos que:

$$
C = [B\ \ AB\ \ A^2B\ \ \cdots\ \ A^{n-1}B]
$$


La matriz de controlabilidad para $4$,

$$
\begin{aligned}
\tilde{C} &= [\tilde{B}\ \ \tilde{A}\tilde{B}\ \tilde{A}^2\tilde{B}\ \ \cdots\ \ \tilde{A}^{n-1}\tilde{B}]\\
&= [PB\ \ PAP^{-1}PB\ \ (PAP^{-1})^2PB\ \ \cdots\ \ (PAP^{-1})^{n-1}PB]\\
&= [PB\ \ PAB\ \ PA^2B\ \ \cdots\ \ PA^{n-1}B]\\
&= P[B\ \ AB\ \ A^2B\ \ \cdots\ \ A^{n-1}B]\\
&= PC\quad\ldots(5)
\end{aligned}
$$

Despejando $P$ de ($5$)

$$
P = \tilde{C}C^{-1}
$$

$$
P^{-1}\tilde{C} = C \quad\Rightarrow\quad P^{-1} = C\tilde{C}^{-1}
$$


Dado que $P$ es invertible,

$$
\text{rango}(\tilde{C}) = \text{rango}(C)
$$

Por lo que la propiedad de controlabilidad `no cambia` al aplicar una transformación de similitud.

$$
\square
$$


El polinomio característico del sistema (1) se calcula de la siguiente forma:

$$
p(s) = \det(sI-A) = s^n + a_1 s^{n-1}+ a_2 s^{n-2} + \cdots + a_{n-1} s + a_n
$$


Si el sistema (1) es controlable, entonces puede ser transformado a otro sistema haciendo $\tilde{x} = Px$, donde $P$ es invertible.

$$
\begin{aligned}
\dot{\tilde{x}} &= PAP^{-1}\tilde{x} + PBu = \begin{bmatrix}
-a_1 &-a_2 &-a_3 & \cdots & -a_n\\
1&0&\cdots&\cdots&0\\
0&1&0&\cdots&\vdots\\
\vdots&\ddots&\ddots&\ddots\\
0&\cdots&\cdots&1&0\\
\end{bmatrix}\\
y &= CP^{-1}\tilde{x}
\end{aligned}
$$


Donde,

$$
P^{-1} = C\tilde{C} = [B\ \ AB\ \ A^2B\ \ \cdots\ \ A^{n-1}B]\begin{bmatrix}
1&a_1&a_2&\cdots&a_{n-1}\\
0&1&a_1&\ddots&\vdots\\
0&0&1&\ddots&a_2\\
0&\cdots&\cdots&\ddots&a_1\\
0&\cdots&\cdots&0&1\\
\end{bmatrix}
$$


#### Ejercicio: Representar el sistema en la forma canónica controlable

$$
\dot{x} = \begin{bmatrix}
0&1&0&0\\
0&0&-1&0\\
0&0&0&1\\
0&0&5&0\\
\end{bmatrix}x + \begin{bmatrix}0\\1\\0\\-2\end{bmatrix}u
$$

$$
y = \begin{bmatrix}1&0&0&0\end{bmatrix}x
$$
