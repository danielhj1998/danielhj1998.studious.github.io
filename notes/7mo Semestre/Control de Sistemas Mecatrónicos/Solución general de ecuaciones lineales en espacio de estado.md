Solución general de ecuaciones lineales en espacio de estado

## Matriz exponencial
sea:

$$
A = \begin{bmatrix}a&b\\c&d\end{bmatrix}
$$


$$
e^{At} = \begin{bmatrix}e^{at}&e^{bt}\\e^{ct}&e^{dt}\end{bmatrix}
$$


# Solución general de ecuaciones lineales en espacio de estado
Sea el sistema

$$
(1)\begin{cases}
\dot{x} &= Ax + Bu\\
y &= Cx
\end{cases}\quad,\quad x(0) = x_0
$$

El problema consiste en obtener x(t) y la respuesta y(t) para el sistema.


## Ejemplo

$$
\dot{x} = 5x + 2u\quad,\quad c.i. = -1
$$

$$
u = 1
$$

$$
\dot{x} - 5x = 2u
$$

$$
e^{-5t}(\dot{x} - 5x) = e^{-5t}2u
$$

$$
e^{-5t}\dot{x} - 5xe^{-5t} = 2e^{-5t}u
$$

$$
\dfrac{d}{dt}(e^{-5t}x) = 2e^{-5t}2u
$$

Integrando:

$$
\left.e^{-5\tau}x(\tau)\right|^t_0 = -\dfrac{2}{5}\left.e^{-5t}\right|^t_0
$$


Despejando x:

$$
x = -\dfrac{3}{5}e^{-5t} - \dfrac{2}{5}
$$

$$
\square
$$


## Solución general

De (1):

$$
\dot{x} - Ax = Bu
$$

$$
e^{-At}(\dot{x} - Ax) = e^{-At}Bu
$$

$$
e^{-At}\dot{x} - e^{-At}Ax = e^{-At}Bu
$$

$$
e^{-At}\dot{x} - Ae^{-At}x = e^{-At}Bu
$$

$$
\dfrac{d}{dt}\left(e^{-At}x\right) = e^{-At}Bu
$$

$$
\left.e^{-At}x\right|^t_0 = \int_0^t e^{-A\tau}Bu\ d\tau
$$

$$
e^{-At}x - \underbrace{e^{0}}_Ix(0) = \int_0^t e^{-A\tau}Bu\ d\tau
$$

$$
e^{-At}x = x(0) + \int_0^t e^{-A\tau}Bu\ d\tau
$$

$$
\boxed{x = e^{At}x(0) + e^{At}\int_0^t e^{-A\tau}Bu\ d\tau}
$$

$$
\boxed{x = e^{At}x(0) + \int_0^t e^{A(t-\tau)}Bu\ d\tau}\\
\text{Fórmula general}
$$

Por lo tanto

$$
\boxed{y = Cx = \underbrace{Ce^{At}x(0)}_\text{respuesta en transitorio} + \underbrace{C\int_0^t e^{A(t-\tau)}Bu\ d\tau}_\text{respuesta en transitorio}}
$$


Comparando con la solución por Laplace:

$$
y(t)=C\mathcal{L}^{-1}\{(sI-A)^{-1}\}x_0+C\mathcal{L}^{-1}\{(sI-A)^{-1}BU(s)\}
$$

$$
\boxed{e^{At} = \mathcal{L}^{-1}\left\{(sI-A)^{-1}\right\}}
$$

