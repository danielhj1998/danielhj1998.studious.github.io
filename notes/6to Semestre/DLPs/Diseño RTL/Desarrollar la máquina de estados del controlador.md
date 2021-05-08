---
layout: note
---

Tomando en cuenta el diagrama del paso anterior:  
![images\6-1.png](../../../img/19eee844973940eba10230be0c478621.png)  
  

## Se crea el diagrama de estados del controlador

  
![images\6-2.png](../../../img/3057fa6c197449988b9921bbcd08f570.png)  
  

## Se diseña el controlador

  
Un controlador básico, está compuesto por una ALU y uno o más registros  
![images\6-3.png](../../../img/0b2fe79e3d214a1a8910bc8ad6ff1ab4.png)  
Donde, dependiendo del estado presente (almacendo en los registros) y de las señales de entrada, la ALU entrega ciertas salidas, actualizando a su vez el registro al estado siguiente. La ALU, es una tabla de verdad.  
  
Para hacer todo a mano tendríamos que realizar los siguientes pasos:  
1. Tabla de estados  
![images\6-4.png](../../../img/710755fb609243f3afc2b16b97c3d577.png)  
2. Tabla de lógica combinatoria (apoyados del diagrama de estados y la tabla de estados)  
![images\6-5.png](../../../img/f2f063bb93174b9babe4dbf1a486bc75.png)  
3. Ecuaciones usando mapas de Karnaugh  
![images\6-6.png](../../../img/5d09e6c3ca7140e4b8f6c0b8fccbb497.png)  
4. Diseñar el circuito con VHDL  
![images\6-7.png](../../../img/f870f20612e8486998ec51178eb6d8bf.png)  
En este caso se tuvo que utilizar un divisor además, debido al hardware utilizado (Nexys 2) cuyo reloj es de 50hz  