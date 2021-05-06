Sea el sistema:

$$
(1)\begin{cases}
\dot{x} &= Ax + Bu\\
y &= Cx
\end{cases}
$$

Si el par $(A,C)$ no es observable, entonces no es posible asignar una dinámica estable a la matriz $(A-LC)$ de manera directa.

$$
    r = \text{rank}(\theta) < n    
$$

Donde $r$ es el número de vectores fila linealmente independientes de $O_k$

## Teorema 2
Sea el sistema $(1)$ tal que 

$$
    \text{rank}(O_k) = \text{rank}(\begin{bmatrix}
        C\\CA\\CA^2\\\vdots\\CA^{n-1}
    \end{bmatrix}) = r < n
$$

Sean $S_1, S_2, \ldots, S_r$ los primeros vectores fila $l.i.$ de $\theta$ y $S_{r+1},S_{r+2},\ldots, S_n$ vectores fila arbitrarios tales que:

$$
    S = \begin{bmatrix}
        S_1\\S_2\\\vdots\\S_r\\S_{r+1}\\S_{r+2}\\\vdots\\S_n
    \end{bmatrix}
$$

Donde $S$ es invertible, es decir:

$$
    \det(S)\neq 0
$$

Entonces la transformación de estado $z = Sx$, ó $x = S^{-1}Z$

$$
    \dot{x} = Ax + Bu
$$

$$
    S(S^{-1}\dot{z} = AS^{-1}z + Bu) = \begin{bmatrix}
       A_{11} & 0_A\\
       A_{21} & A_{22}\\
    \end{bmatrix}z + \begin{bmatrix}
        B_1\\B_2
    \end{bmatrix}u
$$

$$
(2)\quad\begin{cases}
    \dot{z} = SAS^{-1}z + SBu\\
    y = Cx = CS^{-1}z = \begin{bmatrix}
        C_1&0_C
    \end{bmatrix}z
\end{cases}
$$

Donde:

$A11 : r\times r$
$A_{21}: (n-r)\times r$
$A_{22}:(n-r)\times(n-r)$
$0_A:r\times(n-r)$
$B_1: r\times m$
$B_2: (n-r)\times m$
$C_1: p\times r$
$0_C: p\times (n-r)$

Los sistemas $(1)$ y $(2)$ son similares,

$$
    \lambda(A) = \lambda(A_{11}) \cup \lambda(A_{22})
$$

El observador de estado se propone para el sistema $(2)$

$$
\begin{aligned}
    \dot{\hat{z}} &= \begin{bmatrix}
        A_{11}&0\\
        A_{21}&A_{22}
    \end{bmatrix}\hat{z} + \begin{bmatrix}
        B_1\\B_2
    \end{bmatrix}u + \begin{bmatrix}
        \bar{L}_1\\\bar{L}_2
    \end{bmatrix}(y - [C_1\ \ 0]\hat{z})\\
    &= \begin{bmatrix}
        A_{11}&0\\
        A_{21}&A_{22}
    \end{bmatrix}\hat{z} + \begin{bmatrix}
        B_1\\B_2
    \end{bmatrix}u + \begin{bmatrix}
        \bar{L}_1\\\bar{L}_2
    \end{bmatrix}y - \begin{bmatrix}
        \bar{L}_1\\\bar{L}_2
    \end{bmatrix}[C_1\ \ 0]\hat{z}\\
    &= \begin{bmatrix}
        A_{11}&0\\
        A_{21}&A_{22}
    \end{bmatrix}\hat{z} + \begin{bmatrix}
        B_1\\B_2
    \end{bmatrix}u + \begin{bmatrix}
        \bar{L}_1\\\bar{L}_2
    \end{bmatrix}y - \begin{bmatrix}
        \bar{L}_1C_1&0\\
        \bar{L}_2C_1&0\\
    \end{bmatrix}\hat{z}\\
\end{aligned}
$$

Por lo tanto:

$$
    \dot{\hat{z}} = \begin{bmatrix}
        A_{11} - \bar{L}_1C_1& 0\\
        A_{21} - \bar{L}_2C_1& A_{22}
    \end{bmatrix}\hat{z} + \begin{bmatrix}
        B_1\\B_2
    \end{bmatrix}u + \begin{bmatrix}
        \bar{L}_1\\\bar{L_2}
    \end{bmatrix}y
$$

La estabilidad del observador de estado: $\lambda(A_{11} - \bar{L}_1C_1) \cup \lambda(A_{22})$

El sistema $(1)$ es detectable si todos los valores propios de $A_{22}$ son estables.

El diseño de un observador de estado cuando el par $(A,C)$ no es observable se resuelve como un problema de ubicación de polos para el par $(A_{11}, C_1)$, es decir, a partir de $A_{11}$ y $C_1$ se calcula $\bar{L}_1$.

Para $\bar{L}$

$$
    \boxed{L = \begin{bmatrix}
        \bar{L}_1\\0
    \end{bmatrix}}
$$

Se tiene el observador de estado $\hat{x} = S^{-1}\hat{z}$

$$
\begin{aligned}
    \dot{\hat{x}} &= A\hat{x} + Bu + L(y-C\hat{x})\\
    S^{-1}\dot{z} &= AS^{-1}z + Bu + L(y-CS^{-1}\hat{z})\\
    \dot{z} &= SAS^{-1}z + SBu + \underbrace{SL}_{\bar{L}}(y-CS^{-1}\hat{z})\\
\end{aligned}
$$

$$
\bar{L} = SL
$$

$$
    \boxed{L = S^{-1}\bar{L}}
$$

## Procedimiento
1. Verificar si el sistema es observable `r = rank(Ok)`
2. Formar la matriz $S$
3. Calcular $\lambda(A_{22})$

## Ejemplo

Sea el sistema 

$$
\begin{aligned}
    \dot{x} &= \begin{bmatrix}
        0 & -1 & 0 & 0 & -4\\
        0 & 0 & 1 & 0 & 1\\
        0 & 1 & 0 & 0 & 2\\
        -2 & 1 & 0 & -2 & 4\\
        0 & 0 & 0 & 0 & -2\\
    \end{bmatrix}x + \begin{bmatrix}
        0\\1\\0\\0\\0
    \end{bmatrix}u\\
    y &= \begin{bmatrix}
        1 & 0 & 0 & 0 & 0
    \end{bmatrix}
\end{aligned}
$$

```matlab
clc; close all; clear all;

A = [0  -1  0  0  -4
     0  0  1  0  1
     0  1  0  0  2
     -2  1  0  -2  4
     0  0  0  0  -2];
B = [0 1 0 0 0]';
C = [1 0 0 0 0];

Ok = obsv(A,C);
r = rank(Ok)  % es de rango 4

Por lo tanto se propone S5

S5 = [0 0 0 1 0]';
S = Ok(:,1:4);
```
