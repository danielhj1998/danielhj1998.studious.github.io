# Norma T (intersección generalizada)
Sean
$A$ y $B$ conjuntos difusos
$a = \mu_A(x)\quad;\quad a\in [0,1]$
$b = \mu_B(x)\quad;\quad b\in [0,1]$

## Propiedades de la norma $T$
Esta operación se llama `intersección generalizada` porque cualquier operación que se defina y que cumpla con las siguientes propiedades, es la intersección.
### Frontera

$$
T(0,0) = 0
$$

$$
T(a,1) = T(1,a) = a
$$

### Monotonicidad

$$
T(a,b) \leq T(c,d)\quad\text{si}\quad a\leq c\ \text{ y } b\leq d
$$

### Conmutatividad

$$
T(a,b) = T(b,a)
$$

### Asociatividad

$$
T(a,T(b,c)) = T(T(a,b),c)
$$

## Notación alternativa
También se le suele llamar a $T$ como `AND` de forma que:

$$
T(a,b) = a \circledast b
$$

# Co-Norma T (unión generalizada), norma S
## Propiedades de la norma $S$
Al igual que en la intersección, existe la contra parte llamada `co-norma T` y estas son sus propiedades.
### Frontera

$$
S(1,1) = 1
$$

$$
S(a,0) = S(0,a) = a
$$

### Monotonicidad

$$
S(a,b) \leq S(c,d)\quad\text{si}\quad a\leq c\ \text{ y } b\leq d
$$

### Conmutatividad

$$
S(a,b) = S(b,a)
$$

### Asociatividad

$$
S(a,S(b,c)) = S(S(a,b),c)
$$

## Notación alternativa
También se le suele llamar a $T$ como `OR` de forma que:

$$
T(a,b) = a \oplus b
$$


# Intersecciones clásicas
* Mínimo:

$$
T_1(a,b) = \text{MIN}(a,b)
$$

* Producto algebraico:

$$
T_2(a,b) = ab
$$

* Producto acotado:

$$
T_3(a,b) = \text{MAX}(0, a + b - 1)
$$

* Producto drástico:

$$
T_4(a,b) = \begin{cases}
a&\text{si}&b = 1\\
b&\text{si}&a = 1\\
0&\text{si}&a,b < 1\\
\end{cases}
$$


# Uniones clásicas
* Máximo:

$$
S_1(a,b) = \text{MAX}(a,b)
$$

* Suma algebraica:

$$
S_2(a,b) = a + b - ab
$$

* Suma acotado:

$$
S_3(a,b) = \text{MIN}(1, a + b)
$$

* Suma drástico:

$$
S_4(a,b) = \begin{cases}
a&\text{si}&b = 0\\
b&\text{si}&a = 0\\
1&\text{si}&a,b > 0\\
\end{cases}
$$
