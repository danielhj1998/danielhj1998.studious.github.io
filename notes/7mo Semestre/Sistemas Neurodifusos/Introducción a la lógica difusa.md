# Conjuntos clásicos

$$
A = \{x \in \mathbb{R} | x\geq 6\} = [6, \infty)
$$

Se puede observar que:

$$
5 \in A\quad 7\cancel\in A
$$


En los conjuntos clásicos se tienen límites bien definidos. En este caso dado por el número 6.

Otra notación para expresar que 5 no pertenece a A, es la siguiente:

$$
5\cancel\in A\quad\longleftrightarrow\quad(5,0)
$$

$$
5\cancel\in A\quad\longleftrightarrow\quad(7,0)
$$


## Ecuación característica de un conjunto
![a1f0daebf7093f471f4bb84ff18d8a09.png](../../img/67ac326e5851476cb9aee0f5947d160a.png)

$$
\mu_A(x) = \{0,1\}
$$


# Lógica difusa
Supongamos que se tienen los siguientes conjuntos A, de vasos vacíos, es decir al 0% y B de vasos llenos (100%).

Para conjuntos clásicos, tendríamos lo siguiente:
![dd5342ca39b84426d2bb309bd2287f33.png](../../img/b6a39ce8ffa7490c97ed6de7fde364a8.png)![9e744191d2b590cfb349ca7bbbb147e9.png](../../img/311833bfd89d44dd9b1893c7928abdf5.png)

Pero esto es demasiado estricto y sólo dejan 1 valor en cada conjunto.

Para esto `Lofti Zadeh` crea la `lógica difusa`.

## Conjuntos difusos
Para los conjuntos anteriores se puede definir la siguiente `función de membresía` o `relación difusa`.
![5746fa23ea32cd4578cef8f3262565dc.png](../../img/4d62c89cac0b499cb8751b211c653132.png) ![7dead08747a818a85daf127b627f0424.png](../../img/92bc35dbfee84a5c801c22720a99a92c.png)
Ahora bien, suponiendo que se tienen los siguientes vasos:
![da46730ed96da5f69cc95d5752a69d5a.png](../../img/fb48bfd773484210b2625107b12e1d6d.png)

En este caso podemos observar:

$$
\begin{aligned}
\mu_A(x)&=0.1\\
\mu_A(x)&=0.9\\
\mu_A(z)&=0.5\\
\end{aligned}\qquad
\begin{aligned}
\mu_B(x)&=0.9\\
\mu_B(x)&=0.1\\
\mu_B(z)&=0.5\\
\end{aligned}
$$


Esto es una forma mucho más acercada a como pensamos los humanos pues el concepto de estar lleno, es relativo y puede ser que 0.9 este lleno dependiendo del contexto.

Así mismo las funciones de membresía pueden ser diferentes, por ejemplo una función sigmoide:
![54720e5c3cf723ccfb5e8a279ec8e80c.png](../../img/0e69bca2e34c41b7a1d768eb8b4c636c.png) ![025fb80a1c264691c1cf6c97c828eb97.png](../../img/14a2b7856e264dd091fe143630a1923f.png)

El cambio en estas funciones es dado por la `subjetividad`.

### Definición
Un conjunto difuso se define de la siguiente forma:

$$
A = \{(x,\mu(x))|: x \in \mathbb{U}\}
$$

Donde:
$\mu(x)$ = Función de membresía

$$
\mu_A: \mathbb{U} \mapsto[0,1]
$$

$\mathbb{U}$ = Conjunto `universo` o `espacio de discurso` 

![7a6ecf140c7d35ce7b9cac40c2781b96.png](../../img/0d62121767d44609ad6162810371e216.png)

# Variable linguistíca
Es una palabra que puede ser sustituida por otra palabra dentro de un conjunto difuso.

#### Ejemplo

$$
\text{Estatura} = \{\text{Baja},\text{Media},\text{Alta}\}
$$


La estatura puede ser baja, media o alta.