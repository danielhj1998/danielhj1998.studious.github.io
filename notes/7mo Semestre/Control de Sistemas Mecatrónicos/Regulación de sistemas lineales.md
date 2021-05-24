---
layout: note
---

La señal de referencia es una constante.

$$
r(t) = r
$$

El problema consiste en que la salida $y$ se aproxime a la señal de referencia $r$,

$$
y(t)\xrightarrow[t\to\infty]{} r
$$

Considere el sistema `SISO`:

$$
(1)\quad \begin{cases}
    \dot{x} = Ax + Bu\\
    y = Cx
\end{cases}\quad\quad \begin{matrix}
A: n\times n\\
B: 1\times n\\
C: n\times 1\\
\end{matrix}
$$

## Caso 1: El sistema $(1)$ tiene un integrador
Se asume que la matriz $A$ tiene un valor propio en $0$ (tiene un integrador).

![diagrama de bloques de sistema retroalimentado](../../img/regulacionSistemasLI1.png)

$$
\begin{aligned}
    u &= (r - \overbrace{x_1}^{y})K_1 - x_2 K_2 - x_3 K_3 - \ldots - x_n K_n\\
    &= K_1 r - \underbrace{\begin{bmatrix}
        K_1 & K_2 & \ldots & K_n
    \end{bmatrix}}_{K} \underbrace{\begin{bmatrix}
        x_1 \\ x_2\\\ldots \\ x_n
    \end{bmatrix}}_{x}\\
    (2)\quad&= K_1 r - Kx
\end{aligned}
$$

Sustituyendo (2) en (1)

$$
\begin{aligned}
    \dot{x} &= Ax + B(K_1 r - Kx)\\
(3)\quad&= (A - BK) x + B K_1 r\quad\leftarrow{\text{Sistema en lazo cerrado}}
\end{aligned}
$$

Los polos en lazo cerrado se asignarán al sistema $(3)$:

$$
p_{lc}(s) = \det(sI - (A-BK)) = (s-\mu_1)(s-\mu_2)\ldots(s-\mu_n)
$$

En estado estacionario:

$$
(4)\quad\lim_{t \to \infty} \dot{x}(t) = (A - BK) \lim_{t\to\infty} x(t) + B K_1 r
$$

Haciendo $(3) - (4)$:

$$
\dot{x} -\lim_{t \to \infty} \dot{x}(t) = (A-BK)\left(x - \lim_{t\to\infty} x(t)\right) 
$$

Se define $e = x - \lim_{t\to\infty} x(t)$, entonces:

$$
\boxed{\dot{e}(t) = (A-BK)e(t)}
$$

Por lo que:

$$
e(t) = e^{(A-BK)t}e(0)
$$

Si $(A - BK)$ es estable (sus valores propios son todos negativos):

$$
|e(t)| \xrightarrow[t\to\infty]{}0
$$

En resumen, el problema de regulación para el caso $(1)$, se resuelve como un problema de ubicación de polos para la matriz $A - BK$

## Caso 2: El sistema $(1)$ NO tiene un integrador

## Tips
Para saber si un sistema tiene un integrador:
* La matriz $A$ tiene un valor propio en $0$
* La función de transferencia tiene una s multiplicando en el denominador

## Ejercicios
### 1.
Sea el sistema:

$$
\begin{aligned}
    \dot{x} &= \begin{bmatrix}
        0 & 1 & 0\\
        0 & 0 & 1\\
        -1 & -5 & -6\\
    \end{bmatrix}x + \begin{bmatrix}
        0\\1\\1
    \end{bmatrix}u\\
    y &= \begin{bmatrix}
        1 & 0 & 0
    \end{bmatrix}x
\end{aligned}
$$

Determinar las ganancias del controlador tales que los polos del sistema en lazo cerrado se ubiquen en $-2\pm 4j$, $-10$.

$$
|r - y| \xrightarrow[t\to\infty]{} 0
$$

### 2.
Sea el sistema:

$$
\begin{aligned}
    \dot{x} &= \begin{bmatrix}
        0 & 1 & 0\\
        0 & 0 & 1\\
        0 & -5 & -6\\
    \end{bmatrix}x + \begin{bmatrix}
        0\\0\\1
    \end{bmatrix}u\\
    y &= \begin{bmatrix}
        1 & 0 & 0
    \end{bmatrix}x
\end{aligned}
$$

1. Diseñar un sistema de regulación, es decir calcular las ganancias del controlador tales que los polos del sistema en lazo cerrado se ubiquen en $-2\pm 2j$ y $-10$.

``` matlab
clc; close all; clear all;

% Ejercicio 2
A = [0  1  0
     0  0  1
     0  -5  -6];
B = [0 0 1]';
C = [1 0 0];

% Se identifica si tiene integrador
eig(A) % Sí tiene integrador

I = eye(size(A,1));

syms s k;
p1 = -2 + 2i; p2 = -2-2i; p3 = -10;
plc = collect((s-p1)*(s-p2)*(s-p3))

PLCA = A^3 + 14*A^2 + 48*A + 80*I;
C = [B A*B A^2*B];

k = [0 0 1] * C^-1 * PLCA

eig(A - B*k)
```
2. Realizar la simulación del sistema en lazo cerrado. $r$ escalón unitario.
3. Calcular K tal que el máximo sobreimpulso sea $12\%$ y el tiempo de establecimiento de $0.5s$
