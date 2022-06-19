---
layout: note
title: Estabilidad de Lyapunov
---

* Primer método (Método indirecto): **Requiere** de la solución explícita del sistema dinámico.
* Segundo método (Método directo): **No requiere** de la solución explícita del sistema dinámico. Se basa en proponer **funciones definidas positivas**.

# Función definida positiva (DP)
Se dice que una función escalar $V(x)$ es definida positiva en una región $\Omega$ si
1. $V(x) > 0$ para todo $x \neq 0$
2. $V(0) = 0$

## Ejercicios: demostrar si las funciones son DP o no.
1. $V(x_1,x_2) = (x_1 + x_2)^2$
si $x_1 = -x_2$ , $x_2 \neq 0$:

    $$
    V(x_1,x_2) = (x_1 + x_2)^2 = 0
    $$
    
    Por lo que **no** es definida positiva.

2. $V(x_1,x_2) = x_1^2$
    No es porque $x_2$ puede ser 0 para cualquier valor de $V$

3. $V(x_1,x_2) = |x_1+x_2|$
    No es por que si $x_1 = -x_2$, $V = 0$ para cualquier valor de $x_2$

4. $V(x_1,x_2) = |x_1| + |x_2|$ $\checkmark$
    Sí es porque la única forma de que sea 0, es que $x_1$ y $x_2$ sean cero, para los demás casos seríá positiva.

# Matriz definida positiva

$$
P > 0\quad,\quad P:n\times n
$$

Una matriz $P = P^{T}$, es definida positiva si todos sus valores propios son positivos.

# Forma cuadrática
Sea $P > 0$ , $P = P^{T}$ , entonces

$$
V(x) = x^{T} P x > 0
$$

$$
V(x) = x_1^2 + x_2^2 = [x_1\ \ x_2]\begin{bmatrix}
    x_1\\x_2
\end{bmatrix} = x^{T} I x > 0
$$

# Desigualdad de Rayleigh

$$
0 < \lambda_{min}(P)||x||^2 \leq x^{T}Px \leq \lambda_{max}(P) ||x||^2
$$


## Ejercicios:
1. Determinar si la función es DP:
    1. $V(x_1,x_2,x_3) = x_1^2 + 6x_2^2 + x_3^2 + 4 x_1 x_2 - 8 x_2 x_3 - 2 x_1 x_3$
        
        $$
        \begin{aligned}
            &= \left[\begin{array}{c:c:c}
                x_1 + 2 x_2 -x_3 & 6 x_2 + 2 x_1 - 4 x_3 & x_3 + 4 x_2 -x_1
            \end{array}\right]\underbrace{\begin{bmatrix}
                x_1\\x_2\\x_3
            \end{bmatrix}}_{x}\\
            &=\begin{bmatrix}
                x_1  & x_2 & x_3
            \end{bmatrix}\underbrace{\begin{bmatrix}
                1 & 2 & -1\\
                2 & 6 & -4\\
                -1 & -4 & 1\\
            \end{bmatrix}}_{P}\begin{bmatrix}
                x_1\\x_2\\x_3
            \end{bmatrix}
        \end{aligned}
        $$
        
        Verificando los valores propios de $P$
        
        ```matlab
        P = [1  2  -1
             2  6  -4
            -1  -4  1];
            
        lambdap = eig(P)
        ```
        
        $$
        \lambda(P) = \begin{bmatrix}
            -1.22\\
            0.3697\\
            8.8526
        \end{bmatrix}
        $$
        
        Al tener un valor negativo, significa que $V$ **NO** es DP.
        
    2. $V(x_1,x_2,x_3) = x_1^2 + 3 x_2^2  + 11 x_3^2  - 2 x_1 x_2 + 4 x_2 x_3 + 2 x_1 x_3$

        $$
        \begin{aligned}
            &= \left[\begin{array}{c:c:c}
                x_1 - 2 x_2 + 2 x_3 & 3 x_2 - x_1 + 2 x_3 & 11 x_3 + 2 x_2 + x_1
            \end{array}\right]\underbrace{\begin{bmatrix}
                x_1\\x_2\\x_3
            \end{bmatrix}}_{x}\\
            &=\begin{bmatrix}
                x_1  & x_2 & x_3
            \end{bmatrix}\underbrace{\begin{bmatrix}
                1 & -1 & 1\\
                -1 & 3 & 2\\
                1 & 2 & 11\\
            \end{bmatrix}}_{P}\begin{bmatrix}
                x_1\\x_2\\x_3
            \end{bmatrix}
        \end{aligned}
        $$
        
        Verificando los valores propios de $P$
        
        ```matlab
        P = [1  -1  1
            -1  3   2
             1  2  11];
             
        lambdap = eig(P)
        ```
        
        $$
        \lambda(P) = \begin{bmatrix}
            0.3007\\
            3.1738\\
           11.5255
        \end{bmatrix}
        $$
        
        Al tener un valor negativo, significa que $V$ **NO** es DP.

