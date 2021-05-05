Organización de la memoria


||Bus datos|Bus direc.|
|---|---|---|
|Flash|14 bits|13 bits|
|RAM (512 reg)|8 bits|9 bits|
|$\text{E}^2$PROM (256 reg)|8 bits|8 bits|

# Registros y bancos
|Registro|Dir|Registro|Dir|Registro|Dir|Registro|Dir|
|--------------------|-----|--------------------|-----|--------------------|-------|--------------------|------|
| INDF(1) | 00h | INDF(1) | 80h | INDF(1) | 100h  | INDF(1) | 180h |
| TMR0               | 01h | OPTION_REG         | 81h | TMR0               | 101h  | OPTION_REG         | 181h |
| PCL                | 02h | PCL                | 82h | PCL                | 102h  | PCL                | 182h |
| STATUS             | 03h | STATUS             | 83h | STATUS             | 103h  | STATUS             | 183h |
| FSR                | 04h | FSR                | 84h | FSR                |  104h | FSR                | 184h |
| PORTA              | 05h | TRISA              | 85h | WDTCON             | 105h  | SRCON              | 185h |
| PORTB              | 06h | TRISB              | 86h | PORTB              | 106h  | TRISB              | 186h |
| PORTC              | 07h | TRISC              | 87h | CM1CON0            | 107h  | BAUDCTL            | 187h |
| PORTD(2)           | 08h | TRISD(2)           | 88h | CM2CON0            | 108h  | ANSEL              | 188h |
| PORTE              | 09h | TRISE              | 89h | CM2CON1            | 109h  | ANSELH             | 189h |
| PCLATH             | 0Ah | PCLATH             | 8Ah | PCLATH             | 10Ah  | PCLATH             | 18Ah |
| INTCON             | 0Bh | INTCON             | 8Bh | INTCON             | 10Bh  | INTCON             | 18Bh |
| PIR1               | 0Ch | PIE1               | 8Ch | EEDAT              | 10Ch  | EECON1             | 18Ch |
| PIR2               | 0Dh | PIE2               | 8Dh | EEADR              | 10Dh  | EECON2(1)          | 18Dh |
| TMR1L              | 0Eh | PCON               | 8Eh | EEDATH             | 10Eh  | Reserved           | 18Eh |
| TMR1H              | 0Fh | OSCCON             | 8Fh | EEADRH             | 10Fh  | Reserved           | 18Fh |
|||||||||
| T1CON              | 10h | OSCTUNE            | 90h |                    | 110h  |                    | 190h |
| TMR2               | 11h | SSPCON2            | 91h |                    | 111h  |                    | 191h |
| T2CON              | 12h | PR2                | 92h |                    | 112h  |                    | 192h |
| SSPBUF             | 13h | SSPADD             | 93h |                    | 113h  |                    | 193h |
| SSPCON             | 14h | SSPSTAT            | 94h |                    | 114h  |                    | 194h |
| CCPR1L             | 15h | WPUB               | 95h |                    | 115h  |                    | 195h |
| CCPR1H             | 16h | IOCB               | 96h | General            | 116h  | General            | 196h |
| CCP1CON            | 17h | VRCON              | 97h | Purpose            | 117h  | Purpose            | 197h |
| RCSTA              | 18h | TXSTA              | 98h | Registers          | 118h  | Registers          | 198h |
| TXREG              | 19h | SPBRG              | 99h |                    | 119h  |                    | 199h |
| RCREG              | 1Ah | SPBRGH             | 9Ah | 16 Bytes           | 11Ah  | 16 Bytes           | 19Ah |
| CCPR2L             | 1Bh | PWM1CON            | 9Bh |                    | 11Bh  |                    | 19Bh |
| CCPR2H             | 1Ch | ECCPAS             | 9Ch |                    | 11Ch  |                    | 19Ch |
| CCP2CON            | 1Dh | PSTRCON            | 9Dh |                    | 11Dh  |                    | 19Dh |
| ADRESH             | 1Eh | ADRESL             | 9Eh |                    | 11Eh  |                    | 19Eh |
| ADCON0             | 1Fh | ADCON1             | 9Fh |                    | 11Fh  |                    | 19Fh |
|||||||||
|                    | 20h |                    | A0h |                    | 120h  |                    | 1A0h |
|                    |     | General            |     | General            |       | General            |      |
| General            | 3Fh | Purpose            |     | Purpose            |       | Purpose            |      |
| Purpose            | 40h | Registers          |     | Registers          |       | Registers          |      |
| Registers          |     |                    |     | 80 Bytes           |       | 80 Bytes           |      |
|                    |     | 80 Bytes           |     |                    |       |                    |      |
| 96 Bytes           | 6Fh |                    | EFh |                    | 16Fh  |                    | 1EFh |
|||||||||
|                    | 70h | accesses 70h-7Fh      | F0h | accesses 70h-      | 170h  | accesses 70h-7Fh      | 1F0h |
|                    | 7Fh | | FFh | | 17Fh  | | 1FFh |
|||||||||
|||||||||
|**Banco 0**||**Banco 1**||**Banco 2**||**Banco 3**||

1. El registro no existe físicamente