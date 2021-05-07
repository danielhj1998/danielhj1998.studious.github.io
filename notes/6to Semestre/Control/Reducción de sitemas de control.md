Partiendo del diagrama más básico de un sistema de control:
![f3e96ce7bf49667cfd47295b5b877c59.png](../../img/4d667b0f7dcd47549e218a152f3555e9.png)
El objetivo es encontrar una función de transferencia para el sistema total. Entoces hay que llevarlo a la forma:

$$
\dfrac{Y(s)}{C(s)}=G_T(s)
$$


Se identifica el error:

$$
E(s)=C(s)-H(s)Y(s)
$$


Y la salida:

$$
Y(s)=G(s)E(s)
$$


Ahora sustituyendo y desarrollando:

$$
\begin{aligned}
Y(s)&=G(s)[C(s)-H(s)Y(s)]\\
    &=G(s)C(s)-G(s)H(s)Y(s)\\
	\\
    Y(s)+G(s)H(s)Y(s)&=G(s)C(s)\\
    Y(s)[1+G(s)H(s)]&=G(s)C(s)\\
\end{aligned}
$$


Por lo tanto:

$$
\dfrac{Y(s)}{C(s)}=\dfrac{G(s)}{1+G(s)H(s)}
$$


Eso quiere decir que ahora todo el sistema se puede representar con un simple bloque cuya función de transferencia es $G_T(s)$.

# Álgebra de bloques
## Bifurcación
![d8cebc435c99d5b00ce76513438ddf9c.png](../../img/bb7c2c91dde849ecbfa74ad13e3dbe86.png)
Pasar el bloque delande del punto de bifurcación.

## Punto de suma
![dbdbe78a4442b4eac8e907715ff3cd2b.png](../../img/25537710cb8d4dc69d9517f162a087e6.png)
Al pasar el punto de suma el resultado final es $(A-B)G$, por lo que, para que el resultado sea el mismo $(AG-B)$, es necesario agregar el bloque $\frac{1}{G}$.

Una tabla con las reglas del álgebra de bloques se muestra a continuación:

![img8.jpg](../../img/7bcce3ad28d94e6092c60cec8bd480ab.jpg)

# Reducción de un sistema de control
Es necesario llevar a cabo los siguientes pasos:
1. Identificar todos los lazor cerrados.
2. Identificar los lazos cerrados más internos.
3. Elegir un de los lazos más internos.
4. Si no está limpio, usar reglas del álgebra de bloques para limpiarlo.
5. Aplicarle la regla `13`.

Ejemplo:
![33d78273e4d6d73cb8e458e3a180d6ef.png](../../img/ac4b26a3115b4005942e25009ae7cd71.png)

$$\Downarro$$
$
![147e33f3e9bdf1234dff38a4bc06aa9c.png](../../img/ddf76884f0a34dc194b10f9148c0f8f0.png)

$$\Downarro$$
$
![cd6ad459e269b383cebbe15c8bdae3c4.png](../../img/7ee7a0f1de12412db9eaf23812366582.png)

$$\Downarro$$
$
![db2284dd5a32afd3245787278710a71d.png](../../img/80d62161e3e2482891764bdd62dd7f91.png)

$$\Downarro$$
$
![7c7a261f08a1ac6cc447ab997dd18311.png](../../img/b6edbb57922948f497965f90ba30c2ad.png)
Al hacer esta conversión se obtiene un bloque con una función de transferencia que es necesario desarrollar:

$$
\begin{aligned}
\dfrac{\dfrac{G_1G_2G_3}{1+G_3G_2H_2}}{\dfrac{H_1}{G_1}}&=\dfrac{G_1^2G_2G_3}{H_1(1+G_3G_2H_2)}
\end{aligned}
$$

$$\Downarrow$$

![c4c84d16798c2ec7679e1a086472d710.png](../../img/9f7b1336fc274e20967339c4427d8ca5.png)
Se desarrolla la expresión final:

$$
\begin{aligned}
\dfrac{\dfrac{G_1^2G_2G_3}{H_1(1+G_3G_2H_2)}}{1+\dfrac{G_1^2G_2G_3}{H_1(1+G_3G_2H_2)}}&=\dfrac{G_1^2G_2G_3}{H_1(1+G_3G_2H_2)+G_1^2G_2G_3}
\end{aligned}
$$

$$\Downarrow$$

![1b5cd26c2ef6d53efe9463ce966a173f.png](../../img/8fe078440da740ba9f9b82531c388013.png)