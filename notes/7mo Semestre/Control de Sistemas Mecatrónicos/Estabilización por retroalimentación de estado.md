Estabilización por retroalimentación de estado

Sea el sistema `MIMO`:

$$
(1) \begin{cases}
\dot{x} &= Ax + Bu\\
y &= Cx
\end{cases}\quad,\quad \begin{matrix}
A:n\times n \\
B:n\times m \\
\end{matrix}\quad m:\text{número de entradas}
$$


* Si el par ($A$,$B$) es controlable, entonces el sistema (1) siempre se puede estabilizar por retroalimentación de estado.

$$
\text{rank}(C_k) = n
$$

* Si el par ($A$,$B$) NO es controlable, es decir

$$
\text{rank}(C_k) < n
$$

entonces se deben determinar las condiciones para estabilizar el sistema.

**Nota** El rango de una matriz es el número de vectores columna $l.i.$ de la matriz.


# Teorema 1
Sea el sistema (1) tal que

$$
\text{rank}(C_k) < n
$$

Sean $q_1$, $q_2$,$\ldots$,$q_r$ los primeros vectores columna linealmente independientes de la matriz de controlabilidad $C_k$

y $q_{r+1}$, $q_{r+2}$,$\ldots$,$q_n$ sean vectores columna `arbitrarios` linealmente independientes tal que la matriz

$$
Q = \begin{bmatrix}q_1\ q_2\ \ldots\ q_r\ q_{r+1}\ q_{r+2}\ \ldots\ q_n\end{bmatrix}\\
\hphantom{Q = }\begin{matrix}\underbrace{\hphantom{q_1\ q_2\ \ldots\ q_r}}_\text{de $C_k$}\ \underbrace{\hphantom{q_{r+1}\ q_{r+2}\ \ldots\ q_n}}_\text{arbitrarios}\end{matrix}
$$

es invertible, es decir $\det(Q)\neq 0$.

Entonces la transformación de estado

$$
x = Qz
$$

lleva al sistema en la forma `controlable`/`no controlable`

$$
\begin{aligned}
\dot{x} &= Ax + Bu\\
Q\dot{z} &= AQz + Bu\\
\dot{z} &= Q^{-1}AQz + Q^{-1}Bu\\
(2)\ \dot{z} &= \begin{bmatrix}
A_{11} & A_{12}\\
0 & A_{22}\\
\end{bmatrix}z + \begin{bmatrix}B_1\\0\end{bmatrix}u\quad,\quad \begin{aligned}
B_1&:r\times m\\
0&:(n-r)\times m\\
\end{aligned}\\
\end{aligned}\\
$$

$$
A_{11}:r\times r\quad,\quad A_{12}:r\times (n-r) \quad,\quad O:(n-r)\times r\quad,\quad A_{22}:(n-r)\times (n-r)
$$


**********************
El sistema (1) y el sistema (2) son similares.

$$
\lambda(A) = \lambda(A_{11})\cup \lambda(A_{22})
$$


El par ($A_{11}$, $B_1$) es controlable, es decir,

$$
\text{rango}(C_{A_11,B_1}) = r
$$


Se define la retroalimentación de estado,

$$
\begin{aligned}
u  &= -\bar{k}z = -[\bar{k}_1\ \bar{k}_2]\begin{bmatrix}z_1\\z_2\end{bmatrix}\quad(3)\\
& = -\bar{k}Q^{-1}x\\
& = -kx\\
\end{aligned}
$$

$$
\boxed{k = \bar{k}Q^{-1}}
$$


Sustituyendo (3) en (2):

