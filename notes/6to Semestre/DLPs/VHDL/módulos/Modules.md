Los módulos VHDL se usan para encapsular bloques de hardware y trabajar de forma modular.  
  
La estructura de un módulo VHDL usando Xilinx ISE design suite es la siguiente:  

```vhdl
library IEEE;  
use IEEE.STD_LOGIC_1164.ALL;  
--use IEEE.numeric_std.all;  
--use IEEE.std_logic_unsigned.all;  
  
entity {nombre} is -- Nombre  
    Port ( a : in  STD_LOGIC;  
           b : out  STD_LOGIC_VECTOR (7 downto 0);  
           suma : inout  STD_LOGIC_VECTOR (7 downto 0));  
end {nombre};  
  
architecture Behavioral of {nombre} is  
  
begin  
  
end Behavioral;
```