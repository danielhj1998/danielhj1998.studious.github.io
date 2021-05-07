Las imagenes creadas por un algoritmo de computadora se llaman imagenes `procedurales`.

# Transformaciones básicas
## Operadores individuales
* **Identidad**: Cuando un pixel es igual a otro.

$$
q=p
$$

* **Inverso** o **Negativo**: pixel de color inverso.

$$
q=255-p
$$

* **Umbral**

$$
q=\begin{cases}
0&p < u\\
255&p \geq u\\
\end{cases}
$$

* **Umbral invertido**

$$
q=\begin{cases}
255&p < u\\
0&p \geq u\\
\end{cases}
$$

* **Intervalo de umbral binario**

$$
q=\begin{cases}
0&p\leq u_1\ \ \text{ó}\ \ p \geq u_2\\
255&u_1< p < u_2
\end{cases}
$$

* **Intervalo de umbral binario invertido**

$$
q=\begin{cases}
255&p\leq u_1\ \ \text{ó}\ \ p \geq u_2\\
0&u_1< p < u_2
\end{cases}
$$

* **Umbral de escala de grises**

$$
q=\begin{cases}
255&p\leq u_1\ \ \text{ó}\ \ p \geq u_2\\
p&u_1< p < u_2
\end{cases}
$$

* **Umbral de escala de grises invertido**

$$
q=\begin{cases}
255&p\leq u_1\ \ \text{ó}\ \ p \geq u_2\\
255 - p&u_1< p < u_2
\end{cases}
$$

* **Extensión**

$$
q=\begin{cases}
0&p\leq u_1\ \ \text{ó}\ \ p \geq u_2\\
(p-u_1)\dfrac{255}{u_2-u_1}&u_1< p < u_2
\end{cases}
$$

* **Reducción de nivel de gris**

$$
q=\begin{cases}
0&p\leq u_1\\
q_1&u_1 < p \leq u_2\\
q_2&u_2 < p \leq u_3\\
\vdots\\
q_n&u_{n-1} < p \leq 255\\
\end{cases}
$$
