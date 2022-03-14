---
layout: note
---

# Metodología
El diseño de una célula de trabajo, debe hacerse considerando los siguientes criterios:
1. Seleccionar, definir, diseñar y situar elementos de la célula
    * Pasivos (mesas, alimentadores, etc)
    * Activos (manipuladores secuenciales, máquinas CNC)
2. Definir y seleccionar la arquitectura de control
3. Definición del plano del sistema (iterativo)
    * Sistemas CAD
    * Simuladores gráficos para robots
    * Simuladores de FMS

# Disposición del robot en la célula de trabajo
* **Robot en el centro de la célula**
    Este tipo de disposición hace que el robot interactué con todos los elementos acomodados al rededor del robot y por lo tanto, el robot tiene diversas funciones. El robot en esta disposición está fijo.

* **Robot en línea**
    El robot interactuá con elementos que llegan en un sistema de transporte, aquí el robot es fijo.

* **Robot móvil**
    El robot tiene desplazamiento sobre una vía, esto le permite interactuar con elementos en diferentes lugares.

* **Robot suspendido**
    Están en un acomodo tipo pórtico, suspendidos de arriba, lo que hace que puedan tener un acceso mejor a lugares que así lo requieren.

# Características del sistema de control
Para tener un buen sistema de control, se deben cumplir con las siguientes características:

* Control individual (máquinas, transporte, dispositivos)
* Sincronización (dispositivos entre si)
* Detección, tratamiento y recuperación (anomalías)
* Optimización del funcionamiento (función, dinámica)
    * Eliminar tiempos muertos
    * Mejorar la eficiencia energética
* Interfaz con el usuario (detalles, mantenimiento, ajuste)
    * Considerar también disponibilidad de revisión (cumplimiento de normas en el país)
* Interfaz con otras células (sincronización, optimizar)
* Interfaz con un sistema de control superior (funciones de supervisión y actualización en cambios)

# Criterios de selección de un robot manipulador industrial
## Geométricos
* **Área de trabajo**
    * Orientaciones
    * Puntos singulares
* **Grados de libertad**
    Dependiendo de la aplicación, los grados de libertad necesarios, para proporcionar accesibilidad y capacidad para orientar el efector final, se tienen los siguientes criterios como base:

    * Paletizado: **3**
    * Pintura, soldadura, sellantes: **6**

## Cinemáticos
* **Precisión, repetitividad y resolución**
    Se requiere evaluar los parámetros mínimos del robot para realizar el proceso requerido

* **Velocidad**
    * Es inversamente proporcional a la carga
    * Puede suministrarse la velocidad de cada articulación o el valor medio del extremo
    * Útil para calcular tiempos de ciclo
    * Se suministra la velocidad nominal
* **Aceleración y desaceleración**

## Dinámicos
* **Capacidad de carga**
    * Depende del tipo de accionamiento, tamaño y configuración del robot
    * Peso de las piezas a transportar y el peso de la herramienta
* **Fuerza de manipulación**
* **Frecuencia de resonancia**
    
## Tipos de movimientos
* **Sistema de control**
    * Control punto a punto (PTP) o trayectoria continua
    * Control en cadena abierta o en cadena cerrada
    * Programación textual o por guiado

## Modo de programación
* **Enseñanza** (guiado)
* **Textual**

## Tipo de accionamiento
* **Eléctrico** (CD, CA)
* **Neumático**
* **Hidráulico**
    
## Comunicaciones
* **E/S digitales/analógicas**
* **Comunicaciones línea serie**

## Servicio proveedor
* **Mantenimiento**
* **Servicio Técnico**
* **Cursos formativos**

# Normas
* **EN ISO 9946**: Características de los robots que debe proporcionar el fabricante
* **UNE EN ISO 9283**: Modo de análisis de prestaciones de robots
* **UNE EN ISO 8373**: Vocabulario
* **EN ISO 9787**: Sistemas de coordenadas y movimientos
* **UNE EN ISO 10218**: Seguridad para robots manipuladores industriales
* **UNE EN ISO 15187**: Interfaces gráficas de usuario para la programación y el funcionamiento de robots (GUI-R)
* **UNE EN ISO 9409**: Interfaces mecánicas
* **EN ISO 11593**: Sistemas de intercambio automático de efector. Vocabulario y presentación de características
* **UNE EN ISO 14539**: Transporte de objetos con dispositivos de agarre tipo empuñadura. Vocabulario y presentación de características

# Características deseables por aplicación
* **Pintura**
    * Programación por guiado
    * Campo de acción similar al humano
    * Estructura antropomórfica
    * 6 GDL
* **Paletización**
    * Elevada capacidad de carga
    * Relación grande entre área de trabajo y tamaño del robot
    * Control PTP
* **Procesado**
    * Sistema de programación
    * 5-6 GDL
    * Campo de acción similar al humano
    * Control de trayectoria continua
* **Ensamblado**
    * Elevada precisión y rapidez
    * Campo de acción similar al humano
    * Potencia del sistema de programación
    * Sistema sensorial
