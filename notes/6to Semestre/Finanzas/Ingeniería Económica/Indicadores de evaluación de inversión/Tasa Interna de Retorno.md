---
layout: note
---

# TIR
La **Tasa Interna de Retorno** o **Tasa Interna de Rentabilidad** **TIR** se define como la tasa de descuento para la cual el **VPN** es **0**. Para calcularla se hacen las siguientes asumpciones.

* La tasa de descuento es constante $r=cte.$
* El flujo de caja inicial es negativo.
* Todos los demás flujos de caja son positivos.

$$
VPN = - |F_0| + \sum_{t=1}^n \dfrac{F}{(1+TIR)^t} = 0
$$


## Fórmula

$$
TIR = \dfrac{- |F_0| + \sum_{t=1}^n{F_t}}{\sum_{t=1}^n{t\ F_t}}
$$


## Criterio de desición
El TIR es la tasa de descuento máxima para la cual un proyecto no tiene pérdidas, esto quiere decir que las tasas de descuento mayores a la TIR no serán rentables, pues generarían un VPN negativo.

$$
\begin{cases}
TIR > 0 & \text{No conviene}\\
TIR = 0 & \text{Es indiferente}\\
TIR < 0 & \text{El proyecto es rentable}\\
\end{cases}
$$


## Ejemplo
Se pide evaluar entre tres proyectos que tienen una tasa de descuento del 15%

**Proyecto A**: Tiene  una  inversión  inicial  de 200.000  que  se  debe  renovar  al  tercer  mes  y  se  espera  un retorno mensual de 135.000

**Proyecto B**: Considera una inversión inicial de 200.000 y se espera un retorno mensual de 90.000

**Proyecto C**: Tiene una inversión inicial de 200.000 que se debe renovar alsegundo mes y cuarto mes por 220.000 y se espera un retorno mensual de 175.000

### Proyecto A

$$
VPN = 0 = -200,000 + \dfrac{135,000}{(1+TIR)} + \dfrac{135,000}{(1+TIR)^2} + \dfrac{135,000 - 200,000}{(1+TIR)^3} + \dfrac{135,000}{(1+TIR)}^4 + \dfrac{135,000}{(1+TIR)}^5 + \dfrac{135,000}{(1+TIR)}^6
$$

$TIR = 45.66\%$

### Proyecto B

$$
VPN = 0 = -200,000 + \dfrac{90,000}{(1+TIR)} + \dfrac{90,000}{(1+TIR)^2} + \dfrac{90,000}{(1+TIR)^3} + \dfrac{90,000}{(1+TIR)}^4 + \dfrac{90,000}{(1+TIR)}^5 + \dfrac{90,000}{(1+TIR)}^6
$$

$TIR = 38.67\%$

### Proyecto C

$$
VPN = 0 = -200,000 + \dfrac{175,000}{(1+TIR)} + \dfrac{175,000 - 220,000}{(1+TIR)^2} + \dfrac{175,000}{(1+TIR)^3} + \dfrac{175,000 - 220,000}{(1+TIR)}^4 + \dfrac{175,000}{(1+TIR)}^5 + \dfrac{175,000}{(1+TIR)}^6
$$

$TIR = 42.76\%$

Por lo tanto el proyecto A es el más rentable, pues tiene el $TIR$ mayor, que es menor al 15%.