2. Determinar el valor de $a$ para que $V(x)$ sea definida positiva.
    
    $$
    V(x) = a x_1^2 + 2 x_1 x_3 + a x_2^2 + 4 x_2 x_3 + a x_3^2
    $$
    
    $$
    \begin{aligned}
        &= \left[\begin{array}{c:c:c}
            a x_1 + 1 x_3 & a x_2 + 2 x_3 & x_1 + 2 x_2 + a x_3
        \end{array}\right]\begin{bmatrix}
            x_1\\x_2\\x_3
        \end{bmatrix}\\
        &=\begin{bmatrix}
            x_1  & x_2 & x_3
        \end{bmatrix}\begin{bmatrix}
            a & 0 & 1\\
            0 & a & 2\\
            1 & 2 & a\\
        \end{bmatrix}\begin{bmatrix}
            x_1\\x_2\\x_3
        \end{bmatrix}
    \end{aligned}
    $$
    
    ```matlab
    syms a;
    P = [a  0  1
         0  a  2
         1  2  a];
         
    eig(P)
    ```

    $$
    \lambda(P) = \begin{bmatrix}
        a\\
        a + \sqrt{5}\\
        a - \sqrt{5}\\
    \end{bmatrix}
    $$
    
    
    $$
    a - \sqrt{5} > 0\quad\Rightarrow\quad \boxed{a > \sqrt{5}}
    $$
    
    
    
# Teorema (Segundo método de Lyapunov)
Sea el sistema definido por,

$$
\dot{x} = f(x,t)\quad,\quad \begin{aligned}
    x(0) &= x_0\\
    f(0,t) &= 0\quad\forall\quad t\geq0
\end{aligned}
$$

Si existe una función $V(x)$ tal que ,

1. $V(x)>0$
2. $\dot{V}(x)\vert_{(1)}<0$

Entonces el punto de equilibrio es **asintóticamente estable**.

Sea el sistema lineal:

$$
\dot{x} = Ax
$$

$$
\begin{aligned}
    \dot{x}^{T} &= (Ax)^{T}\\
    &= x^{T}A^{T}\\
\end{aligned}
$$

Determinar la condición de estabilidad en el sentido de Lyapunov.

Se propone:

$$
(2)\quad V(x) = x^{T} P x\quad,\quad P=P^{T}\quad, \quad P>0
$$

Derivando (2) con respecto al tiempo,

$$
\begin{aligned}
    \dot{V}(x) \vert_{(1)} &= \dot{x}^{T} P x + x^{T} P \dot{x} = x^{T}A^{T}Px + x^{T}PAx\\
    &= x^{T}(A^{T}P + PA)x\\
\end{aligned}
$$

Para que $\dot{V}(x)$ sea negativo:

$$
\begin{aligned}
    \dot{V}(x) = x^{T}\underbrace{(A^{T}P + PA)}_{-Q}x = -x^{T}Qx < 0\quad,\quad Q=Q^{T}\quad,\quad Q>0
\end{aligned}
$$

Se define:

$$
\boxed{A^{T}P + PA = -Q}\quad\text{Ecuación de Lyapunov}
$$

$$
\boxed{A^{T}P + PA + Q = 0}\quad\begin{cases}
    P = P^{T} & P>0\\
    Q = Q^{T} & Q>0\\
\end{cases}
$$

Por lo general se selecciona $Q = I$.

```matlab
P = lyap(A',Q)
```

## Ejercicios

1. Sea el sistema:

    $$
    \dot{x} = \begin{bmatrix}
        -1 & 0\\
        -3 & 2
    \end{bmatrix}x
    $$
    
    ```matlab
    A = [-1  0
         -3  2];
         
    Q = eye(size(A,1));
    
    P = lyap(A',Q)
    eig(P)
    ```
    
    ### Resultado
    
    $$
    P = \begin{bmatrix}
        2.75 & -0.75\\
       -0.75 & -0.25
    \end{bmatrix}
    $$
    
    $$
    \lambda(P) = \begin{bmatrix}
        -0.4271\\2.9271
    \end{bmatrix}
    $$
    
    $P$ no es simétrica por lo que el sistema **no es estable**.
    
    
2. Sea el sistema:

    $$
    \dot{x} = \begin{bmatrix}
        -1 & 0\\
        -3 &-2
    \end{bmatrix}x
    $$
    
    ```matlab
    A = [-1  0
         -3 -2];
         
    Q = eye(size(A,1));
    
    P = lyap(A',Q)
    eig(P)
    ```
    
    ### Resultado
    
    $$
    P = \begin{bmatrix}
        1.25 & -0.25\\
       -0.25 &  0.25
    \end{bmatrix}
    $$
    
    $$
    \lambda(P) = \begin{bmatrix}
        0.191\\1.309
    \end{bmatrix}
    $$
    
    $P$ es simétrica y positiva por lo que el sistema **es estable**.
