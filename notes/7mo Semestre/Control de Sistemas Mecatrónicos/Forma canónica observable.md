## Ejercicio
Demostrar que la propiedad de observabilidad es invariante para cualquier transformación de similitud.

Se considera el sistema

$$
\begin{cases}
\dot{x} &= Ax + Bu\\
y &= Cx
\end{cases}\quad\ldots(1)
$$


con una entrada y una salida (para que las matrices de observabilidad y controlabilidad sean cuadradas).
Se define la transformación de similitud:

$$
x = S\tilde{x}
$$


$$
S\dot{\tilde{x}} = AS\tilde{x} + Bu\\
$$

$$
\begin{cases}
\dot{\tilde{x}} = S^{-1}AS\tilde{x} + S^{-1}Bu\\
y = CS\tilde{x}
\end{cases}\quad\ldots(4)
$$

$1$ y $4$ son similares $\lambda(A) = \lambda(S^{-1}AS)$
Sabemos que:

$$
O = \begin{bmatrix}C\\CA\\CA^2\\\vdots\\CA^{n-1}\end{bmatrix}
$$


La matriz de observabilidad para $4$,

$$
\begin{aligned}
\tilde{O} &= \begin{bmatrix}\tilde{C}\\\tilde{C}\tilde{A}\\\tilde{C}\tilde{A}^2\\\vdots\\\tilde{C}\tilde{A}^{n-1}\end{bmatrix} = \begin{bmatrix}CSI\\CSS^{-1}AS\\CS(S^{-1}AS)^2\\\vdots\\CS(S^{-1}AS)^{n-1}\end{bmatrix} = \begin{bmatrix}CS\\CAS\\CSS^{-1}A^2S\\\vdots\\CSS^{-1}A^{n-1}S\end{bmatrix}\\
&= \begin{bmatrix}CS\\CAS\\CA^2S\\\vdots\\CA^{n-1}S\end{bmatrix} = \begin{bmatrix}C\\CA\\CA^2\\\vdots\\CA^{n-1}\end{bmatrix}S
\end{aligned}
$$

$$
\boxed{\tilde{O} = OS}
$$

Despejando $S$

$$
S = O^{-1}\tilde{O}
$$

$$
S^{-1} = \tilde{O}^{-1}O
$$


Si $S$ es invertible,

$$
\text{rango}(\tilde{O}) = \text{rango}(O)
$$

Por lo que la propiedad de observabilidad `no cambia` al aplicar una transformación de similitud.

$$
\square
$$


El polinomio característico del sistema (1) se calcula de la siguiente forma:

$$
p(s) = \det(sI-A) = s^n + a_1 s^{n-1}+ a_2 s^{n-2} + \cdots + a_{n-1} s + a_n
$$


Si el sistema (1) es controlable, entonces puede ser transformado a otro sistema haciendo $x = S\tilde{x}$, donde $S$ es invertible.

$$
\begin{aligned}
\dot{\tilde{x}} &= S^{-1}AS\tilde{x} + S^{-1}Bu \\
&= \begin{bmatrix}
0&0&0&\cdots&0&-a_{n}\\
1&0&0&\cdots&0&-a_{n-1}\\
0&1&0&\cdots&\vdots&\vdots\\
\vdots&\ddots&\ddots&\ddots&\ddots&-a_{2}\\
0&\cdots&\cdots&0&1&-a_{1}\\
\end{bmatrix} \tilde{x} + \begin{bmatrix}bn\\ b_{n-1}\\ \vdots \\ b_2\\ b_1\end{bmatrix}u\\
\end{aligned}
$$

$$
y = CS\tilde{x}
$$


Donde,

$$
\def\rddots{\cdot^{\normalsize\cdot^{\normalsize\cdot}}}
S^{-1} = \tilde{O}^{-1}O = \begin{bmatrix}
a_{n-1}&\cdots&a_3&a_2&a_1&1\\
\vdots&\rddots&\rddots&\rddots&1&0\\
a_3&\rddots&\rddots&\rddots&\rddots&\vdots\\
a_2&a_1&1&\rddots&&\vdots\\
a_1&1&0&&&\vdots\\
1&0&\cdots&\cdots&\cdots&0\\
\end{bmatrix}\begin{bmatrix}C\\CA\\CA^2\\\vdots\\CA^{n-1}\end{bmatrix}
$$


#### Ejercicio: Representar el sistema en la forma canónica observable

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
