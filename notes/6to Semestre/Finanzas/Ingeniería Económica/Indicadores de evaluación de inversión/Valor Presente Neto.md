Valor Presente Neto

# Daniel Hernández Jiménez - 3MM3
# Valor Presente Neto (VPN)
También llamado Valor Actual Neto (VAN), Valor Neto Descontado (VND), Beneficio Neto Anual (BNA) y en varías cálculadoras financieras como Net Present Value (NPV).


El VPN mide la **riqueza equivalente** que aporta el proyecto medido en **dinero del período inicial** (t=0), sobre la mejor alternativa de uso de capital invertido en un proyecto de igual riesgo.

El VPN es el **excedente** que queda para el inversionista después de haber **recuperado la inversión** y el **costo de oportunidad** de los recursos destinados.

**Maximizar el VPN** equivale a **maximizar la riqueza** del inversionista.

## Fórmula del VPN
Se calcula como:

$$
VPN = F_0 + \sum_{t=1}^n \dfrac{F_t}{\displaystyle\prod_{k=1}^t (1+r_k)}
$$


Si $F_t = cte. = F$ y $r_k = cte. = r$, entonces la formula queda de la siguiente manera:

$$
VPN = F_0 + \sum_{t=1}^n \dfrac{F}{(1+r)^t} = F_0 + F \dfrac{(1+r)^n-1}{(1+r)^nr}
$$


Donde 

$$\dfrac{1}{FRC}=\dfrac{(1+r)^n-1}{(1+r)^nr$$
$

$FRC$ = Factor de recuperación del capital

## Criterio de desición

$$
\begin{cases}
VPN > 0, \text{conviene hacer el proyecto}\\
VPN = 0, \text{se está indiferente}\\
VPN < 0, \text{no conviene realizarlo}\\
\end{cases}
$$


## Ejemplo
Se pide tomar la decisión de lanzar o no un nuevo producto de consumo. Con base en las ventas y los costos proyectados, se espera que los flujos de efecivo durante la vida de cinco años del proyecto sean de 2,000 dólares en los primeros dos años, 4,000 en los 2 siguientes y 5,000 en el último año. Costará 10,000 dólares empezar la producción. Se utiliza una taza de descuento de 10% para evaluar productos nuevos.

Ya que la tasa de descuento es fija, podemos utilizar la siguiente fórmula:

$$
\newcommand{\divpn}[2]{\dfrac{#1}{1.1^{#2}}}
\begin{aligned}
VPN &= F_0 + \sum_{t=1}^n \dfrac{F_t}{(1+r)^t}\\
&= -\$10,000 + \divpn{\$2,000}{}+\divpn{\$2,000}{2}+\divpn{\$4,000}{3}+\divpn{\$4,000}{4}+\divpn{\$5,000}{5}\\
&= \$ 2,313
\end{aligned}
$$


Por lo tanto el VPN es positivo y conviene hacer el proyecto.