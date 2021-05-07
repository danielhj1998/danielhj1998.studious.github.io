# MPASM
[MPASM](https://www.microchip.com/en|us/development|tools|tools|and|software/mplab|xc|compilers#MPLAB%20XC%20Compiler%20Choices)  es el compilador de Microchip. Su documentación se encuentra [aquí](http://ww1.microchip.com/downloads/en/devicedoc/33014j.pdf).
## Directivas
There are six basic types of directives provided by the assembler:
1. Control Directives
2. Conditional Assembly Directives
3. Data Directives
4. Listing Directives
5. Macro Directives
6. Object File Directives

### Directivas de control
Control directives control how code is assembled.
|Directiva|Descripccion|
|-|-|
|#define | Define a Text Substitution Label|
|#include | Include Additional Source File |
|#undefine | Delete a Substitution Label|
|constant | Declare Symbol Constant |
|end | End Program Block|
|equ | Define an Assembler Constant |
|org | Set Program Origin |
|processor | Set Processor Type |
|radix | Specify Default Radix |
|set | Define an Assembler Variable |
|variable | Declare Symbol Variable|

### Directivas ensamblado condicional
Permite ensamblar bloques de código condicionalmente. Define que código será ensamblado.

|Directiva|Descripccion|
|-|-|
|else | Begin Alternative Assembly Block to if Conditional|
|endif | End Conditional Assembly Block|
|endw | End a while Loop |
|if | Begin Conditionally Assembled Code Block |
|ifdef | Execute If Symbol has Been Defined |
|ifndef | Execute If Symbol has not Been Defined|
|while | Perform Loop While Condition is True|

### Directivas de datos
Controlan la locación de memoria y proveen una forma de hacer referencia a los datos de manera simbólica.

|Directiva|Descripccion|
|-|-|
|\_\_badram | Identify Unimplemented RAM |
|\_\_badrom | Identify Unimplemented ROM|
|\_\_config | Set Processor Configuration Bits (datasheet 14.1)|
|config | Set Processor Configuration Bits (PIC18 MCUs) |
|\_\_idlocs | Set Processor ID Locations |
|\_\_maxram | Define Maximum RAM Location |
|\_\_maxrom | Define Maximum ROM Location |
|cblock | Define a Block of Constants |
|da | Store Strings in Program Memory (PIC12/16 MCUs) |
|data | Create Numeric and Text Data |
|db | Declare Data of One Byte |
|de | Declare EEPROM Data Byte |
|dt | Define Table (PIC12/16 MCUs)|
|dw | Declare Data of One Word|
|endc | End an Automatic Constant Block |
|fill | Specify Program Memory Fill Value |
|res | Reserve Memory |

### Directivas de listado
Controlan el formato de listado de registros dle ensamblador. Estas directivas permiten la especificación de titulos, paginación y otros controles de listado.

|Directiva|Descripccion|
|-|-|
|error | Issue an Error Message|
|errorlevel | Set Message Level|
|list | Listing Options |
|messg | Create User Defined Message|
|nolist | Turn off Listing Output |
|page | Insert Listing Page Eject |
|space | Insert Blank Listing Lines |
|subtitle | Specify Program Subtitle |
|title | Specify Program Title|

### Directivas macro
Controlan la execución y locación de datos con definiciones macro.
|Directiva|Descripccion|
|-|-|
|endm | End a Macro Definition|
|exitm | Exit from a Macro|
|expand | Expand Macro Listing |
|local | Declare Local Macro Variable |
|macro | Declare Macro Definition|
|noexpand | Turn off Macro Expansion|

### Directivas de archivos de objeto
Se usan solo al crear un archivo de objeto
|Directiva|Descripccion|
|-|-|
|access_ovr | Begin an Object File Overlay Section in Access RAM (PIC18 MCUs) |
|bankisel | Generate Indirect Bank Selecting Code (PIC12/16 MCUs)|
|banksel | Generate Bank Selecting Code |
|code | Begin an Object File Code Section |
|code_pack | Begin an Object File Packed Code 
|  Section (PIC18 MCUs) |
|extern | Declare an Externally Defined Label |
|global | Export a Label|
|idata | Begin an Object File Initialized Data Section |
|idata_acs | Begin an Object File Initialized Data Section 
|  in Access RAM (PIC18 MCUs) |
|pagesel | Generate Page Selecting Code (PIC10/12/16 MCUs) |
|pageselw | Generate Page Selecting Code Using WREG Commands (PIC10/12/16 MCUs) |
|udata | Begin an Object File Uninitialized Data Section|
|udata_acs | Begin an Object File Access Uninitialized Data Section (PIC18 MCUs) |
|udata_ovr | Begin an Object File Overlaid Uninitialized Data Section|
|udata_shr | Begin an Object File Shared Uninitialized Data Section (PIC12/16 MCUs) |
# GPASM
Es el compilador de GNU, viene por lo general en distribuciones Linux.