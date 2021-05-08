---
layout: note
---

![8f117977af27f824e2b9021d6bfe511a.png](../../img/13a87149ed3e4bc2b647edf35200135a.png)
# Se determinan los componentes
![50e817f9e96ecd3b37909ef4df8a0baf.png](../../img/e751f3f5e7ad42a7a2f852cd2d27f71a.png)
# Se determinan que componentes se `diseñan` o se `seleccionan`
![c4d6fb9c0c8a3ddaa6a07114de3a88a3.png](../../img/d569a63f97844442ad49ed875dbddb59.png)
# Se determina el área de conocimiento requerida
![7efbd8c1ac93de0d85bb6a4803480cc5.png](../../img/5a18b2e622d04df7a7ec8f203c53a029.png)

# Se diseña con los métodos necesarios
## Diseño mecánico
![8711f0f0f005a32cf5c067f1abf65938.png](../../img/d43da69d25f8460791fefc7a361269a9.png)
Machinery's Handbook
* Mecanismo corona in fin
	* Diseño de la corona
	Qué metodo se aplica?
		* Modelo: cuerpo libre
			* Expresiones matemáticas
		* Validación:
			* Análisis por resistencia
			* Análisis por rigidez
			* Análisis de fatiga
			* Análisis modal
			* Análisis de interferencias
			* Análisis de fabricación
		* Diseño del sin fín
		* Selección de rodamientos
		* Diseño de eje A
			Qué método se emplea?
		* Diseño de eje B
		* Diseño soportes
		
## Diseño eléctrico
## Diseño informático
# Se seleccionan los componentes pertinentes
![b8e77c63f4434036fc1f9f1a51cc9f32.png](../../img/7cb4e8187a124ac696fd2750524d6ae6.png)
Para seleccionar componentes es importante enfocarse principalmente en las `funciones` y después pensar en la `comercialización`.

Es importante tomar como base entonces en los siguientes criterios:
* Cálculos
* Funcionalidad
* Requerimientos: Los requerimientos se pueden ir añadiendo a la lista inicial, después se convertirán en las especificaciones técnicas.

![78ab9b3edd44bf092b49cf4656ab747e.png](../../img/18ba44734bb440a49c46b13e59c7f42a.png)

## Diagrama de ruta 
Va asociada a el funcionamiento del componente.
![8db5370c1aa216246070d84fa4dbd2a4.png](../../img/6db6a5c67a9341c9a64ee071fc0efde0.png)

## Procedimiento
1. Recopilar información de la aplicación `Requerimientos`
2. Investigar con los fabricantes-proveedores de las familias y características de los componentes.
	1. Investigar el `método de selección` que recomienda el fabricante.
	2. Si existe, emplear el método del fabricante (el que sea el `más claro`).
		1. Buscar componentes similares de `otras marcas`.
		2. `Seleccionar` al menos `otros 2`.
	3. Si no existe, buscar en bases de datos especializadas.
		1. Utilizar `filtros` y documentar:
			1. `Número inicial de componentes`.
			2. `Filtros`, indicando `rangos`.
			3. `Número final de componentes`.
3. Aplicar un método de `selección multicriterio` tomando en cuenta los criterios de `costos`,`tiempos de entrega`, `disponibilidad`, etc (no funcionales).

## Páginas web
* [Mouser](https://www.mouser.com/)
* [Newark](https://mexico.newark.com/)
* [Automation Direct](https://www.automationdirect.com/adc/home/home)
* [McMaster-CARR](https://www.mcmaster.com/)

# Selección de materiales
Es de suma importancia en el diseño, pues una mala elección de estos pueden implicar `fallas` y `costos` innecesarios.

* Incremento Costo de Manufactura
* Incremento tiempo de Manufactura
* Cambio de propiedades del material - cambio de procesos de manufactura
* Afecciones en rendimiento

La selección debe ir paralela al proceso de diseño.

![trianguloDisManMat](../../img/trianguloDisenoManufacturaMateriales.png)

Para esto debemos pasar de posibles materiales a un sólo material.

## Procedimiento
1. Definir las funciones para que cumpla el rendimiento
    * Traducirlas en propiedades de los materiales
    * Costo del Material y disponibilidad
2. Definir los requerimientos de manufactura
    * Parámetros como: cantidad de piezas, tamaño, complejidad, tolerancia, acabado. etc. 
3. Comparar las características en Bases de Datos.
    * Buscar propiedades que marquen un límite superior o inferior.
    * Preguntar: Este material cumple las características del diseño?
4. Investigar los candidatos
    * Más detalles de los materiales, marcas, costos, fabricación, procesado.
    * Verificar la disponibilidad en presentaciones, tamaño, ventas.
    * Aplicar matrices de decisión.
5. Pruebas y estándares
    * En ocasiones es necesario validar el material definiendo ciertas pruebas
    * Apoyarse en ATSM, ANSI, SAE y MIL

## Proceso de sustitución para un producto o diseño existente:
1. Definir las funciones para que cumpla el rendimiento
2. Definir qué características son importantes para el funcionamiento
    * `Características por mejorar`

    
## Importancia de los materiales de Ashvile

![importanceMaterialsAsh](../../img/importanceMaterialsAsh.png)

Materiales por función

![relacionMaterialProcesosDiseño](../../img/relacionMaterialProcesosDiseño.png)

Ashvile realizó una forma de elección de materiales, evaluando cada propiedad que obedece a una función:

![graficaClasesMaterialesAshville.png](../../img/graficaClasesMaterialesAshville.png)

![graficaClasesMaterialesAshville2.png](../../img/graficaClasesMaterialesAshville2.png)

![graficaClasesMaterialesAshville3.png](../../img/graficaClasesMaterialesAshville3.png)

![tablaIndicesMateriales.png](../../img/tablaIndicesMateriales.png)

El clasifica los materiales por clases, subclases, etc, hasta llegar a sus atributos:

# Selección de procesos
