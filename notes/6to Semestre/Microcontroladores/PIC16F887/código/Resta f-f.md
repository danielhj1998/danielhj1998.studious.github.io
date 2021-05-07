El siguiente código hace la resta de ($0x20 - $0x21) => $0x22
```
MOVF 	0X21,W
SUBWF	0X20,W
BTFSS 	STATUS,C
SUBLW	0x00
MOVWF 	0X22
```