---
layout: note
title: maquinaEstados
---

Para describir una máquina de estados, es necesario apoyarse de dos cosas: El diagrama de estados y la tabla de estados. Estas se pueden describir siguiendo diferentes modos.  
  

## Transiciones y salidas

  
El siguiente es el ejemplo del [controlador](../../../6to%20Semestre/DLPs/Diseño%20RTL/Desarrollar%20la%20máquina%20de%20estados%20del%20controlador.md) utilizado en la práctica 1 de diseño RTL  

```
library IEEE;  
use IEEE.STD_LOGIC_1164.ALL;  
  
entity controlador is  
    Port ( c : in  STD_LOGIC;  
           tot_lt_s : in  STD_LOGIC;  
           d : out  STD_LOGIC;  
           clk : in  STD_LOGIC;  
           tot_ld : out  STD_LOGIC;  
           tot_clr : out  STD_LOGIC);  
end controlador;  
  
architecture Behavioral of controlador is  
  
type estados is (inicio, espera, suma, despacha);  
signal presente, siguiente: estados;  
  
begin  
    -- transiciones y salidas  
    process(presente,c,tot_lt_s)  
    begin  
        case presente is  
            when inicio =>  
                d <='0';  
                tot_ld <='0';  
                tot_clr <='1';  
                siguiente <=espera;  
  
            when espera =>  
                d <='0';  
                tot_ld <='0';  
                tot_clr <='0';  
                if c='1' then  
                    siguiente <=suma;  
                elsif (c='0' and tot_lt_s='1') then  
                    siguiente <=espera;  
                elsif (c='0' and tot_lt_s='0') then  
                    siguiente <=despacha;  
                end if;  
  
            when suma =>  
                d <='0';  
                tot_ld <='1';  
                tot_clr <='0';  
                siguiente <=espera;  
  
            when despacha =>  
                d <='1';  
                tot_ld <='0';  
                tot_clr <='0';  
                siguiente <=inicio;  
  
        end case;  
    end process;  
  
    --reloj  
    process(clk)  
    begin  
        if rising_edge(clk) then  
            presente <=siguiente;  
        end if;  
    end process;  
  
  
end Behavioral;
```