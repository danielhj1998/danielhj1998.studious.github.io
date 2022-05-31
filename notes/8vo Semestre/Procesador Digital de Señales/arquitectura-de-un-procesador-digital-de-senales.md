---
layout: note
title: Arquitectura de un procesador digital de señales
---

El procesador digital de señales **DSP** es un dispositivo diseñado para procesar señales discretas y es utilizado en aplicaciones donde las frecuencias de muestreo son más altas y otros dispositivos como los microcontroladores, no pueden hacerlo.

Esto pasa porque para manipular las señales se requiere de realizar operaciones de **manipulación de datos** y **cálculos matemáticos**. Un microprocesador no está diseñado para hacer ambas tareas de forma **optimizada**, y sería muy costoso que fuera así.

### Filtros

Para el procesamiento digital de señales se utilizan muchas operaciones matemáticas al implementar filtros. Como ejemplo, la técnica más común es la implementación de un filtro de finita al impulso **FIR** (por sus siglas en inglés). Este se implementa usando la siguiente fórmula:

$$
y[n] = \sum^N_{i=0} b_i x[n-i]
$$

### Ciclos con cero sobre costos

Hacer esta operación en un microcontrolador, tomaría $N$ ciclos de ejecución con más de 1 instrucción para hacer la operación de multiplicación y suma. Esto en un **DSP**, se optimiza por medio de la implementación de *ciclos con cero sobre costos*, que realizan un cierto número de ciclos en paralelo y por lo tanto en 1 sólo ciclo de máquina. La implementación de estos se hace mediante hardware especializado.

### Unidad multiplicadora acumuladora

Además, como las aplicaciones de un **DSP** requieren realizar muchas operaciones del tipo $y \leftarrow y + b*x$, por lo que también cuentan con una *unidad multiplicadora-acumuladora* que realiza esta operación en 1 ciclo de máquina.

### Punto fijo vs. punto flotante
Al trabajar con números reales, en las computadoras se utiliza la notación científica por lo general para poder trabajar con números más grandes o pequeños.

$$
y = m\times\beta^{-n}
$$

Existen dos formas de hacer esto y es por medio de **números de punto fijo**, que tienen $n$ constante y **números de punto flotante**, para los cuales $n$ es variable.

En general los de punto fijo conllevan a más error (que depende de el tamaño de palabra utilizado para representar los números), pero son más rápidos. Los **DSP** implementan punto fijo comúnmente pero también hay con capacidad de usar punto flotante.

### Arquitectura

Las primera arquitectura de computadora era la *Von Neumann*, que tenía una memoria donde se encontraban las instrucciones y los datos. El problema con esto es que se utilizan varios ciclos de máquina para realizar operaciones, pues primero hay que buscar la instrucción, luego traer los datos y operarlos.

En la arquitectura *Harvard* esto se optimiza utilizando una memoria para las instrucciones y otra para los datos, cada una con sus respectivos buses. Esto hace que se pueda buscar los datos y las instrucciones en un sólo ciclo de máquina.
