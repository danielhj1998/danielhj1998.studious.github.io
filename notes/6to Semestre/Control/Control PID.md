# Ley de control básica
![eff08d43ee4243574dd9ec77f179e92e.png](../../img/fce683d2ae6d494ea873639db68587d1.png)

$$
\begin{aligned}
u(t)&=K\left[e(t)+\dfrac{1}{T_i}\int e(t)dt + T_d\dfrac{de(t)}{dt}\right]\\\\
u(t)&=Ke(t)+K_i\int e(t)dt + K_d\dfrac{de(t)}{dt}\\
\end{aligned}
$$

# Proporcional (P)
![2f14a508dc402f2d62fda6674c47bdc3.png](../../img/5776c2bb1c7f4f66a72f7cab695ce7c0.png)

$$u(t) = Ke(t$$
$

$$\dfrac{U(s)}{E(s)}=$$
$
## Ejemplo
![417a8bbf9eba36702afe85eb78291dfe.png](../../img/a7e86f507a87425086c1a530cc97a9cb.png)
### Estacionario
Para analizar el estado estacionario, se analiza la función de transferencia de lazo abierto:

$$G(s)=\dfrac{K}{Ts + 1}=\dfrac{K/T}{s + 1/T$$
$
Se puede concluir:
* TIPO cero
* $K_p=\lim_{s\rightarrow0}G(s) = K$
* $e_{ss}=\dfrac{1}{1+K}$

### Transitorio
Se analiza entonces la función de transferencia en lazo cerrado para estudiar el transitorio:

$$\dfrac{C(s)}{R(s)}=\dfrac{K/T}{s+\dfrac{1}{T}+\dfrac{K}{T}}=\dfrac{K/T}{s+\dfrac{K+1}{T}$$
$
Y se concluye lo siguiente:
* Primer orden
* Respuesta exponencial
* $\tau=\dfrac{T}{k+1}\quad;\quad e^{-\frac{t}{\tau}}$
* $4\tau$ al 98%
# Proporcional Integral (PI)
![c2ad491b4c1c278734d6642e76122031.png](../../img/7f84908d08f440b78c3c8474482be48f.png)

$$u(t)=Ke(t)+K_i\int e(t)d$$
$

$$\dfrac{U(s)}{E(s)}=K + \dfrac{K_i}{s} = \dfrac{Ks+K_i}{s$$
$
## Ejemplo
![b673d37d8bacc3b0acccdef6359d963e.png](../../img/c001b709c2f4432b8a6de668dc78fe01.png)
### Estacionario
Para analizar el estado estacionario, se analiza la función de transferencia de lazo abierto:

$$G(s)=\dfrac{Ks + K_i}{s(Ts + 1)$$
$
Se puede concluir:
* TIPO uno
* $K_p=\infty$
* $e_{ss}=0$
### Transitorio
Se analiza ahora el transitorio:

$$\dfrac{C(s)}{R(s)}=\dfrac{\dfrac{1}{T}(Ks+K_i)}{s^2+\dfrac{K+1}{T}s+\dfrac{K_i}{T}$$
$

Por lo que la parte integral `disminuyó el error` y `aumentó la exactitud`.

El problema que tiene este sistema es que ahora el sistema puede llegar a oscilar.
# Proporcional Derivativo (PD)
![2f504624ac4168648a8ce45b4e3f8841.png](../../img/5dfbf5fc8c8244bc9a6a02487f355424.png)

$$u(t)=Ke(t)+K_d\dfrac{de(t)}{dt$$
$

$$\dfrac{U(s)}{E(s)}=K + K_d $$
$
## Ejemplo
![1be9c744608d1417ae0cc305711d79ac.png](../../img/059d20d2541e444a9a01cc301cc59ce8.png)
Para este mismo sistema en el transitorio, si se tuviera sólo un control proporcional, una función de lazo cerrado de la siguiente forma:

$$\dfrac{C(s)}{R(s)}=\dfrac{K}{s^2+K$$
$
Lo que tendría una respuesta oscilatoria, pues no hay término disipativo.
### Estacionario

$$G(s)=\dfrac{K+K_d s}{s^2$$
$
### Transitorio
Para el estado transitorio

$$\dfrac{C(s)}{R(s)}=\dfrac{K+K_d s}{s^2+K_d s +K$$
$
Se agrega entonces el término `disipativo` al sistema, o sea `amortiguamiento`.
# Proporcional Integral Derivativo (PID)
![eff08d43ee4243574dd9ec77f179e92e.png](../../img/fce683d2ae6d494ea873639db68587d1.png)

$$
u(t)=Ke(t)+K_i\int e(t)dt + K_d\dfrac{de(t)}{dt}\\
$$

$$\dfrac{U(s)}{E(s)}=K + \dfrac{K_i}{s} + K_d s = \dfrac{K_ds^2+Ks+K_i}{s}$$


No siempre es necesario utilizar el control PID, depende de cada sistema y sus requerimientos.

# Implementación
![5ff3e20a11017875e46a408964781e41.png](../../img/c4ed541f99034aa386a78d92a5e8056f.png)

Para evitar el ruido de alta frecuencia en el derivador por lo general se ocupa un filtro pasabajas antes del bloque de derivación.

![acdb3e90076c123b1d6818fa35616832.png](../../img/234658f5c8f544a983abb25501f357ca.png)
![9b66b4ec36c6cc7e84c5a6c1ad0bce8d.png](../../img/074cd9b73b824ca1af496550eca40050.png)
Se puede ver de la siguiente manera:
![9fa6936b5a7285057f969a3c7be99f44.png](../../img/f06a3f3a74574bc09be38779a1a39b8b.png)
![ea408b93c8806d1dbe0f94203d300391.png](../../img/be360d8040ad4b339859c39751210473.png)

# Sintonización
Al proceso de determinar los valores óptimos para las constantes $K$, $K_d$ y $K_i$ se le conoce como sintonización.

Existen muchos métodos:
* Ubicación (localización de polos).
* Métodos de Ziegler-Nichols.
* Lugar de las raíces.
* Diagramas de Bode.
* A prueba y error.
* Etc.

## Ubicación de polos
### Ejemplo 1
![92d2f4fb15f1470e1bdb7c6de8825ca4.png](../../img/e9ddb5d3d2b4415aa04afe03e6f41f12.png)
Ahora evaluando el $e_{ss}$:
![81c02cda8018211a667d26d307ecedcf.png](../../img/85ecae6224c54810aed7b630cc69ea47.png)
Por lo que el Control P parece ser suficiente para este caso.
Al ver el resultado se puede ver que existe un pequeño error en el $M_p$
![8ed0475dc7011aea4e81595c37b3ef70.png](../../img/c0907f4bfe45463fb5c13d452170d78e.png)
Ese se da porque en realidad al utilizar el control proporcional, la función varía un poco de la función general:
![9670ee6afbfd6439a9d52a8bf6ba0209.png](../../img/6f11ce716764479886eee25394a3a50b.png)

### Ejemplo 2
![2aa1177ef4d4e28548adb5a5c0d28422.png](../../img/391247b6428446fb9648f84b0bb832f4.png)
Ahora se miden los resultados y luego se procedería a hacer ajustes manuales.
![62bf55e7b1c05bfb1968b224dbe12a00.png](../../img/8928cb68abfa45e5a037683616b68702.png)
Pero en este caso no es necesario.
### Ejemplo 3
Este caso es parecido al anterior, pero no se cumple el $e_{ss}$. Por lo que se coloca un PID para poder cumplir.

Pero como se aumentó el grado del polinomio, también se requirió agregar un polo para poder obtener un polinomio de grado 3 y poder comparar.
![cb62f8c3071a0f6b131116b4a34d9ae6.png](../../img/d9e78471d41240dd9ff90e89320e029e.png)
Para determinar el valor del nuevo polo, se requiere evaluar varios para ver cuál es el mejor.
![dd8d316ba5b28a99d8e09f0aad791fbb.png](../../img/af8d2518a5854501993be899f216bedc.png)

# Reglas de Ziegler - Nichols de Sintonización
Cuando se obtiene el módelo matemático de un sistema, es más sencillo y hay muchas más opciones para sintonizar los controles PID.

Sin embargo, si obtener dicho modelo es imposible o demasiado laborioso. Se deben recurrir a técnicas de sintonización para PIDs experimentales. De hecho es posible aplicar estos métodos uncluso cuando sí se conoce su modelo matemático.

Las **Reglas de Ziegler - Nichols**, nos permiten obtener los valores para $K_p$, $T_d$ y $T_i$ (como aparecen en el sistema de abajo) de forma experimental. Estas reglas son un método iterativo y normalmente no dan los valores adecuados al primer intento.

![c220a1938426ff0e0ceedef3af1ddd4d.png](../../img/b442e5f784e2465f82ecd0e6e955709c.png)

$T_i$ es el tiempo de integración, que se define de la siguiente manera:

$$
T_i = \dfrac{K_p}{K_i}
$$

$T_d$ es el tiempo de derivación y se define de la siguiente manera:

$$
T_d = \dfrac{K_d}{K_p}
$$


Existen dos métodos para calcular los valores utilzando estas reglas.

## Método 1
Consiste en llevar a cabo los siguientes pasos:
1. Obtener la respuesta del sistema al escalón unitario.
2. Si la planta no tiene integradores ni polos complejos conjugados dominantes. Probablemente tenga una respuesta curveada como una S.
![c260ee9d68dd8fadf31de95bc012f4ea.png](../../img/050234ef473141f3b9fb088da9875af1.png)
3. Caracterizar la curva con las constantes **tiempo de retardo** $L$ y la **constante de tiempo** $T$.
![7cab3fd881b956d9d25844491d16ea60.png](../../img/af0d0a0e3889425f98006cc8f2de868d.png)
4. Calcular los valores segúnlla siguiente tabla

| Tipo de controlador | Kp     | Ti     | Td   |
|---------------------|--------|--------|------|
| $P$      | $\dfrac{T}{L}$  | $\infty$ | 0    |
| $PI$ | $0.9\dfrac{T}{L}$ | $\dfrac{L}{0.3}$  | 0    |
| $PID$| $1.2\dfrac{T}{L}$ | $2L$     | $0.5L$ |

Estos valroes resultan de aproximar el valor de la función de transferencia como la de un sistema de primer órden con retraso de transporte:

$$
\dfrac{C(s)}{U(s)} = \dfrac{K e^{-Ls}}{Ts+1}
$$


## Método 2
En el segundo método, se siguien los siguientes pasos:
1. Se considera $T_i = \infty$ y $T_d = 0$:

$$
K_p (1 + \cancel{\dfrac{1}{T_i s}} + \cancel{T_d} s) = K_p
$$

2. Se encuantra una constante de proporcionalidad crítica $K_{cr}$, variando $K_p$ de 0 a $K_{cr}$ para la cual se obtinen respuestas oscilatorias por primera vez (si no se obtienen respuestas oscilatorias, no aplica este método).
3. Obtener el período crítico en la respuesta con cierta $K_{cr}$.
![b4e6f129934c6f95c61ea33b8a090abf.png](../../img/2f24af739655408687a0168226935155.png)
4. Determinar los valores de $K_p$, $T_d$ y $T_i$ según la siguiente tabla.

| Tipo de controlador | Kp     | Ti     | Td   |
|---------------------|--------|--------|------|
| $P$      | $0.5K_{cr}$  | $\infty$ | 0    |
| $PI$ | $0.45K_{cr}$ | $\dfrac{1}{1.2}P_{cr}$  | 0    |
| $PID$| $0.6K_{cr}$ | $0.5P_{cr}$     | $0.125P_{cr}$ |