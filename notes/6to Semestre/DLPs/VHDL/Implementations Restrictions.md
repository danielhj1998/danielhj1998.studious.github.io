Para poder mapear los pines que nosotros queramos y no los que asigne automáticamente el programa a nuestro dispositivo, se necesitan declarar restricciones.  
  
Para declarar pines, dentro del archivo de "Implementation Constraints":  

```vhdl
net {señal} loc={nombreDePinFisico};  
  
--Ejemplo  
  
net mclk loc=b8; --Mapearía la señal mclk al reloj del Nexys 2 (b8)
```