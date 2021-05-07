# Ejercicio 1
## 1)

$$
p_{LC} = (s + 6)^3 = s^3 + 18s^2 + 108s + 216
$$

## 2)

$$
\begin{aligned}
p_{LC} &= det(sI - (A - Bk))\\
&= s^3 + s^2(k_2 + k_3 - 16) + s(85 + 2k_1 - 10k_2 -12k_3) + 23k_2 - 12 k_1 + 37k_3 - 150\\
\end{aligned}
$$

## 3)

$$
\begin{cases}
k_2 + k_3 = 18 + 16\\
2k_1 - 10k_2 - 12k_3 = 108 - 85\\
-12k_1 + 23k_2 + 37k_3 = 216+150\\
\end{cases}
$$


Resolviendo el sistema:

$$
k = [1062.5\ \ -847\ \ 881]
$$

## 4)
Comando
```matlab
k = [1062.5 -847 881];
eig(A - B*k)
```
Resultado
```matlab
ans =

  -6.0002 + 0.0000i
  -5.9999 + 0.0002i
  -5.9999 - 0.0002i
```

# Ejercicio 2
## 1)

$$
p_{LA} = \det(sI - A) = s^3 - 6s^2 + 9s - 4
$$

## 2)

$$
P^{-1} = [B\ \ AB\ \ A^2B]\begin{bmatrix}
1&-6&9\\
0&1&-6\\
0&0&1\\
\end{bmatrix} = \left[\begin{array}{ccc} 5 & 85 & -15\\ 20 & 35 & -55\\ 20 & -210 & 115 \end{array}\right]
$$

$$
P = \left[\begin{array}{ccc} \frac{301}{10125} & \frac{53}{2025} & \frac{166}{10125}\\ \frac{136}{10125} & -\frac{7}{2025} & \frac{1}{10125}\\ \frac{196}{10125} & -\frac{22}{2025} & \frac{61}{10125} \end{array}\right]

$$

## 3)

$$
p_{LC} = (s + 5 - 2j)(s + 5 + 2j)(s + 4) = s^3 + 14s^2 + 69s + 116
$$

## 4)

$$
\bar{k} = [14 + 6\ \ 69 - 9\ \ 116 + 4] = [20\ \ 60\ \ 120]
$$

## 5)

$$
k = \bar{k}P = [3.7235\ \ -0.9877\ \ 1.0568]
$$

## 6)
Comando
```matlab
k = [3.7235 -0.9877 1.0568];
eig(A - B*k)
```
Resultado
```matlab
ans =

  -5.0000 + 2.0000i
  -5.0000 - 2.0000i
  -4.0000 + 0.0000i
```

# Ejercicio 3
## 1)

$$
p_{LC} = (s + 3 - 2j)(s + 3 + 2j)(s + 8) = s^3 + 14s^2 + 61s + 104
$$

## 2)

$$
\begin{aligned}
p_{LC} &= det(sI - (A - Bk))\\
&= (^3 + k3s^2 + (2k2 - k1 - k3 - 2)s + 3k1 - 15
\end{aligned}
$$

## 3)

$$
\begin{cases}
k_3 = 14\\
2k2 - k1 - k3 - 2= 61\\
3k_1 - 15 = 104\\
\end{cases}
$$


Resolviendo el sistema:

$$
k = [\dfrac{119}{3}\ \ \dfrac{175}{3}\ \ 14]
$$

## 4)
Comando
```matlab
k = [119/3 175/3 14];
eig(A - B*k)
```
Resultado
```matlab
ans =

  -3.0000 + 2.0000i
  -3.0000 - 2.0000i
  -8.0000 + 0.0000i
```

# Ejercicio 4
## 1)

$$
p_{LA} = \det(sI - A) = s^6 - 32s^4 + 128s^2
$$

## 2)

$$
\begin{aligned}
P^{-1} &= [B\ \ AB\ \ A^2B\ \ A^3B\ \ A^4B\ \ A^5B]\left[\begin{array}{cccccc} 1 & 0 & -32 & 0 & 128 & 0\\ 0 & 1 & 0 & -32 & 0 & 128\\ 0 & 0 & 1 & 0 & -32 & 0\\ 0 & 0 & 0 & 1 & 0 & -32\\ 0 & 0 & 0 & 0 & 1 & 0\\ 0 & 0 & 0 & 0 & 0 & 1 \end{array}\right]\\
&= \left[\begin{array}{cccccc} 0 & -1 & 0 & 16 & 0 & 0\\ -1 & 0 & 16 & 0 & 0 & 0\\ 0 & 0 & 0 & 16 & 0 & 0\\ 0 & 0 & 16 & 0 & 0 & 0\\ 0 & 1 & 0 & -32 & 0 & 128\\ 1 & 0 & -32 & 0 & 128 & 0 \end{array}\right]
\end{aligned}
$$

$$
P = \left[\begin{array}{cccccc} 0 & -1 & 0 & 1 & 0 & 0\\ -1 & 0 & 1 & 0 & 0 & 0\\ 0 & 0 & 0 & \frac{1}{16} & 0 & 0\\ 0 & 0 & \frac{1}{16} & 0 & 0 & 0\\ 0 & \frac{1}{128} & 0 & \frac{1}{128} & 0 & \frac{1}{128}\\ \frac{1}{128} & 0 & \frac{1}{128} & 0 & \frac{1}{128} & 0 \end{array}\right]
$$

## 3)

$$
\begin{aligned}
p_{LC} &= (s + 3 - 2j)(s + 3 + 2j)(s + 5 - 4j)(s + 5 + 4j)(s + 4)(s + 6)\\
&= s^6 + 26*s^5 + 298*s^4 + 1900*s^3 + 7029*s^2 + 14354*s + 12792\\
\end{aligned}
$$

## 4)

$$
\bar{k} = [\tilde{a}_1 - a_1\ \ \ldots\ \ \tilde{a}_6 - a_6] = [26  \  \     330        1900\  \      6901   \ \   14354 \ \     12792]
$$

## 5)

$$
k = \bar{k}P = [-230.0625\ \ 86.1406\ \ 861.2500\ \ 256.8906\ \ 99.9375  112.1406]
$$

## 6)
Comando
```matlab
k = [-230.0625 86.1406 861.2500 256.8906 99.9375 112.1406];
eig(A - B*k)
```
Resultado
```matlab
ans =

  -5.0000 + 4.0000i
  -5.0000 - 4.0000i
  -3.0000 + 2.0000i
  -3.0000 - 2.0000i
  -6.0000 + 0.0000i
  -4.0000 + 0.0000i
```
