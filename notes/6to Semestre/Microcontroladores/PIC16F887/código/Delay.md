# Subrutinas para hacer delay
## Subrutina nivel 1
```mpasm
			MOVLW 	VAR1
			MOVWF	0x60
			CALL	ST1V
			; resto del programa
			; resto del programa
			; resto del programa
			; SE REGRESA DE LA SUBRUTINA
ST1V		NOP
			NOP
			NOP
			DECFSZ	0X60,F
			GOTO
			RETURN
			
			END
```
Se calculan los ciclos de máquina.

$$
\newcommand{\ut}[2]{\underbrace{#1}_{\text{#2}}}
\begin{aligned}
\#cm&=\ut{2}{carga}+\ut{2}{call}\begin{matrix}
+\#\text{NOPS}&+1+2\\
+\#\text{NOPS}&+1+2\\
\vdots\\
+\#\text{NOPS}&+1+2\\
+\#\text{NOPS}&\ut{\phantom{+1}}{dec}\ut{\phantom{+2}}{goto}\\
\end{matrix}+\ut{2}{dec}+\ut{2}{return}\\
\\
&=8 + (\text{VAR1})(\#\text{NOPS})+(\text{VAR1}-1)(3)\\
\end{aligned}
$$

Por lo tanto:

$$
\#cm=\text{VAR1}(\#\text{NOPS}+3)+5
$$

Calculando el tiempo:

$$
\begin{aligned}
t_{delay}&=\dfrac{4\ \#cm}{f}\\
&=\dfrac{4(\text{VAR1}(\#\text{NOPS}+3)+5)}{f}\\
\end{aligned}
$$

Despejando $\text{VAR1}$:

$$
\begin{aligned}
\text{VAR1}&=\frac{\dfrac{t_{delay}f}{4}-5}{\#\text{NOPS}+3}\\
\end{aligned}
$$

Por lo tanto:

$$
\text{VAR1}=\frac{t_{delay}f-20}{4\ \#\text{NOPS}+3}\\
$$

### Tabla valores comúnes
$\text{VAR1}$ es de 8 bits y por lo tanto puede tomar valores de 0 a 255
Se consideran los siguientes valores:

$$f=4MHz\quad\quad \#\text{NOPS}=$$
$
|Tiempo mín.|$11\ \mu s$|
|---------|-----|
|**Tiempo máx.**|$1.541\ ms$|
|**Fórmula tiempo**|$t_{delay}=\dfrac{\text{VAR1}(6)+5}{1\times10^6 Hz}$|
|**Fórmula $\text{VAR1}$**|$\text{VAR1}=\dfrac{t_{delay}(1\times10^6 Hz)-5}{6}$|

## Subrutina nivel 2
```
		MOVLW	VAR1
		MOVWF	0X62
		MOVLW	VAR2
		MOVWF	0X61
		CALL	ST2V

ST2V	MOVF 	0X62,W
		MOVWF	0X63
DECRE2V	NOP
		NOP
		NOP
		DECFSZ	0X63,F
		GOTO	DECRE2V
		DECFSZ	0X61,F
		GOTO	ST2V
		RETURN
```
En este caso:

$$
\#cm=7+(\text{VAR2})[4+(\#\text{NOPS}+3)(\text{VAR1})]
$$

### Tabla valores comúnes
$\text{VAR1}$ es de 8 bits y por lo tanto puede tomar valores de 0 a 255
Se consideran los siguientes valores:

$$f=4MHz\quad\quad \#\text{NOPS}=$$
$
|Tiempo mín.|$17\ \mu s$|
|---------|-----|
|**Tiempo máx.**|$394.247\ ms$|

## Subrutina nivel 3
```
			MOVLW	VAR1
			MOVWF	0X64
			MOVLW	VAR2
			MOVWF	0X65
			MOVLW	VAR3
			MOVWF	0X66
			CALL	ST3V
			
ST3V		MOVF	0X66,W
			MOVWF	0X67
RECARGA3V	MOVF	0X65,W
			MOVWF 	0X68
DECRE3V		NOP
			NOP
			NOP
			DECFSZ	0X68,F
			GOTO	DECRE3V
			DECFSZ	0X67,F
			GOTO	RECARGA3V
			DECFSZ	0X64,F
			GOTO	ST3V
			RETURN
```
En este caso:

$$
\#cm=9+\text{VAR1}\Big\{\text{VAR3}\big[\text{VAR2}(\#\text{NOPS}+3)+4\big]+4\Big\}
$$

### Tabla valores comúnes
$\text{VAR1}$ es de 8 bits y por lo tanto puede tomar valores de 0 a 255
Se consideran los siguientes valores:

$$f=4MHz\quad\quad \#\text{NOPS}=$$
$
|Tiempo mín.|$23\ \mu s$|
|---------|-----|
|**Tiempo máx.**|$100.926473\ s$|