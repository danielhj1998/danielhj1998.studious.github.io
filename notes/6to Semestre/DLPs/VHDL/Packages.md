Packages

Los paquetes son utilizados en VHDL para encapsular una serie de módulos para después utilizarlos en otros módulos  
  
El package tiene la siguiente estructura:  

```
library IEEE;  
use IEEE.STD_LOGIC_1164.all;  
  
package {nombrePackage} is  
  
component {nombreComponente}  
-- Declaración de entradas y salidas (Igual que como están decalaradas en el módulo)  
    Port ( s1 : in  STD_LOGIC;  
           s2 : out  STD_LOGIC;  
           s3 : in  STD_LOGIC_VECTOR (7 downto 0);  
           s4 : out  STD_LOGIC_VECTOR (7 downto 0);  
           -- ...  
           -- ...  
           -- ...  
           sn : in  STD_LOGIC);  
end component;  
  
end {nombrePackage};
```

  
  
Para usar el costal, luego en otro módulo VHDL:  

```
use work.costal.all;  
  
...  
  
begin  
--Etiqueta: NombreBloque port map(puertoBloque=>señal,  
--                               puertoBloque2=>señal2,  
--                               ...  
--                               puertoBloquen=>señaln);  
--Ejemplo  
u1: divisor port map(clk=>mclk,clksal=>auxclk); --También puede ser una línea  
  
end Behavioral;
```