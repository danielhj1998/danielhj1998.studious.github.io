---
layout: note
title: Teoría de Coulomb Mohr para materiales frágiles
---

Esta teoría es utilizada en materiales frágiles, en los cuales $S_{yt} \neq S_{yc}$.

# Procedimiento
El procedimiento a seguir es el siguiente:

1. Calcular esfuerzos principales y ordenarlos:
    
    $$
    \sigma_1 \geq \sigma_2 \geq \sigma_3
    $$
    
2. Aplicar el caso correspondiente:
    
    $$
    \def\arraystretch{2.5}
    \begin{array}{c|c c c}
        \text{Caso}& \text{Circunstancia} &\text{Condición de fallo} & \text{Factor de Seguridad}\\
        \hline
        1&\sigma_1 \geq \sigma_3 \geq 0 & \sigma_1 \geq S_{ut} & N = \dfrac{S_{ut}}{\sigma_1}\\
        2&\sigma_1 \geq 0 \geq \sigma_3 & \dfrac{\sigma_1}{S_{ut}}-\dfrac{\sigma_3}{S_{uc}} \geq 1 & \dfrac{1}{N} = \dfrac{\sigma_1}{S_{ut}} - \dfrac{\sigma_3}{S_{uc}}\\
        3&0 \geq \sigma_1 \geq \sigma_3 & \sigma_3 \leq - S_{uc} & N = -\dfrac{S_{uc}}{\sigma_3}\\
    \end{array}
    $$
    
    Donde:
    $S_{ut}$ es la resistencia última a la **tensión**.
    $S_{uc}$ es la resistencia última a la **compresión**.
