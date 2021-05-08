---
layout: note
---

# Windows
To use the Xilinx ISE Design Suite command line we need to open the CMD and run the `settings64.bat` or `settings32.bat` from the ISE directory in Windows, the default is `C:\gXilinx\14.7\ISE_DS\`.

This is automatically done by the **ISE Design Suite 64 Bit Command Prompt** installed when installing Xilinx ISE.

## Using the TCL shell
ISE Design Suite for Windows can be used via de TCL shell, this environment is entered by the `xtclsh` from the command line.

* `help {command}` Gets help for the command
	* `help {command} {subcommand}` Example: `help project new`
* `set {name} {value}` Sets a variable
	* `${name}` Access variable
* `{command} {argument}` Invoke a command with arguments.
	
	
## Managing projects
* `project` Manage ISE projects
	* `new` Create a new project
	* `open` Opens an existing project (each time we open a project, we have to close it before leaving `xtclsh`)
	* `close` Closes the project
	* `clean` Removes de projects temporary and automatically-generated files (restart implementation from scratch)

### Creating a project 
```tcl
% project new keypad
% ls
keypad.xise  keypad.gise
```

### Configuring a project
We are now ready to configure the project.  We begin by setting the device properties for our new project:

```tcl
% project set family spartan3e
Spartan3E
```

Before setting the device, let's check out the old value to see what to expect as a return value when assigning a new device:

```tcl
% project get device
xc3s100e
```

Shows that the current device is an xc3s100e.  Now, set the device:

```
% project set device xc3s500e
xc3s500e
```

and ignore the (expected) return value.  Next, set the package:

```
% project set package fg320
fg320
```

Finally we set the project preferred language:

```
% project set preferred-language VHDL
VHDL
```

You can examine the project properties with the `project properties` subcommand.

### Managing a project

To manage files in a project, we need to use the `xfile` tool.

To **add** files to a project:
```tcl
% xfile add Decoder.vhd
INFO:HDLCompiler:1061 - Parsing VHDL file
   "C:/Users/Cori/Documents/Tareas/6to_semestre/DLPs/Practica2_keypad/keypad/Dec
   oder.vhd" into library work
INFO:ProjectMgmt - Parsing design hierarchy completed successfully.
true
```

To **remove** files from a project:
```tcl
% xfile remove Decoder.vhd
true
```

### Implementing a design
Design implementations can be runned with the command `process run "{Process name}". Next there is a list of the most used processes:
* `Check Syntax` Check for sytax
* `Synthesize - XST` 
* `View Locked Pin Constraints` Genereates `.lpc` file which is the actuall implementation of the pins done when implementing the design
* `Implement Design` Implement design, without generating the bitstream/programming file
* `Generate Programming File` Generate the programming file
#### Options
* `-force` Remove automatically generated design files from working directory
* `rerun_all` Rerun process
### Creating an IP Core
We need to use de `coregen` utility, for using it with the command line run:
```
coregen -b <commnad_file_name> -p <project_path>
```
# References
* http://strumpen.net/xilinx/tut82i/ise.html#refs
* https://www.xilinx.com/support/answers/22124.html