---
layout: note
title: Transformaciones de similitud
---

Considere el vector de estado

$$
\vec{x} = \begin{bmatrix}
x_1\\x_2\\\vdots\\x_n
\end{bmatrix} \in \mathbb{R}^n
$$


El conjunto de vectores $\{\vec{x_1}, \vec{x_2},\ldots, \vec{x_n}\}$ se dice que es `linealmente dependiente` si existen números reales $\alpha_1, \alpha_2,\ldots,\alpha_n$ no todos cero, tales que:

$$
\alpha_1\vec{x_1} + \alpha_2\vec{x_2} +\cdots+ \alpha_n\vec{x_n} = 0
$$


Si el único conjunto de vectores que satisface la ecuación es:

$$
\alpha_1 = \alpha_2 = \cdots = \alpha_n = 0
$$

Entonces el conjunto de vectores $\{\vec{x_1}, \vec{x_2},\ldots, \vec{x_n}\}$ se dice que es `linealmente independiente`.

## Ejercicio
Cuáles de los siguientes vectores son l.d. o l.i.?
a) $\vec{x_1}=\begin{bmatrix}1\ \ 1\end{bmatrix}; \vec{x_2}=\begin{bmatrix}-3\ \ -3\end{bmatrix}$
Es l.d.
b) $\vec{x_1}=\begin{bmatrix}1\ \ 1\end{bmatrix}; \vec{x_2}=\begin{bmatrix}-1\ \ 1\end{bmatrix}$
Es l.i.
c) $\vec{x_1}=\begin{bmatrix}1\ \ 3\end{bmatrix}; \vec{x_2}=\begin{bmatrix}0\ \ 0\end{bmatrix}$
Es l.d.

# Base
Un conjunto de vectores $l.i.$ en $\mathbb{R}^n$ es llamado base si cada vector en $\mathbb{R}^n$ puede expresarse como una combinación lineal única.
En $\mathbb{R}^n$, cualquier conjuntono de vectores $l.i.$ puede usarse como una base.

Sea el conjunto $\{q_1, q_2,\ldots,q_n\}$, $q_i \in \mathbb{R}^n$. Entonces $x$ puede expresarse de manera única como:

$$
x = \alpha_1 q_1 + \alpha_1 q_1 + \cdots + \alpha_n q_n = \underbrace{[q_1\ q_2\ \ldots\ q_n]}_Q \underbrace{\begin{bmatrix}\alpha_1\\\alpha_2\\\vdots\\\alpha_n\end{bmatrix}}_{\tilde{x}}
$$


Se define $Q = [q_1\ q_2\ \ldots\ q_n]$, $n\times n$ y también $\tilde{x} = \begin{bmatrix}\alpha_1\\\alpha_2\\\vdots\\\alpha_n\end{bmatrix}$, entonces:

$$
x = Q\tilde{x}\quad\text{ó}\quad \tilde{x} = Q^{-1}x
$$


Considere la ecuación:

$$
Ax = y
$$

Con respecto a la base $\{q_1\ q_2\ \ldots\ q_n\}$ se tiene que:

$$
\tilde{A}\tilde{x} = \tilde{y}
$$

Donde:
$x = Q\tilde{x}$
$y = Q\tilde{y}$
$Q = [q_1\ q_2\ \ldots\ q_n]$

Sustituyendo:

$$
\begin{aligned}
Ax &= y\\
AQ\tilde{x} &= Q\tilde{y}\\
Q^{-1}(AQ\tilde{x} &= Q\tilde{y})\\
\underbrace{Q^{-1}AQ}_{\tilde{A}}\tilde{x} &= \tilde{y}\\
\end{aligned}
$$

Entonces $\tilde{A} = Q^{-1}AQ$ es similar con la matriz A, es decir, tienen el mismo conjunto de valores propios.

$$
\lambda(A) = \lambda(\tilde{A})\quad\Rightarrow\quad p(s) = \det(sI-A) = \det(sI-\tilde{A})
$$


## Ejercicio
A. Demostrar que:

$$p(s)= \det(sI-\tilde{A}) = \det(sI-A$$
$

$$
\begin{aligned}
p(s)&=\det(sI-\tilde{A})\\
&=\det(sI-Q^{-1}AQ)\\
&=\det(sQ^{-1}Q-Q^{-1}AQ)\quad\leftarrow\quad I=Q^{-1}Q\\
&=\det(Q^{-1}sQ-Q^{-1}AQ)\\
&=\det(Q^{-1}[sI-A]Q)\\
&=\det(Q^{-1})\det(sI-A)\det(Q)\\
&=\det(Q^{-1})\det(Q)\det(sI-A)\\
&=\det(Q^{-1}Q)\det(sI-A)\\
&=\det(sI-A)\\
\end{aligned}
$$


B. Demostrar que:

$$\det(sI-\tilde{A}) = \det(sI-A)$$

# Variables de estado
Para el sistema dinámico, $x = Q\tilde{x}$

$$
(a) = \begin{cases}\dot{x} = Ax + Bu\\
y = Cx
\end{cases}
$$

entonces,

$$
Q\dot{\tilde{x}} = AQ\tilde{x} + Bu
$$

$$
(b) = \begin{cases}\dot{\tilde{x}} = Q^{-1}AQ\tilde{x} + Q^{-1}Bu\\
y = CQ\tilde{x}
\end{cases}
$$
