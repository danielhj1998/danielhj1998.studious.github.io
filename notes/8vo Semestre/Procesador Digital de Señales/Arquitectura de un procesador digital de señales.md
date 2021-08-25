---
layout: note
---

El procesador digital de señales **DSP** es un dispositivo diseñado para procesar señales discretas y es utilizado en aplicaciones donde las frecuencias de muestreo son más altas y otros dispositivos como los microcontroladores, no pueden hacerlo.

Esto pasa porque para manipular las señales se requiere de realizar operaciones de **manipulación de datos** y **cálculos matemáticos**. Un microprocesador no está diseñado para hacer ambas tareas de forma **optimizada**, y sería muy costoso que fuera así.

Para el procesamiento digital de señales se utilizan muchas operaciones matemáticas al implementar filtros. Como ejemplo, la técnica más común es la implementación de un filtro de finita al impulso **FIR** (por sus siglas en inglés). Este se implementa usando la siguiente fórmula:

$$
y[n] = \sum^N_{i=0} b_i x[n-i]
$$

Hacer esta operación en un microcontrolador, tomaría varios ciclos de ejecución, por lo tanto los **DSP**, requiere un hardware que le permita hacer operaciones matemáticas más rápido.
