---
layout: note
title: Solución de ecuaciones en espacio de estado
---

Sea el sistema

$$
\begin{cases}
\dot{x} &= Ax + Bu\\
y &= Cx
\end{cases}\quad,\quad x(0) = x_0
$$

El problema consiste en obtener x(t) y la respuesta y(t) para el sistema.

Aplicando la transformada de Laplace al sistema:

$$
\begin{aligned}
\mathcal{L}\{\dot{x}\} &= \mathcal{L}\{Ax(t)\}+\mathcal{L}\{Bu(t)\}\\
\mathcal{L}\{y(t)\} &= \mathcal{L}\{Cx(t)\}
\end{aligned}
$$

$$
\begin{aligned}
sX(s) - x(0) &= AX(s) + BU(s)\\
Y(s) &= CX(s)
\end{aligned}
$$

$$
\begin{aligned}
sX(s) - AX(s) &= x(0) + BU(s)\\
(sI -A)X(s) &= x(0) + BU(s)\\
\end{aligned}
$$

Multiplicando por $(sI - A)$ por la izquierda:

$$
\begin{aligned}
X(s) &= (sI -A)^{-1}x(0) + (sI -A)^{-1}BU(s)\\
\end{aligned}
$$


Por lo tanto:

$$
Y(s) = C(sI-A)^{-1} x(0) + C(sI-A)^{-1} B U(s)
$$

Si $x(0) = 0$

$$
Y(s) = \underbrace{C(sI-A)^{-1} B}_{\text{Matriz de transferencia}} U(s)
$$


Aplicando transformada inversa de Laplace:

$$
x(t)=\mathcal{L}^{-1}\{X(s)\}=\mathcal{L}^{-1}\{(sI-A)^{-1}\}x_0+\mathcal{L}^{-1}\{(sI-A)^{-1}BU(s)\}
$$

$$
\begin{aligned}
y(t)&=\mathcal{L}^{-1}\{Y(s)\}=Cx(t)\\
y(t)&=\underbrace{C\mathcal{L}^{-1}\{(sI-A)^{-1}\}x_0}_\text{Solución homogénea (Respuesta transitoria)}+\underbrace{C\mathcal{L}^{-1}\{(sI-A)^{-1}BU(s)\}}_\text{Solución partícular (Respuesta estacionario)}
\end{aligned}
$$
