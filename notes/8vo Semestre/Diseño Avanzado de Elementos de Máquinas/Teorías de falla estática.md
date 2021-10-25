---
layout: note
---

Como base para la aplicación de las siguientes teorías se toman las siguientes consideraciones:

* Material
    * Homogéneo
    * Isotrópico
    * Elasticidad lineal
* Carga
    * Carga **estática**
    * Par o fuerza **estacionaria**
    * No cambia de **dirección** o **punto de aplicación** y **magnitud**
* Falla
    * Deformación permanente (plástica)
    * Fractura
    * Función comprometida
    * Disminución de confiabilidad

Dependiendo de si el material es [dúctil o frágil](./Materiales dúctiles y frágiles.html#comparación) se deben aplicar distintas teorías de falla.

La siguiente tabla, tomada del curso [Machine Design Part I](https://www.coursera.org/learn/machine-design1/lecture/Zaq4K/module-22-static-failure-theories) muestra las diferentes teorías de falla que se deben aplicar dependiendo de la situación.

| Carga    | Comportamiento | Resistencia        | Teoría              | Uso                |
| -        | -              | -                  | -                   | -                  |
| Estática | Dúctil         | $S_{yt} = S_yc$    | Cortante máximo     | Conservativa       |
|          |                | $S_{yt} = S_yc$    | Von Mises           | Menos conservativa |
|          |                | $S_{yt} \neq S_yc$ | Coulomb Mohr dúctil |                    |
|          |                |                    |                     |                    |
| Estática | Frágil         | $S_{yt} \neq S_yc$ | Coulomb Mohr frágil | Conservativa       |
|          |                |                    | Mohr modificada     | Menos conservativa |

Donde:
$S_{yt}$ es la resistencia a la tensión
$S_{yc}$ es la resistencia a la compresión

> La teoría de Von Mises es la que principalmente se usa en la industria para materiales dúctiles, es muy buena estimando los esfuerzos máximos.
