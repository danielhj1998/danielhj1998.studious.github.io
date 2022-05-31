---
layout: note
title: Control de velocidad para motor a pasos
---

El motor a pasos bipolar cuenta con 2 devanados, este es un motor de corriente alterna. Finalmente, todos los motores son de corriente alterna en su principio de funcionamiento. La diferencia con los motores de corriente continua, es que en los de corriente continua, el alternador está implementado de forma mecánica.

# Modelo del subsistema eléctrico
Los devanados del motor, se pueden modelar por medio de la siguiente ecuación:

$$
\tag{1}
\begin{aligned}
v_a &= L_a \frac{di_a}{dt} + R_a i_a + e_a\\
\\
v_b &= L_b \frac{di_b}{dt} + R_b i_b + e_b
\end{aligned}
$$

Donde:
$i_a, i_b$ son la corriente a través del respectivo devanado
$e_a, e_b$ son la caída de tensión en el respectivo devanado (modelado como un alternador)
$L_a, L_b$ son la inductancia del respectivo devanado

# Modelo del subsistema mecánico
Se modela aplicando la segunda ley de Euler para el movimiento:

$$
\tag{2}
J\frac{d\omega}{dt} = {\Large\tau}_D - B\omega - {\Large\tau}_L
$$

Donde:
$\omega$ es la velocidad angular del rotor
${\Large\tau}_D$ es el par motor desarrollado sobre el rotor
${\Large\tau}_L$ es el par de la carga
$J$ es la inercia del rotor
$B$ es la fricción viscosa rotacional.

# Interacciones eléctrico-mecánicas

$$
\tag{3}
e_a = -K_m\omega\sin(P\theta)
$$

$$
\tag{4}
\frac{d\theta}{dt} = \omega
$$


Donde:
$\theta$ es el ángulo recorrido por el rotor
$Km$ es la constante del motor
$P$ es el número de pares de dientes que tiene el rotor

Para el devanado B, la expresión es la siguiente:
$$
\tag{5}
e_b = -K_m\omega\cos(P\theta)
$$

$$
\tag{6}
{\Large\tau}_D = - K_m i_a \sin(P\theta) + K_m i_b \cos(P\theta)
$$

De $(1)$ y $(3)$

$$
\tag{7}
L_a\frac{di_a}{dt} + R_a i_a = v_a + K_m\omega\sin(P\theta)
$$

De $(1)$ y $(5)$

$$
\tag{8}
L_b\frac{di_b}{dt} + R_b i_b = v_b + K_m\omega\cos(P\theta)
$$

De $(2)$ y $(6)$

$$
\tag{9}
J\frac{d\omega}{dt} + B\omega = - K_m i_a \sin(P\theta) + K_m i_b \cos(P\theta) - {\Large\tau}_L
$$

# Control de velocidad en lazo abierto
El objetivo es construir un par de tensiones de entrada $v_a$ y $v_b$ que permitan tener una velocidad constante en la salida.

Considerando:

$$
\tag{10}
i_a = - I_p\sin(P\theta)
$$

$$
\tag{11}
i_b = I_p\cos(P\theta)
$$

Donde $I_p$ es una corriente constante. $(10)$ se convierte en:

$$
\tag{12}
\begin{aligned}
J\frac{d\omega}{dt} + B\omega &= K_m I_p \sin^2(P\theta) + K_m I_p \cos^2(P\theta) - {\Large\tau}_L\\
J\frac{d\omega}{dt} + B\omega &= K_m I_p - {\Large\tau}_L
\end{aligned}
$$

Asumiendo que ${\Large\tau}_L$ es constante, la velocidad del rotor será constante y dependerá de $I_p$.

Así se debe deducir las tensiones de entrada que crean las corrientes $i_a$ e $i_b$ necesarias.

Sustituyendo en $(10)$ en $(7)$:

$$
v_a = - L_a I_p P \omega\cos(P\theta) - (R_a I_p + K_m\omega)\sin(P\theta)
$$

Combinando linealmente el seno y el coseno:

$$
v_a= -V_p\cos(P\theta + \phi)
$$

$$
V_p = \sqrt{(L_a I_p \omega)^2 + (R_a I_p + K_m \omega)^2}
$$

$$
\phi = \arctan\left(\frac{R_a I_p + K_m \omega}{L_a I_p \omega}\right)
$$

Haciendo lo mismo para $v_b$:


$$
\boxed{\begin{aligned}
v_a &= - V_p\cos(P\omega t + \phi)\\
v_b &= V_p\sin(P\omega t + \phi)\\
\end{aligned}}
$$
