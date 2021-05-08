---
layout: note
---

# Definición
Es un manipulador multifuncional reprogramable diseñado para mover materiales, herramientas o dispositivos especializados a través de movimientos programados para el desempeño de una variedad de tareas

#### Palabras clave:
* Reprogramabilidad (diferencia con un mecanismo).
* Ventajas: Costos de tareas menores, mayor presición y productividad, flexibilidad comparada con máquinas especializadas.

## Robots manupuladores:
Los robots manipuladores se componen de `eslabones` conectadas por `juntas` para formar una `cadena cinemática`.

Las juntas se clasifican como `revolutas` (R) (rotativas) o `prismáticas` (P) (lineales).
![98faf15af70a15b1237b5d7d1e97e12e.png](../../img/5a7b0c8430f549f1bd491ba5a96f47e7.png)

Cada junta representa la conexión entre dos eslabones.

Como convención, se denotará como $z_i$ al eje de rotación (eje de traslación) entre los eslabones $i$, $i+1$

Se denotará la varible de junta como $\theta$ para una revoulta y $d$ para una prismática.

## Espacio de configuración
* Una `configuración` es la especificación completa de cada punto en el manipulador.
* El `espacio de configuración` es el conjunto de todas las configuraciones posibles.
* ![2adf6da85a81729f180b0916714c1120.png](../../img/e25df0633464452ea68dc43ed30d878a.png)

### Espacio de estado
Provee la determinación dinámica ($q$,$\dot{q}$)
![6178382a40322cc089f1107b74a61968.png](../../img/b5b60be72d004fe3bd81ef7a83f738c7.png)

## Clasificación de manipuladores robóticos
![9e0910fa08a3ba6e4e40c2a5e668ce75.png](../../img/a2bcd10d12184dc98ea05934f55195e9.png)

## Componentes típicos de un sistema robótico
![37244018cc6d9f91da28ce078cd6dc85.png](../../img/3ff1a9e2c0624ea6ae95f24f39431837.png)

## Repetibilidad y exactitud
![08c2acdaea50014bc299509549ce60d5.png](../../img/3a569f83b1474296aea4106b7a6bc321.png)

## Problemas asociados a la robótica
![b0c71dab270d47d584c72776aed31901.png](../../img/4526eef0e3d04247a3c6578904cc5e13.png)
![f8bb9ea2c16c3dc23f3f0894a5e72675.png](../../img/e51ab1b7f848447981f172b76919a6b9.png)