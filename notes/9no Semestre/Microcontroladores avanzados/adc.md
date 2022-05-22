---
layout: note
title: ADC
---

El Convertidor Analógico Digital, convierte una señal analógica (continua) en una señal digital (discreta). Para lograr esto con efectividad, realiza muestreos de la señal y según el teorema de Nyquits, que dice que debemos de muestrear la señal con una frecuencia del doble de la frecuencia de la señal.

El ATmega328P cuenta con un ADC, pero que por medio de un multiplexor, puede usar 8 canales. Puede hacer $15000 \text{ KSPS}$ (muestras por segundo). Tiene una resolución de 10 bit. Es decir, el muestreo de la señal puede caer en uno de los $2^{10}$ valores en los que se divide la tensión de referencia. Se cuenta con una referencia interna de $1.1\ V$ y posibilidad de tener una referencia externa.

# Configuración del ADC
## Canales
Los canales se seleccionan por medio de los bits `MUX3:0` en el registro `ADMUX`:

| `MUX3:0`          | Input                       |
| -                 | -                           |
| `0000`            | `ADC0`                      |
| `0001`            | `ADC1`                      |
| `0010`            | `ADC2`                      |
| `0011`            | `ADC3`                      |
| `0100`            | `ADC4`                      |
| `0101`            | `ADC5`                      |
| `0110`            | `ADC6`                      |
| `0111`            | `ADC7`                      |
| `1000`            | `ADC8` (sensor temperatura) |
| `1001` ... `1101` |                             |
| `1110`            | $1.1\ V$                    |
| `1111`            | $0\ V$ (GND)                |

## Tensión de referencia
La referencia se selecciona con los bits `REFS1:0` del registro `ADMUX`:

| `REFS1` | `REFS0` | Tensión de referencia $V_{ref}$                             |
| -       | -       | -                                                           |
| `0`     | `0`     | `AREF`, $V_{ref}$ interna apagada                           |
| `0`     | `1`     | $AV_{CC}$ con capacitor externo en `AREF`                   |
| `1`     | `0`     |                                                             |
| `1`     | `1`     | Tensión interna de $1.1\ V$ con capacitor externo en `AREF` |

> Cuando se tiene una tensión de referencia externa en `AREF`, no se deben seleccionar ninguna de las otras opciones internas. Puesto que habría un corto.

## Ajustar resultado en `ADC`
`ADC` es un registro de 10 bits. Pero físicamente se encuentra en 2 registros de 8 bit. Por lo que hay un `ADCH` (byte alto) y `ADCL` (byte bajo). El resultado se puede ajustar a la izquierda o derecha (default) por medio del bit `ADLAR` del registro `ADMUX`.

Con `ADLAR` = `0` (derecha):

|     |   |   |   |   |   | MSB |     |
| :-: | - | - | - | - | - | :-: | -   |
|     |   |   |   |   |   | `x` | `x` |

|     |     |     |     |     |     |     | LSB |
| -   | -   | -   | -   | -   | -   | -   | :-: |
| `x` | `x` | `x` | `x` | `x` | `x` | `x` | `x` |Con `ADLAR` = `1` (izquierda):

Con `ADLAR` = `1` (izquierda):

|     |   |   |   |   |   | MSB |     |
| :-: | - | - | - | - | - | :-: | -   |
| `x` | `x` | `x` | `x` | `x` | `x` | `x` | `x` |

|     | LSB |   |   |   |   |   |   |
| -   | :-: | - | - | - | - | - | - |
| `x` | `x` |   |   |   |   |   |   |

Esto nos puede ser útil para realizar lecturas de 8 bits, puesto que podríamos leer sólo el byte alto `ADCH`, sabiendo que perdemos los últimos 2 bit menos importantes. Se sacrifica precisión por sencillez.

