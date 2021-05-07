# Espira giratoria simple entre caras polares curvas
![bf716371d1f357f33cad292ae6634c27.png](../../img/2aaf55867f424471868234d2ce3522f6.png) ![fabfbda0ddb827b6b1aad961f7a68942.png](../../img/44450aca98d842b68aaa01b9fdf2e498.png)
El flujo magnético fluye de la siguiente manera:
![063d31a9bb73a4a760d634760007ea02.png](../../img/5de42e40ac8740e697aac41cb72b0d25.png)
![24a1313c708f73f093896526fdfd93a1.png](../../img/e26efca257764e608d049550e53df713.png)
## Tensión inducida

$$
e_{ind}=e_{dc}+e_{bc}+e_{ba}+e_{ad}
$$

### Segmentos ab y cd
![55f6affe2ce351b204eba0058d270a79.png](../../img/ace1e7c088e448f69feae1b91106bc3e.png)

$$
\begin{aligned}
e_{ba}&=(\vec{v}\times \vec{B})\cdot \vec{l}\\
&= (-vB\hat{e}_z)\cdot(-l\hat{e}_z)\\
&= vBl\\
\\
e_{dc}&=(\vec{v}\times \vec{B})\cdot \vec{l}\\
&= vB\hat{e}_z\cdot l\hat{e}_z\\
&= vBl
\end{aligned}
$$

### Segmentos bc y da

$$
\begin{aligned}
e_{bc}&=(\vec{v}\times \vec{B})\cdot \vec{l}\\
&= [\pm vB\hat{e}_z]\cdot(l\hat{e}_\phi)\\
&= 0\\
\end{aligned}
$$

Analogamente pasa lo mismo con el segmento da.
### Tensión inducida total
Por lo tanto la tensión inducida total será:

$$
\begin{aligned}
e_{ind}&=e_{dc}+e_{bc}+e_{ba}+e_{ad}\\
&=vBl+0+vBl+0\\
&=2vBl\\
&=2r\omega Bl\\
&=2r\omega \frac{\Phi}{A}l\\
&=2r\omega \frac{\Phi}{\pi rl}l\\
&=\frac{2}{\pi}\omega \Phi\\
\end{aligned}
$$

Por lo tanto:

$$
e_{ind}=\frac{2}{\pi}\omega \Phi\\
$$

Donde:
$\Phi$=Flujo que pasa a través de la espira ($\phi=0$)

La señal de salida que genera es la siguiente:
![434dbbe5473f2013587e726162633296.png](../../img/b8031a44dfa54c1692999b83980466fe.png)

## Conversión a tensión de c.d.
Como una manera de lograr eso, sólo se ocupa un `conmutador`.
![13db90094b7c977d1daab28f81983005.png](../../img/a88df0825f864561a42728845f8e6968.png)
El conmutador; que son dos segmentos conductores semicirculares, en conjunto con las escobillas; que son contactos fijos separados a un cierto ángulo tal que, en el instante en que la tensión en la espira es cero, los contactos hacen que los dos elementos queden en corto circuito.

De esta manera, cada vez que la tensión cambia de dirección, los contactos también cambian de conexión.

![89bfbb325c1ee54bdc107a5977221456.png](../../img/584d463ae87e4f5a9d690e1af3f108e5.png)

## Par inducido en la espira giratoria
Supongamos ahora que se conecta una bateria:
![ca59dd95098e8159679e9b9787f7d2a9.png](../../img/950afccbe0a347acbd223b5276456aa9.png)
![7c9418b6348bc52fad64f219fb1c1c82.png](../../img/f2be6cb5004744a481b02414fa088048.png)
Las ecuaciones que se utilizan para analizar cada segmento es la siguiente:

$$
\vec{F}=i(\vec{l}\times \vec{B})\\
\phantom{a}\\
\vec{\tau}=\vec{r}\times\vec{F}
$$

### Segmento ab

$$
\begin{aligned}
\vec{F}_{ab}&=i(l\hat{e}_z\times B\hat{e}_{\rho})\\
&=ilB\hat{e}_{\phi}
\end{aligned}
$$

Por lo tanto

$$
\begin{aligned}
\vec{\tau}&=r\hat{e}_{\rho}\times ilB\hat{e}_{\phi}\\
&=rilB\hat{e}_{z}
\end{aligned}
$$

### Segmento bc y da

$$
\begin{aligned}
\vec{F}_{bc}&=i(l\hat{e}_{\rho}\times B\hat{e}_{\rho})\\
&=0
\end{aligned}
$$

Analogamente pasa lo mismo con el segmento da
### Segmento cd

$$
\begin{aligned}
\vec{F}_{ab}&=i(-l\hat{e}_z\times B\hat{e}_{\rho})\\
&=-ilB\hat{e}_{\phi}
\end{aligned}
$$

Por lo tanto

$$
\begin{aligned}
\vec{\tau}&=(-r\hat{e}_{\rho})\times (-ilB\hat{e}_{\phi})\\
&=rilB\hat{e}_{z}
\end{aligned}
$$

### Par total inducido

$$
\begin{aligned}
\vec{\tau}_{ind}&=\vec{\tau}_{dc}+\vec{\tau}_{bc}+\vec{\tau}_{ba}+\vec{\tau}_{ad}\\
&=rilB\hat{e}_z+0+rilB\hat{e}_z+0\\
&=2rilB\hat{e}_z\\
&=2ril(\dfrac{\phi}{A})\hat{e}_z\\
&=2ril\dfrac{\phi}{\pi r l}\hat{e}_z\\
&=\dfrac{2}{\pi}\phi\ i\ \hat{e}_z\\
\end{aligned}
$$


Por lo tanto:

$$
\vec{\tau}=\dfrac{2}{\pi}\phi\ i\ \hat{e}_z\\
$$
