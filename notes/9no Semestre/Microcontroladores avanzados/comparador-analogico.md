---
layout: note
title: Comparador Analógico
---

Se comparan los valores de entrada en los pines `AIN0` $(+)$ y `AIN1` $(-)$, que están conectados a los pines positivo y negativo respectivamente, de un amplificador operacional, como se muestra en la [pág 202 del datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=202). Cuando $V_\texttt{AIN0} > V_\texttt{AIN1}$, se activa el bit `ACO` del registro `ACSR`.

# Configuración de disparo
Se puede configurar la activación de `ACO` para disparar:

* Una interrupción con la bandera `ACI`
    * Se debe habilitar por medio del bit `ACIE` del registro `ACSR`
* La función de [captura del Timer1](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=96).
* Para disparar una [conversión con el ADC](../adc.html#conversión-automática-por-disparo)

# Entrada multiplexada del comparador analógico
El pin negativo del comparador, se puede reemplazar por cualquiera de los pines `ADC7..0`. Para esto: 

1. El ADC debe estar apagado (`ADEN` en `ADCSRA` = 0)
2. Se debe activar el bit `ACME` del registro `ADCSRB`.
3. Se puede seleccionar el canal por medio los bits `MUX2..0` del registro `ADMUX`:
    
    | `ACME` | `ADEN` | `MUX2..0` | Entrada negativa del comparador |
    | :-:    | :-:    | :-:       | :-:                             |
    | `0`    | `x`    | `xxx`     | `AIN1`                          |
    | `1`    | `1`    | `xxx`     | `AIN1`                          |
    | `1`    | `0`    | `000`     | `ADC0`                          |
    | `1`    | `0`    | `001`     | `ADC1`                          |
    | `1`    | `0`    | `010`     | `ADC2`                          |
    | `1`    | `0`    | `011`     | `ADC3`                          |
    | `1`    | `0`    | `100`     | `ADC4`                          |
    | `1`    | `0`    | `101`     | `ADC5`                          |
    | `1`    | `0`    | `110`     | `ADC6`                          |
    | `1`    | `0`    | `111`     | `ADC7`                          |
    
# Selección de modo de interrupción

Se selecciona por medio de los bits `ACIS1:0` del registro `ACSR`.

| `ACIS1` | `ACIS0` | Entrada negativa del comparador             |
| :-:     | :-:     | -                                           |
| 0       | 0       | Comparator interrupt on output toggle       |
| 0       | 1       | Reserved                                    |
| 1       | 0       | Comparator interrupt on falling output edge |
| 1       | 1       | Comparator interrupt on rising output edge  |
