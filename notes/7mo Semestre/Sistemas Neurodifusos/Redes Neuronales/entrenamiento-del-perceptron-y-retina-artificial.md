---
layout: note
title: Entrenamiento del perceptron y retina artificial
---

Para realizar un algoritmo para entrenar el perceptron, es conveniente expresar las ecuaciones de forma vectorial:

$$
a = \omega_0 + \Sigma\omega_i x_i = \omega_0 + \vec{X}\cdot\vec{\large\omega}
$$

$$
y = \text{sign}(\omega_0 + \vec{X}\cdot\vec{\large\omega})
$$

La regla de aprendizaje vectorial es:
$$
{\large\vec{\omega}^{new}} = {\large\vec{\omega}^{old}} + \alpha(d_j- y)\vec{X}_j
$$

Por ejemplo, los valores de la expresión son los siguientes para seguir el comportamiento de la `AND` y `OR`.

|             | $x_1$ , $x_2$ | $d_j^{OR}$ | $d_j^{AND}$ | j   |
| -           | ------------- | -------    | -------     | --- |
| $\vec{X}_1$ | $(-1,-1)$     | -1         | -1          | 1   |
| $\vec{X}_2$ | $(-1,+1)$     | +1         | -1          | 2   |
| $\vec{X}_3$ | $(+1,-1)$     | +1         | -1          | 3   |
| $\vec{X}_4$ | $(+1,+1)$     | +1         | +1          | 4   |

Sin embargo para cuando se necesitan más entradas, o muchos pares de entrenamiento, es más conveniente hacerlo por computadora. A continuación se muestra un algoritmo para el entrenamiento de una neurona perceptron en *Matlab*.

```matlab
function y = perceptron(w0,W,X)
    y = sign(w0 + sum(W.*X));
end
```

```matlab
clear all;

epoca = 1;
epoca_MAX = 1000;
cnt_Err = -1;

X = [-1 -1
     -1  1
      1 -1
      1  1];

d = [-1 1 1 1];

w0 = 0;
W = [0 0];

alpha = 1;
while epoca <= epoca_MAX & cnt_Err ~= 0
    cnt_Err = 0;
    for j = 1:length(d)
        y = perceptron(w0,W,X(j,:));
        error = d(j) - y;
        if error ~= 0
            cnt_Err = cnt_Err + 1;
            w0 = w0 + alpha * error;
            W = W + alpha * error * X(j,:);
        end
    end
    epoca = epoca + 1;
end

w0,W
```

Al ejecutar este código da como resultado:

$$
\vec{\large\omega} = \begin{bmatrix}
    3\\3
\end{bmatrix}
$$

$$
\omega_0 = 1
$$

Así

$$
\begin{aligned}
    x_2 &= -\frac{\omega_1}{\omega_2}x_1 - \frac{\omega_0}{\omega_2}\\
    &= -\frac{3}{3}x_1 - \frac{1}{3}\\
    &= -x_1 - \frac{1}{3}\\
\end{aligned}
$$

Que es una frontera de desición válida para la `OR`.

Basta con sólo modificar el vector de valores deseados `d` para que el entrenamiento se ejecute para otro comportamiento, por ejemplo para `AND` sería `d = [-1 -1 -1 1]`.

## La retina artificial
El problema de la retina artificial, se trata de clasificar imagenes, las redes neuronales resultan ser buenas clasificando imagenes.

Entonces el problema es que dada una imagen, la neurona decida si la imagen es de un cierto tipo o no. Sólo que en este caso, las entradas no son un vector unidimensional, sino un arreglo bidimensional. Así pues, los pesos se pueden manejar de la misma forma como un arreglo del mismo tamaño, pero omitiendo el peso $\omega_0$, que se calcula por separado, pues las entradas y la matriz de pesos no tendrían el mismo tamaño.

Entonces la operación sería la misma, pero sumando todos los valores en la matriz:

$$
a = \omega_0 + \Sigma (X\cdot\large\omega)
$$

Para el algoritmo anterior, sólo hay que modificar `X` con la matriz que representa la imagen, `W` inicial sería una matriz del mismo tamaño que `X` y lafunción de activación `y = sign(w0 + sum(sum(W.*X)))`.
