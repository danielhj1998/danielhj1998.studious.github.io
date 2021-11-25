---
layout: note
---

Los **tiristores** a diferencia de los *transistores*, cumplen con las siguientes características:

1. Opera con una polarización directa
2. Se activa por compuerta o por exceso de polarización
3. Deja de operar cuando la corriente disminuye

Se utilizan por lo tanto para realizar circuitos que utilizan corriente alterna por lo general.

# Motor de AC monofásico
En el circuito para controlar un motor de AC monofásico, se utiliza un tiristor junto con un driver de compuerta y un circuito de disparo.

![Modelo en simulink con tiristores y puerta de disparo](../../img/motor-ac-monofasico.svg)

En este caso el disparo es controlado por una función *sign*, por lo que cuando el ciclo es positivo, se activa el disparo, obteniendo la siguiente señal:

![Salida de control de motor ac monofásico](../../img/salida-motor-ac-monofasico.svg)

# Puente Rectificador
## Puente Rectificador con 4 tiristores
Con los tiristores se puede también rectificar una señal de corriente alterna. Para eso se puede implementar el circuito con SCRs de la siguiente forma:

| ![modelo en simulink con driver de compuerta y tiristor](../../img/sim-scr.svg) |
| :-:                                                                             |
| SCR con driver de compuerta y tiristor                                          |

| ![modelo en simulink con arreglo de scr para puente rectificador](../../img/sim-puente-rectificador.svg) |
| :-:                                                                                                      |
| Puente rectificador con SCR                                                                              |

| ![modelo en simulink con motor y puente rectificador](../../img/sim-motor-puente-rectificador.svg) |
| :-:                                                                                                |
| Motor y puente rectificador                                                                        |

Si con el puente rectificador no se dispara el semiciclo negativo, es decir, se pone la ganancia de 0, se obtienen picos de tensión a causa de que el inductor no se está descargando:

![Tensión en puente rectificador sin diodo](../../img/salida-tension-puente-rectificador-positivo-sin-diodo.svg)

Para corregir eso se utiliza un diodo:

![Modelo en simulink de puente rectificador con diodo de retorno](../../img/sim-puente-rectificador-diodo.svg)

Y se obtiene la siguiente salida:

![Tensión en puente rectificador con diodo](../../img/salida-tension-puente-rectificador-positivo-con-diodo.svg)

Ahora bien, si a la ganancia del semiciclo negativo, se le pone de -1 y se quita el diodo, se obtiene la siguiente salida:

![Tensión en puente rectificador con semiciclo negativo activo](../../img/salida-tension-puente-rectificador-semiciclo-negativo-activo.svg)

Como podemos darnos cuenta, ya no se tiene el pico de tensión debido a que ahora la corriente retorna por los otros scr. La corriente sigue siendo positiva.

Ahora bien, como se puede observar la corriente está desfasada de la tensión y por lo tanto la inductancia es grande, eso ocasiona los pequeños picos de tensión. Así que la inductancia es muy importante y hay que considerarla. Para motores pequeños por lo general no afecta mucho, pero en grandes sí tiene un efecto considerable.

## Puente Rectificador con 2 tiristores
Se puede hacer un puente rectificador más sencillo con sólo 2 tiristores y dos diodos.

![Modelo en simulink del puente rectificador con 2 tiristores y 2 diodos](../../img/sim-puente-rectificador-2-tiristores.svg)

Y la salida es la siguiente:

![Tensión en puente rectificador de 2 tiristores y 2 diodos](../../img/salida-tension-puente-rectificador-2-tiristores.svg)

Como se puede observar, los diodos cortan la tensión en negativo y por lo tanto al tener cargas inductivas grandes, se puede utilizar este circuito para eliminar las tensiones negativas.
