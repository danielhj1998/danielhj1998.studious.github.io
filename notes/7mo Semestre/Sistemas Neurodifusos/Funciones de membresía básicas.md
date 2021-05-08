---
layout: note
---

# Formulación y parametrización
![8a5b8ad81f43e7465769d0abd9274f4c.png](../../img/560a0bab5d104fd89206d522c95b1e10.png)
## Soporte
Es un conjunto en el dominio y un subconjunto del espacio de discurso donde los valores de A son mayores a 0.

$$
\text{Soporte de }A = \left\{x\in\mathbb{U}|: \mu_A(x) > 0\right\}
$$

## Núcleo o Kernel
Es un conjunto en el dominio, un subconjunto del espacio de discurso y un subconjunto del soporte, donde los valores de A son 1.

$$
\text{Núcleo de }A = \left\{x\in\mathbb{U}|: \mu_A(x) = 1\right\}
$$

## Puntos de crossover
Son los puntos en la función de membresía donde $\mu(x) = 0.5$
![e953b81dfd3588106c93945662f130f2.png](../../img/0cd7ececa2a6489aa97018a472eb4289.png)

$$
\text{Puntos de crossover} = \left\{x_{C1},x_{C2}\in\mathbb{U}|: \mu_A(x_{C1}) = \mu_A(x_{C2}) = 0.5\right\}
$$

## Corte $\alpha$
![06feb02153280031be20fac37287bb73.png](../../img/8d0d78662afe42b1aee1e297ab6ad636.png)

$$
A_\alpha = \left\{x\in\mathbb{U}|: \mu_A(x) \geq \alpha \right\}
$$

## Corte $\alpha$ fuerte

$$
A_\alpha = \left\{x\in\mathbb{U}|: \mu_A(x) > \alpha \right\}
$$

# Funciones de membresía unidimensionales
## Dominios continuos
### Trapezoidal
![5b0e278ebf6b4452fb440f80d1d0994f.png](../../img/421ea7fc13ae48e381eb9e178ba2f5c1.png)

$$
\mu_A(x) = \begin{cases}
0&x<a\\
\\
\dfrac{x-a}{b-a}&a\leq x<b\\
\\
1&b\leq x\leq c\\
\\
\dfrac{d-x}{d-c}&c< x\leq d\\
\\
0&x>d\\
\end{cases}
$$

$$
\mu_A(x) = \text{MF\_TRAP}(x;a,b,c,d)
$$

![53b5b8d9be4003fe63377af9f94cb2c2.png](../../img/ff78085b72114a879ccac0c0be5eee55.png)
### Gaussiana
![c57dd3f9828a862d8222362eb699f346.png](../../img/5cb26b6a3a1c4a77a2aa0f8f36acfc94.png)

$$
\mu_A(x) = e^{\frac{1}{2}(\frac{x-c}{\sigma})^2}
$$

$$
\mu_A(x) = \text{MF\_Gauss}(x;c,\sigma)
$$

### Campana generalizada
![f40569b76c056109709555e89d21693e.png](../../img/d6397f9a920248a494d2fd27bc486659.png)

$$
\mu_A(x) = \dfrac{1}{1+\left|\dfrac{x-c}{a}\right|^{2b}}
$$

$$
\mu_A(x) = \text{MF\_Bell}(x;a,b,c)
$$


## Dominios discretos
![66cfbc28a206d170fc79fed5ab9764de.png](../../img/4c6da389b01c4513aa7aab8aaad04887.png)

$$
x\in\mathbb{Z}\quad;\quad\mu_A: \mathbb{Z} \mapsto[0,1]
$$

$$
\mathbb{U} = {0,1,2,3,4,5,6}
$$

$$
\begin{aligned}
A &= \{x,\mu_A(x)|: x\in\mathbb{U}\}\\
&=\{(0,0),(1,0.3),(2,0.6),(3,1),(4,0.55),(5,0.2),(6,0.1)\}\\
&=0/0+1/0.3+2/0.6+3/1+4/0.55+5/0.2+6/0.1
\end{aligned}
$$


$+$ denota `unión`, y $/$ denota `membresía`.

### Conjuntos difusos discretos no ordenables
Algunos conjuntos no se pueden ordenar:

$$
\mathbb{U} = {0,1,2,3,4,5,6}
$$

$$
\begin{aligned}
B&=\{(CDMX,0.7),(Celaya,0.1),(Cancún,0.1)\}\\
B&=CDMX/0.7+Celaya/0.1+Cancún/0.1\\
\end{aligned}
$$
