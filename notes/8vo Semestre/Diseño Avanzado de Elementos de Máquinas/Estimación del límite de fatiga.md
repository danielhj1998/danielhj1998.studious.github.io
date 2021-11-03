---
layout: note
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

# Procedimiento
1. Obtener la resistencia a la fatiga de un espécimen de laboratorio en prueba de barra rotativa $S_e'$.
2. Encontrar los valores de Marin
