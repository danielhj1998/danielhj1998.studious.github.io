En conjuntos difusos, para que un elemento pertenezca a un conjunto difuso, basta con que su `membresía` sea `mayor que 0`.
![9f97a1895533db19f3c2783545914938.png](../../img/54ac868bbf0348ce8d056d23b301f675.png)
![d2d618fe3d08ad9ef6f5903085a46d2b.png](../../img/b9b462745e624b9e84dc48a4ca62549b.png)

$$
\begin{aligned}
A=\left\{x,\mu_A(x)|:\mu_A(x)>0\right\}\\
B=\left\{x,\mu_B(x)|:\mu_B(x)>0\right\}\\
\end{aligned}
$$

En este caso:

$$
B\subset A
$$

$$
\begin{aligned}
&\forall x |:\mu_B(x)>0 \rightarrow \mu_A(x) > 0\\
&\exists x, mu_A(x)>0 |:\mu_B(x)=0\\
\end{aligned}
$$

En este caso, esto es cierto, pero si se tiene el siguiente ejemplo:
![b99c32edb8a0e97113ccc6a6054240a2.png](../../img/ada0f8bd756c4e57af9598ecf54bde4e.png)	
En esto caso el enunciado anterior, es falso. Puesto que existen elementos en B que tienen mayor membresía en B que en A.

## Subconjunto
Por lo que en general la expresión de subconjunto es la siguiente:

$$
B\subset A
$$

$$
\forall x \in \mathbb{U} |: \mu_B(x)>0 \rightarrow\mu_A(x)\geq\mu_B(x)
$$


# Unión difusa
![5aa21f800f1750bffaeae3baad5c424c.png](../../img/262a10baea794bef8c2170cd12c9a8b4.png)
![986ba76597e10d91d6e624026ef75520.png](../../img/6d47f97738164666b0d2dfa62be7f723.png)
![eb7d59f5d2d7c4b790bfbc7f6babf3cb.png](../../img/063996d98aa6414f9cb48f8aed7a8328.png)

$$
A \cup B = \left\{x\in\mathbb{U}:x\in A\quad\text{ó}\quad x\in B\right\}
$$

$$
\begin{cases}
\mu_{A\cup B}(x) \geq \mu_A(x)\\
\mu_{A\cup B}(x) \geq \mu_B(x)\\
\end{cases}\quad;\quad \forall x \in \mathbb{U}
$$

Por lo tanto:

$$
\mu_{A\cup B} = \text{MAX}[\mu_A(x),\mu_B(x)]
$$

$$
A\cup B = \left\{x,\mu_{A\cup B}(x)|:\mu_{A\cup B} = \text{MAX}[\mu_A(x),\mu_B(x)]\right\}
$$

# Intersección difusa
![92d2f47b0f3c9cd1b7e0b69b470ca1ce.png](../../img/d1f0e01ad295406c953d998d36e1bdb9.png)
![2d00d26ce9c5bd893032bcdfbb4c19b1.png](../../img/65a40351f3d84cca83831035672dc776.png)

$$
A \cap B = \left\{x\in\mathbb{U}:x\in A\quad\text{y}\quad x\in B\right\}
$$

Por lo tanto:

$$
\mu_{A\cap B} = \text{MIN}[\mu_A(x),\mu_B(x)]
$$

$$
A\cap B = \left\{x,\mu_{A\cup B}(x)|:\mu_{A\cup B} = \text{MIN}[\mu_A(x),\mu_B(x)]\right\}
$$

# Complemento difuso
![40e045ecb2026992844bd1f512ab808a.png](../../img/8121d251a47941d4990667b6e493ff1f.png)
![d5369e062134a5a24af1eb91e25a2971.png](../../img/5deba41e8047452ab134facfa17a1491.png)

$$
\begin{aligned}
\bar{A} &= \left\{x\in\mathbb{U}|: x\notin A\right\}\\
&= \left\{x,\mu_{\bar{A}}(x)|: \mu_{\bar{A}}(x) = 1 - \mu_A(x)\right\}\\
\end{aligned}
$$


# Convención de notación

$$
\begin{cases}
A\cup B = \text{OR}(A,B) = \text{MAX}(A,B) &\rightarrow \text{MAX}(\mu_A(x),\mu_B(x))\\
\\
A\cap B = \text{AND}(A,B) = \text{MIN}(A,B) &\rightarrow \text{MIN}(\mu_A(x),\mu_B(x))\\
\\
\bar{A} = \text{NOT}(A) = 1-A &\rightarrow 1-\mu_A(x)
\end{cases}
$$
