---
layout: note
title: Máscaras de Bits
---

Son distintas secuencias de bits tales que combinadas en una operación binaria con cualquier otra secuencia, permiten modificar esta última, u obtener información sobre ella, a conveniencia del programador.  
  

## AND (a `0`)

  
• X AND 0 = 0  
• X AND 1 = X  
$\therefore$ se pueden forzar bits a `0`, sin tocar al resto.
|||||
|---|---|---|---|
||$b_2$|$b_1$|$b_0$|
|AND|$0$|$1$|$0$|
|
||$0$|$b_1$|$0$|

## OR (a `1`)

* X OR 0 = X
* X OR 1 = 1
$\therefore$ se pueden forzar bits a `1`, sin tocar al resto.

|||||
|---|---|---|---|
||$b_2$|$b_1$|$b_0$|
|OR|$0$|$1$|$0$|
|
||$b_2$|$1$|$b_0$|


## XOR (`!` Invertir/Complementar)

* X XOR 0 = $X$
* X XOR 1 = $\overline{X}$
$\therefore$ se pueden invertir bits a `1`, sin tocar al resto.

|||||
|---|---|---|---|
||$b_2$|$b_1$|$b_0$|
|XOR|$0$|$1$|$0$|
|
||$b_2$|$\overline{b_1}$|$b_0$|