---
layout: note
title: Discretización de sistemas discretos
---

Para utilizar técnicas de procesamiento digital de señales primero es necesario **discretizar** los sistemas, pues los modelos que obtenemos son continuos. Para este fin existen dos acercamientos.

El primero sería [discretizar el modelo en tiempo continuo](../../7mo Semestre/Control de Sistemas Mecatrónicos/Discretización de ecuaciones en espacio de estado.html) y luego por medio de la [transformada $\mathcal{Z}$](https://es.wikipedia.org/wiki/Transformada_Z), pasar al dominio de la frecuencia y obtener la función de transferencia.

$$
\large\boxed{h(t)}\overset{\text{discretizar}}{\longrightarrow}\boxed{h(n)}\overset{\normalsize\mathcal{Z}}{\longrightarrow}\boxed{H(z)}
$$

La otra alternativa es obtener la función de transferencia del modelo en tiempo continuo con la transformada de Laplace y luego por medio de una [aproximación](http://www-verimag.imag.fr/~tdang/DocumentsCours/2013Discretization.pdf#page=5), obtener su **sistema digital** (discreto) **equivalente aproximado**.

$$
\large\boxed{h(t)}\overset{\normalsize \mathcal{L}}{\longrightarrow}\boxed{H(s)}\overset{\approx}{\longrightarrow}\boxed{H(z)}
$$

La equivalencia exacta entre el plano $s$ y el plano $z$ es:

$$
s = \frac{\ln(z)}{T}
$$

Donde $T$ es el tiempo de muestreo.

Implementar la equivalencia exacta para pasar de la función de transferencia continua a la función de transferencia discreta, sería demasiado tortuoso. Por eso se usan las aproximaciones siguientes.

* [Transformación bilineal o de Tustin](https://ghsalazar.github.io/2021/03/07/transformaci%C3%B3n-bilineal.html)

    $$
    s \approx \dfrac{2(z-1)}{T(z-1)}
    $$

* Aproximación hacia adelante de Euler

    $$
    s \approx \dfrac{(z-1)}{T}
    $$
    
* Aproximación hacia atrás de Euler

    $$
    s \approx \dfrac{(z-1)}{Tz}
    $$
    
Sin embargo, la transformación que se usará en el curso es la **bilineal**, pues la **aproximación hacia adelante de Euler** puede hacer que **sistemas estables** de tiempo **continuo**, pasen a ser **inestables** en tiempo **discreto**. Para la **aproximación hacia atrás**, esto no ocurre así, sin embargo puede llegar a **deformar significativamente** la función de transferencia. La de Tustin, hace el trabajo muy bien.

## Procedimiento

1. Obtener la función de transferencia del sistema.
2. Calcular $T$ a partir de $f_s > 2B$
3. Sustituir:
    
    $$
    s = \dfrac{2(z-1)}{T(z-1)}
    $$
    
4. Desarrollar

En matlab se puede utilizar el comando `c2d(H,T,'Tustin')` para obtener $H(z)$, donde `H`, es la función de transferencia en tiempo continuo $H(s)$ y $T$ el tiempo de muestreo.
