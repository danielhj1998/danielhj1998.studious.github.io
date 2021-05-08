---
layout: note
---

Este es un algoritmo para decodificar de binario a decimal decodificado en binario.

```
library ieee;
use ieee.std_logic_1164.all;
use ieee.std_logic_unsigned.all;
 
entity binary_bcd is
    generic(N: positive := 8);
    Port(
        clk, reset: in std_logic;
        binary_in: in std_logic_vector(N-1 downto 0);
        bcd0, bcd1, bcd2: out std_logic_vector(3 downto 0)
    );
end binary_bcd ;
 
architecture behaviour of binary_bcd is
    type states is (start, shift, done);
    signal state, state_next: states;
 
    signal binary, binary_next: std_logic_vector(N-1 downto 0);
    signal bcds, bcds_reg, bcds_next: std_logic_vector(11 downto 0);
    -- output register keep output constant during conversion
    signal bcds_out_reg, bcds_out_reg_next: std_logic_vector(11 downto 0);
    -- need to keep track of shifts
    signal shift_counter, shift_counter_next: natural range 0 to N;

begin
 
    process(clk, reset)
    begin
        if reset = '1' then
            binary <= (others => '0');
            bcds <= (others => '0');
            state <= start;
            bcds_out_reg <= (others => '0');
            shift_counter <= 0;
        elsif falling_edge(clk) then
            binary <= binary_next;
            bcds <= bcds_next;
            state <= state_next;
            bcds_out_reg <= bcds_out_reg_next;
            shift_counter <= shift_counter_next;
        end if;
    end process;
 
    convert:
    process(state, binary, binary_in, bcds, bcds_reg, shift_counter)
    begin
        state_next <= state;
        bcds_next <= bcds;
        binary_next <= binary;
        shift_counter_next <= shift_counter;
 
        case state is
            when start =>
                state_next <= shift;
                binary_next <= binary_in;
                bcds_next <= (others => '0');
                shift_counter_next <= 0;
            when shift =>
                if shift_counter = N then
                    state_next <= done;
                else
                    binary_next <= binary(N-2 downto 0) & 'L';
                    bcds_next <= bcds_reg(10 downto 0) & binary(N-1);
                    shift_counter_next <= shift_counter + 1;
                end if;
            when done =>
                state_next <= start;
        end case;
    end process;
 
    bcds_reg(11 downto 8) <= bcds(11 downto 8) + 3 when bcds(11 downto 8) > 4 else
                             bcds(11 downto 8);
    bcds_reg(7 downto 4) <= bcds(7 downto 4) + 3 when bcds(7 downto 4) > 4 else
                            bcds(7 downto 4);
    bcds_reg(3 downto 0) <= bcds(3 downto 0) + 3 when bcds(3 downto 0) > 4 else
                            bcds(3 downto 0);
 
    bcds_out_reg_next <= bcds when state = done else
                         bcds_out_reg;
 
    bcd2 <= bcds_out_reg(11 downto 8);
    bcd1 <= bcds_out_reg(7 downto 4);
    bcd0 <= bcds_out_reg(3 downto 0);
    
end behaviour;
```

El algoritmo tiene como objetivo transformar un numero binario a la
representación en binario de un número decimal. El decimal decodificado
en binario se refiere a sus dígitos en segmentos de 4 bits.

Para esto se realizan 3 pasos:

1.  Se recorre el número binario un bit a la izquierda (entrando al
    número BCD).

2.  Si cualquiera de los dígitos del número BCD (fragmentos de 4 bits),
    es mayor o igual a 5, se le suma 3.

3.  Se repiten los pasos anteriores la cantidad de bits del número
    binario que se quiere convertir.

A continuación se explica el código.

En el código se ocupan 3 entradas, “clk” y “reset”, estas son el reloj y
la señal de resteo del sistema, el vector de entrada “binary\_in”, es el
número en binario que queremos codificar a código bcd; bcd0, bcd1 y bcd2
son las salidas de unidades, decenas y centenas codificadas en código
bcd.

``` {.vhdl frame="single" framesep="10pt"}
entity binary_bcd is
    generic(N: positive := 8);
    Port(
        clk, reset: in std_logic;
        binary_in: in std_logic_vector(N-1 downto 0);
        bcd0, bcd1, bcd2: out std_logic_vector(3 downto 0)
    );
end binary_bcd ;
```

