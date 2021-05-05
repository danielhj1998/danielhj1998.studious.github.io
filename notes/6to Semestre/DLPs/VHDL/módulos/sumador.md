sumador

El siguiente es un ejemplo de un bloque sumador de 8 bits  

```
library IEEE;  
use IEEE.STD\_LOGIC\_1164.ALL;  
use IEEE.numeric_std.all;  
use IEEE.std\_logic\_unsigned.all;  
  
  
entity sumador is  
    Port ( a : in  STD\_LOGIC\_VECTOR (7 downto 0);  
           b : in  STD\_LOGIC\_VECTOR (7 downto 0);  
           suma : out  STD\_LOGIC\_VECTOR (7 downto 0));  
end sumador;  
  
architecture Behavioral of sumador is  
  
begin  
    suma <= a+b;  
  
end Behavioral;
```