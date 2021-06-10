---
layout: note
---

Sea el sistema

$$
\tag{1}
\begin{cases}
\begin{aligned}
    x(k+1) &= Ax(k) + Bu(k)\\
    y(k) &= Cx(k)
\end{aligned}
\end{cases}
$$

con condicion inicial $x(0)=x_0$

El objetivo es determinar $x(k)$ y la respuesta $y(k)$.

Aplicando transformada $\mathcal{Z}$ en ambos lados del sistema $(1)$,

$$
\begin{aligned}
    \mathcal{Z}\left\{x(k+1)\right\} &= \mathcal{Z}\left\{Ax(k)\right\} + \mathcal{Z}\left\{Bu(k)\right\}\\
    zX(z) - zx_0 &= AX(z)+ BU(z)\\
    zX(z) - AX(z) &= zx_0+ BU(z)\\
    (zI - A)X(z) &= zx_0+ BU(z)\\
    X(z) &= (zI - A)^{-1}zx_0+ (zI - A)^{-1}BU(z)\\
\end{aligned}
$$

$$
\tag{2}
\begin{cases}
\begin{aligned}
    X(z) &= (zI - A)^{-1}zx_0+ (zI - A)^{-1}BU(z)\\
    Y(z) &= CX(z) = C(zI - A)^{-1}zx_0+ C(zI - A)^{-1}BU(z)\\
\text{Si}\ x_0 = 0\quad\Rightarrow\quad Y(z) &= \underbrace{C(zI - A)^{-1}BU(z)}_\text{Matriz de transferencia}
\end{aligned}
\end{cases}
$$

Aplicando transformada inversa al sistema $(2)$,

$$
\begin{aligned}
    Z^{-1}\left\{X(z)\right\} &= x(k) = Z^{-1}\left\{(zI-A)^{-1}z\right\}x_0 + Z^{-1}\left\{(zI-A)^{-1}BU(z)\right\}\\
    y(k) &= Cx(k) + Du(k)
\end{aligned}
$$

$$
y(k) = \underbrace{C Z^{-1}\left\{(zI-A)^{-1}z\right\}}_\text{Respuesta transitoria}x_0 + \underbrace{C Z^{-1}\left\{(zI-A)^{-1}BU(z)\right\}}_\text{Respuesta estacionaria}
$$

#### Ejercicio
Determinar la respuesta del sistema:

$$
\begin{cases}
    x_1(k+1) = 2 x_1(k) + 0.5 x_2(k) - 5\\
    x_2(k+1) = 0.8 x_2(k) + 2\\
    y(k) = x_1(k) - x_2(k)
\end{cases}
$$

Con $c.i.$ $x_1(0) = 2$, $x_2(0) = -1$ y entrada $u(k) = 1$

$$
\begin{cases}
    x(k+1) = \begin{bmatrix}
        2 & 0.5\\
        0 & 0.8\\
    \end{bmatrix}x(k) + \begin{bmatrix}
        -5\\2
    \end{bmatrix}u(k)\\
    y(k) = \begin{bmatrix}
        1 & -1
    \end{bmatrix}x(k)
\end{cases}
$$

```matlab
clc; close all; clear all;

A = [2 0.5
     0 0.8];
B = [-5
      2];
C = [1 -1];

x0 = [2
     -1];

syms z;
U = z/(z-1);
I = eye(size(A,1));

yh = C*iztrans((z*I-A)^-1 * z)*x0
yp = C*iztrans((z*I-A)^-1 * B*U)

y = yh + yp
```

El resultado es el siguiente:

$$
y = \frac{187}{12}0.8^k - \frac{31}{12}2^k - 10
$$