$$
\begin{aligned}
(4)\quad \dot{z} &= \begin{bmatrix}
A_{11} & A_{12}\\
0 & A_{22}\\
\end{bmatrix}z - \begin{bmatrix}B_1\\0\end{bmatrix}[\bar{k}_1\ \bar{k}_2]z\\
&= \begin{bmatrix}
A_{11} & A_{12}\\
0 & A_{22}\\
\end{bmatrix}z - \begin{bmatrix}
B_1\bar{k}_1&B_2\bar{k}_2\\
0&0
\end{bmatrix}z\\
&=\begin{bmatrix}
A_{11} - B_1\bar{k}_1 & A_{12} - B_1\bar{k}_2 \\
0 & A_{22}
\end{bmatrix}z\\
&\phantom{=}\text{Sistema en lazo cerrado}\\
\end{aligned}
$$


El problema de estabilización por retroalimentación de estado cuando el sistema no es controlable, se resuelve como un problema de ubicación de polos para el par ($A_{11}$,$B_1$) $\Rightarrow$ $\bar{k}_1$

$$
\bar{k} = [\bar{k}_1\ 0]\\
$$

$$
k = \bar{k}Q^{-1}
$$

La condición necesaria para la estabilización es que la matriz $A_{22}$ sea estable.

*******************

## Ejemplo
Sea el sistema. Calcular $k$ para ubicar los polos en lazo cerrado en -3.

$$
\begin{bmatrix}
0 & -1 & 0 & 0 & -4\\
0 & 0 & 1 & 0 & 1\\
0 & 1 & 0 & 0 & 2\\
-2 & 1 & 0 & -2 & 4\\
0 & 0 & 0 & 0 & -2\\
\end{bmatrix}x + \begin{bmatrix}0\\1\\0\\0\\0\end{bmatrix}u
$$

### 1. Verificar si es estable
```matlab
eig(A)
```

$$
\begin{matrix}
-2 & 0 & 1 & -1 & -2
\end{matrix}
$$

Por lo que **NO es estable**

### 2. Verificar si es controlable
```matlab
r = rank(ctrb(A,B))
```

$$
\begin{matrix}
r = 2
\end{matrix}
$$

Por lo que el sistema **No es controlable**, pero tiene `2 variables` que `sí` son `controlables`.

### 3. Obtener $Q$
```matlab
Q =  
	 0    -1     1     0     0
     1     0     0     0     0
     0     1     0     1     0
     0     1     0     0     0
     0     0     0     0     1
```

### 4. Verificar si $A_{22}$ es estable
```matlab
A22 = Q(3:end,3:end)
eig(A22)
```
Si no lo es entonces no se puede estabilizar por retroalimentación de estado y por lo tanto se acaba aquí el ejercicio.

Pero como sí es estable, continuamos.

### 5. Calcular $\bar{k}_1$ a partir de $A_{11}$ y $B_1$
```matlab
A11 = QinvAQ(1:r,1:r);
B1 = QinvB(1:r);

I = eye(size(A11,1));

syms s k;
plc = collect((s+3)^2)

PLCA11 = A11^2 + 6*A11 + 9*I;
CA11B1k = ctrb(A11,B1);

vk = zeros(1,r); vk(end) = 1;
kb1 = vk * CA11B1k^-1 * PLCA11
```

$$
\bar{k}_1 = [6\ 10]
$$

### 6. Obtener $\bar{k}_1 = [\bar{k}_1\ 0]$
```matlab
kb = [kb1 zeros(1,n-r)]
```

$$
\bar{k} = [6\ 10\ 0\ 0\ 0]\\
\hphantom{\bar{k} =} \underbrace{\hphantom{6\ 10}}_{\bar{k}_1}\ \underbrace{\hphantom{0\ 0\ 0}}_{\bar{k}_2}
$$


### 6. Calcular $k = \bar{k}Q^{-1}$
```matlab
k = kb*Q^-1

eig(A - B*k)
```

$$
k = [0\ 6\ 0\ 10\ 0]\\
$$

$$
\lambda(A - Bk) = \begin{bmatrix}
-3 \\ -3 \\ -2 \\ 0 \\ -2
\end{bmatrix}
$$
