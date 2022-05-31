---
layout: note
title: Costo Anual Uniforme
---

# Costo Anual Uniforme Equivalente (CAUE)
El CAUE es una herramienta que nos ayuda a evaluar alternativas de inversión cuando no existen ingresos, sino sólo costos (egresos). Esto ocurre por ejemplo, cuando se tiene que renovar el equipo de cómputo, cuando la ley exige hacer modificaciones, etc...Pero dichas inversiones no significan obtener un retorno económico, simplemente son necesarias.

El CAUE se utiliza principalmente cuando las alternativas tienen vida útil diferente.

Los periodos en los que se puede aplicar no necesitan ser anuales como su nombre lo indica, pueden ser semestrales, mensuales, etc...

# Procedimiento
1. Elaborar el flujo de costos de cada alternativa.
2. Encontrar el flujo neto de costos de cada alternativa.
3. Hallar el valor presente neto de los costos de la alternativa.
4. Convertir ese valor presente en una cuota periódica vencida a partir del valor presente.
5. La mejor alternativa es la que tiene menor CAUE.

# Fórmula del CAUE

$$
CAUE = VPN_{costos}\dfrac{(1+r)^nr}{(1+r)^n-1}
$$


## Ejemplo
Una empresa industrial está estudiando sustituir la maquinaria usada con la que cuenta, por otra nueva; en tal sentido determine por medio del método CAUE si conviene sustituir la maquinaria usada.

Los datos son los siguientes:
| Año |  Maquinaria usada  |  Maquinaria nueva  | Concepto                  |
|-----|--------------------|--------------------|---------------------------|
| 0   |  $85,500.00        |  $145,000.00       | Valor de mercado y compra |
| 1   |  $45,000.00        |  $40,000.00        | Operación y mantenimiento |
| 2   |  $53,000.00        |  $41,200.00        | Operación y mantenimiento |
| 3   |  $61,000.00        |  $42,300.00        | Operación y mantenimiento |
| 4   |  $69,000.00        |  $44,600.00        | Operación y mantenimiento |
| 5   |  $77,000.00        |  $45,900.00        | Operación y mantenimiento |
| 6   |  $85,000.00        |  $46,000.00        | Operación y mantenimiento |
|||||
|     |  $12,500.00        |  $40,000.00        | Venta de equipo           |

Si la tasa de descuento es del 14% anual, qué máquina conviene más?

#### Máquina usada
Primero se calcula el $VPN_{costos}$:

$$
\newcommand{\vpn}[2]{\dfrac{#1}{(1.14)^{#2}}}

\begin{aligned}
VPN &= 85,500 + \dfrac{45,000}{1.14}+\dfrac{53,000}{(1.14)^2} + \vpn{61,000}{3} + \vpn{69,000}{4} + \vpn{77,000}{5} + \vpn{72,500}{6}\\
&=320,803.68
\end{aligned}
$$

Ahora se calcula el CAUE:

$$
\begin{aligned}
CAUE &= 320,803.68\left[\dfrac{(1+0.14)^60.14}{(1+0.14)^6-1}\right]\\
&= 82497.07
\end{aligned}
$$


#### Máquina nueva

$$
\newcommand{\vpn}[2]{\dfrac{#1}{(1.14)^{#2}}}

\begin{aligned}
VPN &= 145,000 + \dfrac{40,000}{1.14}+\dfrac{41,200}{(1.14)^2} + \vpn{42,300}{3} + \vpn{44,600}{4} + \vpn{45,900}{5} + \vpn{46,000}{6}\\
&=293,320.40
\end{aligned}
$$

Ahora se calcula el CAUE:

$$
\begin{aligned}
CAUE &= 293,320.40\left[\dfrac{(1+0.14)^60.14}{(1+0.14)^6-1}\right]\\
&= 75,429.54
\end{aligned}
$$


Por lo tanto, conviene más comprar la máquina nueva y vender la usada