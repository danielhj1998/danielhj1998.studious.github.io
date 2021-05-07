El divisor de señal se usa para dividir la señal de reloj y obtener frecuencias más bajas.  
El siguiente es un bloque divisor con señal de reset:  

```
library IEEE;  
use IEEE.STD\_LOGIC\_1164.ALL;  
use IEEE.numeric_std.all;  
use IEEE.std\_logic\_unsigned.all;  
  
entity divisor is  
    Port ( rst : in  STD_LOGIC;  
           clksal : out  STD_LOGIC;  
           clk : in  STD_LOGIC);  
end divisor;  
  
architecture Behavioral of divisor is  
signal q: std\_logic\_vector(25 downto 0);  
  
begin  
    process(clk,rst)  
    begin  
        if rst='1' then  
            q <=(others => '0');  
        elsif rising_edge(clk) then  
            q <= q + 1;  
        end if;  
    end process;  
  
    clksal <=q(25);  
  
end Behavioral;
```