Para realizar la decodificación definimos los nombres de los estados de
nuestra maquina que son: “start”, “shift” y “done”, para la descripción
de los estados presente y siguiente de la maquina de estados utilizamos
las palabras “state” y “state\_next” y por ultimo definimos signals que
serán los registros que nos permiten realizar el corrimiento de nuestros
datos recibidos.

``` {.vhdl frame="single" framesep="10pt"}
architecture behaviour of binary_bcd is
    type states is (start, shift, done);
    signal state, state_next: states;
 
    signal binary, binary_next: std_logic_vector(N-1 downto 0);
    signal bcds, bcds_reg, bcds_next: std_logic_vector(11 downto 0);
    -- output register keep output constant during conversion
    signal bcds_out_reg, bcds_out_reg_next: std_logic_vector(11 downto 0);
    -- need to keep track of shifts
    signal shift_counter, shift_counter_next: natural range 0 to N;
```

En esta parte del código se ejecutan los cambios de estado y el
corrimiento hacia la izquierda del código bcd y del número que se está
codificando (solo se ejecuta lo que ya se estableció en las siguientes
lineas).

``` {.vhdl frame="single" framesep="10pt"}
begin
 
    process(clk, reset)
    begin
        if reset = '1' then
            binary <= (others => '0');
            bcds <= (others => '0');
            state <= start;
            bcds_out_reg <= (others => '0');
            shift_counter <= 0;
        elsif falling_edge(clk) then
            binary <= binary_next;
            bcds <= bcds_next;
            state <= state_next;
            bcds_out_reg <= bcds_out_reg_next;
            shift_counter <= shift_counter_next;
        end if;
    end process;
```

Se definen los cambios de estado y se realiza el proceso de recorrer en
el vector bcd concatenándolo con el ultimo bit del vector a codificar,
también se recorre el vector a codificar para poder realizar la
siguiente repetición.

``` {.vhdl frame="single" framesep="10pt"}
    process(state, binary, binary_in, bcds, bcds_reg, shift_counter)
    begin
        state_next <= state;
        bcds_next <= bcds;
        binary_next <= binary;
        shift_counter_next <= shift_counter;
 
        case state is
            when start =>
                state_next <= shift;
                binary_next <= binary_in;
                bcds_next <= (others => '0');
                shift_counter_next <= 0;
            when shift =>
                if shift_counter = N then
                    state_next <= done;
                else
                    --Aqui concatena los primero 6 bits con un cero para completar
                    --el tamaño del vector
                    binary_next <= binary(N-2 downto 0) & 'L';
                    --Aqui recorre el registro y le concatena el msb de la entrada
                    bcds_next <= bcds_reg(10 downto 0) & binary(N-1);
                    shift_counter_next <= shift_counter + 1;
                end if;
            when done =>
                state_next <= start;
        end case;
    end process;
```

Una vez realizado el corrimiento de nuestro vector se realiza el segundo
paso mencionado anteriormente. Definimos la misma condición para cada
fragmento de 4 bits de nuestro dato.

``` {.vhdl frame="single" framesep="10pt"}
    bcds_reg(11 downto 8) <= bcds(11 downto 8) + 3 when bcds(11 downto 8) > 4 else
                             bcds(11 downto 8);
    bcds_reg(7 downto 4) <= bcds(7 downto 4) + 3 when bcds(7 downto 4) > 4 else
                            bcds(7 downto 4);
    bcds_reg(3 downto 0) <= bcds(3 downto 0) + 3 when bcds(3 downto 0) > 4 else
                            bcds(3 downto 0);
```

Se establece lo que se va a realizar en el ultimo estado, que es asignar
el resultado del algoritmo a un vector, este vector se divide por
segmentos de 4 bits y se le asigna a las salidas correspondientes.

``` {.vhdl frame="single" framesep="10pt"}
    bcds_out_reg_next <= bcds when state = done else
                         bcds_out_reg;
 
    bcd2 <= bcds_out_reg(11 downto 8);
    bcd1 <= bcds_out_reg(7 downto 4);
    bcd0 <= bcds_out_reg(3 downto 0);
```
