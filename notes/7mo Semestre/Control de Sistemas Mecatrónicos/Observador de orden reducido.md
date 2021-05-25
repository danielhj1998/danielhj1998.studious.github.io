---
layout: note
---

El observador de orden completo

$$
\dot{\hat{x}} = A\hat{x} + Bu + L(y - C\hat{x})
$$

estima **todas** las variables de estado. Sin embargo, de manera práctica algunas de las variables de estado pueden medirse con precisión y por lo tanto, no es necesario estimarlas.

El observador de orden reducido **sólo** aproximará las **variables desconocidas**.

Sea el sistema,

$$
\begin{cases}
    \dot{x} = Ax + Bu\\
    y = Cx\quad,\quad y\in \mathrm{R}
\end{cases}
$$

donde:

$$
x = \begin{bmatrix}
    x_a\\x_b
\end{bmatrix}\begin{aligned} 
    &\leftarrow\text{Parte medible}\\
    &\leftarrow\text{Parte NO medible}\\
\end{aligned}
$$

$$
\begin{aligned}
    (2)\quad\dot{x} &= \begin{bmatrix}
        \dot{x}_a\\\dot{x}_b
    \end{bmatrix} = \begin{bmatrix}
        A_{aa} &|& A_{ab}\\
        \hline
        A_{ba} &|& A_{bb}\\
    \end{bmatrix}\begin{bmatrix}
        x_a\\x_b
    \end{bmatrix} + \begin{bmatrix}
        B_a\\\hline B_b
    \end{bmatrix}u\\
    y &= \begin{bmatrix}
        1 &|& 0
    \end{bmatrix}\begin{bmatrix}
        x_a\\x_b
    \end{bmatrix}
\end{aligned}
$$

Por lo tanto:

$$
\begin{aligned}
    \dot{x}_a &= A_{aa}x_a + A_{ab}x_b + B_au\\
    \underbrace{\dot{x}_a - A_{aa}x_a  - B_au}_\text{Depende de la parte medible de $u$} &= A_{ab}x_b \\
\end{aligned}
$$

De $(2)$:

$$
\begin{aligned}
    \dot{x_b} &= A_{ba} x_a + A_{bb}x_b + B_bu\\
    (3)\quad\dot{x_b} &= A_{bb}x_b + \underbrace{A_{ba} x_a + B_bu}_\text{Son conocidos}\\
\end{aligned}
$$

La ecuación $(3)$ representa el sistema dinámico de la parte NO medible.

Se propone el observador para el sistema $(3)$:

$$
\begin{aligned}
    \dot{\hat{x}}_b &= A_{bb}\hat{x}_b + A_{ba}x_a + B_bu + L(y_\text{obs} - A_{ab}\hat{x}_b)\\
    &= A_{bb}\hat{x}_b + A_{ba}x_a + B_bu + L(\dot{x}_a - A_{aa}x_a - B_au - A_{ab}\hat{x}_b)\\
    &= (A_{bb} - LA_{ab})\hat{x}_b + A_{ba}x_a + B_bu + L(\dot{x}_a - A_{aa}x_a - B_au)\\
    \dot{\hat{x}}_b - L\dot{x}_a &= (A_{bb} - LA_{ab})\hat{x}_b + A_{ba}x_a + B_bu - LA_{aa}x_a - LB_au)\\
    \dot{\hat{x}}_b - L\dot{x}_a &= (A_{bb} - LA_{ab})\hat{x}_b + (A_{ba} - LA_{aa})x_a + (B_b - LB_a)u\\
    \dot{\hat{x}}_b - L\dot{x}_a &= (A_{bb} - LA_{ab})\hat{x}_b + (A_{ba} - LA_{aa})y + (B_b - LB_a)u\\
\end{aligned}
$$

$$
(4)\quad\dot{\hat{x}}_b - L\dot{x}_a = (A_{bb} - LA_{ab})(\hat{x}_b - Ly) + \left[(A_{bb} - LA_{ab})L + (A_{ba} - LA_{aa})\right]y + (B_b - LB_a)u
$$

Se definen:

$$
\begin{aligned}
    x_b - Lx_a &= x_b - Ly = \eta\\
    \hat{x}_b - Lx_a &= \hat{x}_b - Ly = \hat{\eta}\\
\end{aligned}
$$

Entonces, sustituyendo en $(4)$:

$$
(5)\quad\begin{cases}
    \dot{\hat{\eta}} = (A_{bb} - LA_{ab})\hat{\eta} + \left[(A_{bb} - LA_{ab})L + (A_{ba} - LA_{aa})\right]y + (B_b - LB_a)u\\
    \hat{x}_b = \hat{\eta} + Ly\\
\end{cases}
$$

El sistema $(5)$ representa al observador de estado de orden reducido.

La dinámica del observador depende de la matriz $A_{bb} - LA_{ab}$. Entonces la ganancia para el observador de orden reducido se calcula con los métodos de ubicación de polos para la matriz $A_{bb} - LA_{ab}$

## Ejercicio
Calcular la ganancia del observador de orden reducido para ubicar los polos en $-2 \pm 2j$.

$$
\begin{aligned}
    \dot{x} &= \begin{bmatrix}
       0 &|& 4 &  0\\
       \hline
       -3 &|& 0 & 2\\
       0 &|& 0 & -2\\
    \end{bmatrix}x + \begin{bmatrix}
        0\\\hline0\\2
    \end{bmatrix}u\\
    y &= \begin{bmatrix}
        1 &|& 0 & 0
    \end{bmatrix}x  = x_1
\end{aligned}
$$

```matlab
clc; clear all; close all;

A = [0  4   0
     -3  0  2
     0  0  -2];
B = [0 0 2]';
C = [1 0 0];

Abb = A(2:end,2:end);
Aab = A(1,2:end);

% Se obtienen los coeficientes del sistema
syms s;
n = size(Abb,2);
I = eye(n);

pla = collect(det(s*I - Abb))
a = sym2poly(pla);
a = a(2:end);

% Se calculan los coeficientes de lazo cerrado
% A partir de los polos deseados del sistema
p = [-30 -30];
plcd = 1;
for i=[1:length(p)]
    plcd = plcd * (s-p(i));
end
plcd = collect(plcd)

at = sym2poly(plcd);
at = at(2:end);

% Se obtiene S
Abbt = [zeros(1,n-1);eye(n-1)];
Abbt = [Abbt -fliplr(a)'];
Aabt = [zeros(1,n-1) 1];
Ot = obsv(Abbt,Aabt);

Ok = obsv(Abb,Aab);
Sinv = Ot^-1*Ok;
S = Sinv^-1

Lb = fliplr(at) - fliplr(a);
L = S*Lb

eig(Abb-L*Aab)
```

### Resultado

$$
L = \begin{bmatrix}
    0.5\\0.5
\end{bmatrix}
$$
