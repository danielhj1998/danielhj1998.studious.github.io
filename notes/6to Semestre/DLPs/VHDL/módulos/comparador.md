---
layout: note
title: Comparador
---

Comparador de 8 bits  

```
library IEEE;  
use IEEE.STD_LOGIC_1164.ALL;  
  
entity comparador is  
    Port ( a : in  STD_LOGIC_VECTOR (7 downto 0);  
           b : in  STD_LOGIC_VECTOR (7 downto 0);  
           c : out  STD_LOGIC);  
end comparador;  
  
architecture Behavioral of comparador is  
  
begin  
    process(a,b)  
    begin  
        if a<b then  
            c <= '1';  
        else  
            c <= '0';  
        end if;  
    end process;  
  
end Behavioral;
```
