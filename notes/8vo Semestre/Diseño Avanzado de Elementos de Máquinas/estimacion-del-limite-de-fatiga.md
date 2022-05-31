---
layout: note
title: Estimación del límite de fatiga
---

Realizar la estimación del límite de fatiga tiene el inconveniente de que los resultados encontrados en el laboratorio, suelen variar mucho en cuanto a fatiga, pues varía mucho con los parámetros que no sean considerados ya en operación. De hecho existen distintas metodologías para estimarlo, sin embargo, entre ellas existe mucha variación en los datos. Así que, se debe siempre de tener estas medidas para aminorar los errores:

* Incrementar el factor de seguridad
* Validar los resultados con pruebas en campo

# Resistencia a la fatiga de experimentación $S_e'$
La resistencia a la fatiga de un espécimen de laboratorio $S_e'$ es la obtenida al hacer la prueba de barra rotativa.
* Este se puede obtener por medio de realizar las pruebas en el laboratorio o incluso existen ya algunos manuales con información sobre ciertos metales ([MIL HNDBK 5J](http://everyspec.com/MIL-HDBK/MIL-HDBK-0001-0099/MIL_HDBK_5J_139/)).
* La segunda opción es encontrar un estimado (bastante burdo) de este valor, por medio de las siguientes fórmulas sólo para aceros:

$$
\begin{cases}
    S_e' = 0.5 S_{ut} & S_{ut} \leq 200\text{ ksi} (1400 \text{ MPa})\\
    S_e' = 100\text{ ksi} (700\text{ MPa}) & S_{ut} > 200\text{ ksi} (1400 \text{ MPa})
\end{cases}
$$

# Factores de Marin
Los factores de Marin (por Joseph Marin), permiten **ajustar** el valor de $S_e'$ a uno más acercado a el valor real en operación. Estos factores toman en cuenta distintas variaciones:

$$
\boxed{S_e = \underbrace{k_a k_b k_c k_d k_e k_f}_\text{Factores de Marin} S_e'}
$$

Donde:
$k_a$ es el factor de **superficie**
$k_b$ es el factor de **tamaño**
$k_c$ es el factor de **carga**
$k_d$ es el factor de **temperatura**
$k_e$ es el factor de **confiabilidad**
$k_e$ es el factor de **efectos varios**

## Factor de superficie $k_a$
Este factor es necesario porque el espécimen de laboratorio tiene acabado espejo por lo general. Y en la realidad las partes de máquinas no tienen ese tipo de acabado. Los esfuerzos en la superficie son por lo tanto, altos y tienen un gran impacto en el comportamiento de la fatiga.

Estos dependen de la **resistencia a la tensión** y el **acabado de la superficie**.

Para determinar $k_a$:
* Mechanical Engineering Design, Shigley's
    $k_a$ puede ser estimada burdamente por:
    
    $$
    k_a = a(s_{ut}^{b})
    $$
    
    Las cosntantes $a$ y $b$ pueden ser encontradas en el Shigleys.
    
    Entonces existen gráficas asociadas a distintos tipos de acabados superficiales.
    
* Fundamentals of Machine Design
* Johnson, R. C. (1973). SPECIFYING A SURFACE FINISH THAT WONT FAIL IN FATIGUE. Machine Design, 45(11), 108-109.
* Datos propios

## Factor de tamaño $k_b$
Para esfuerzos de **torsión** y **flexión**, donde la distribución de esfuerzos **no** es **uniforme**. Esto ocasiona que existan **esfuerzos mayores** mientras las **piezas** sean **más grandes** y por lo tanto, hay un **descenso de la resistencia** a la fatiga conforme las piezas son más grandes.

Por ejemplo, para cilindros rotatorios, se tienen los siguientes valores para el $k_b$:

$$
k_b = \begin{cases}
    0.879d^{-0.107} & 0.11 \leq d \leq 2 \text{ in}\\
    0.91d^{-0.157} & 2 \leq d \leq 10 \text{ in}\\
    1.24d^{-0.107} & 2.79 \leq d \leq 51 \text{ mm}\\
    1.51d^{-0.157} & 51 \leq d \leq 254 \text{ mm}\\
\end{cases}
$$

En el caso de los esfuerzos axiales, esto no pasa porque los esfuerzos se distribuyen uniformemente.

## Factor de carga $k_c$
Este factor está porque para las pruebas para obtener el $S_e'$, generalmente se realizan bajo esfuerzo de flexión y en la operación, no necesariamente la carga será de este tipo. Sin embargo, importante saber bajo qué carga se hicieron las pruebas para saber qué valores son válidos.

En el caso de la carga por flexión en pruebas:

$$
k_c = \begin{cases}
    1 & \text{Flexión}\\
    0.7 - 0.9 & \text{Axial}\\
    0.58 & \text{Axial}\\
\end{cases}
$$

## Factor de temperatura $k_d$
Este factor contempla el hecho de que la resistencia a la fatiga, baja conforme la temperatura incrementa.

Para obtener este factor, se puede realizar lo siguiente:
* Datos propios
* Prueba de resistencia a la tensión a temperatura de operación y sacar la relación con la resistencia a la tensión del material:
    
    $$
    k_d = \frac{S_{y@T}}{S_y}
    $$

* Si el material es un acero, se puede utilizar la siguiente ecuación para obtener un valor aproximado:
    
    $$
    k_b = 0.975 + (0.432\times10^{-3})(T) - (0.115\times10^{-5})(T^2) + (0.104\times10^{-8})(T^3) - (0.595\times10^{-12})(T^{4})
    $$
    
## Factor de confiabilidad $k_e$
Este factor toma en cuenta la confiabilidad del material que se está buscando, y reduce la resistencia a la fatiga mientras más confiabilidad se necesita.

| Confiabilidad | $k_d$ |
| :-:           | :-:   |
| 50            | 1     |
| 90            | 0.897 |
| 95            | 0.868 |
| 99            | 0.814 |
| 99.9          | 0.753 |
| 99.99         | 0.702 |
| 99.999        | 0.659 |
| 99.9999       | 0.62  |

## Factor de efectos varios $k_f$
Otras cosas a considerar son:

* Esfuerzos residuales
* Corrosión
* Enchapado

Las compañías por lo general incluyen en este factor otros efectos que puedan tener, por lo general por datos propios.

# Procedimiento
1. Obtener la resistencia a la fatiga de un espécimen de laboratorio en prueba de barra rotativa $S_e'$.
2. Encontrar los factores de Marin
3. Aplicar la ecuación de Marin
    
    $$
    S_e = k_a k_b k_c k_d k_e k_f S_e'
    $$
    