## Preescalador
El ATmega328P realiza un muestreo por cada ciclo del ADC. Este necesita una señal de reloj entre $50\ kHz$ y $200\ kHz$. Tiene un módulo preescalador que puede generar una frecuencia adecuada para el ADC a partir de la señal de reloj CPU y funciona sólo si dicha señal tiene una frecuencia mayor a $100 kHz$.

El preescalador se configura por medio de los bits `ADPS2:0` del registro `ADCSRA`, para configurar el factor de división y se habilita por medio del bit `ADEN` en `ADCSRA`, las opciones de preescalamiento son:

| `ADPS2` | `ADPS1` | `ADPS0` | Factor de división |
| -       | -       | -       | -                  |
| `0`     | `0`     | `0`     | 1                  |
| `0`     | `0`     | `1`     | 2                  |
| `0`     | `1`     | `0`     | 4                  |
| `0`     | `1`     | `1`     | 8                  |
| `1`     | `0`     | `0`     | 16                 |
| `1`     | `0`     | `1`     | 32                 |
| `1`     | `1`     | `0`     | 64                 |
| `1`     | `1`     | `1`     | 128                |

# Operación
El ADC puede funcionar por [conversión única](#conversion-unica) o [conversión automática por disparo](#conversion-automatica-por-disparo), cuando la conversión termina (`ADIF` se levanta), se puede leer el resultado en el registro `ADCH` y `ADCL`, cuyo [corrimiento cambia con `ADLAR`](#ajustar-resultado-en-adc). El resultado es:

$$
\texttt{ADC} = \frac{1024\ V_{in}}{V_{ref}}
$$

## Conversión única
Los pasos para iniciar una conversión son:

1. Desactivar el bit (`0`) de reducción de energía `PRADC` en el registro `PRR`.
2. Activar el bit (`1`) de inicio de conversión `ADSC` en el registro `ADCSRA`.

Cuando termine la conversión `ADSC` regresará a `0`.

Cuando se cambia de canal mientras hay una conversión en proceso, se termina primero la conversión en curso y luego se cambia de canal.

## Conversión automática por disparo
El ADC puede ser configurado para realizar un muestreo cuando ocurre un evento. Cuando se detecta un flanco positivo en alguna de las señales de disparo, se comienza con la conversión.

> Si llega otro flanco durante la conversión, se ignorará. Si al terminar la conversión, sigue en `1` la señal, no se comenzará otra conversión.

Los pasos para configurar la conversión automática por disparo son los siguientes:

1. Configurar la fuente de disparo:

    Esto se configura con los bits `ADTS2:0` del registro `ADCSRB`:

    | `ADTS2` | `ADTS1` | `ADTS0` | Fuente de disparo            |
    | -       | -       | -       | -                            |
    | `0`     | `0`     | `0`     | Conversión continua          |
    | `0`     | `0`     | `1`     | Comparador analógico         |
    | `0`     | `1`     | `0`     | Interrupción externa `INT0`  |
    | `0`     | `1`     | `1`     | Comparador A con Timer0      |
    | `1`     | `0`     | `0`     | Desbordamiento del Timer0    |
    | `1`     | `0`     | `1`     | Comparador B con Timer1      |
    | `1`     | `1`     | `0`     | Desbordamiento del Timer1    |
    | `1`     | `1`     | `1`     | Captura de evento del Timer1 |

2. Activar (`1`) la conversión automática por disparo con el bit `ADATE` del registro `ADCSRA`.
3. Cuando la fuente de disparo es una interrupción, para que ocurra una interrupción al acabar la pasada, es necesario borrar la bandera de interrupción correspondiente.
    > Aunque se levante la bandera de interrupción, no se hace la llamada a interrupción de la fuente, si no está habilitada con su respectivo bit.

> Si se tiene activada la interrupción por término de conversión del ADC. Este comienza una conversión justo después de acabar la pasada, es decir como en "conversión continua".

> Aunque se esté en modo de disparo automático, se pueden inicar conversiones por medio del registro `ADSC`.

Más sobre esto se detalla en la [página 207 del datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=207).
