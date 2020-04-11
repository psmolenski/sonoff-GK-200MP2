The goal of this project is to make SONOFF GK-200MP2 IP camera completely independent from eWlink servers.

## Goals
- [ ] set up RTSP stream without eWlink
- [ ] control motors without eWlink
- [ ] disable auto-update (if exists)

## Tasks
- [ ] connect to serial port
- [ ] access bootloader
- [ ] dump flash memory
- [ ] get root
- [ ] get remote access (SSH/telnet/rsh)
- [ ] find a way to modify file system
- [ ] be able to get back to factory state

## Hardware

## Software 
### Bootloader
TODO

### Operating system
TODO

### BusyBox
```bash
/ # /gm/bin/busybox | /gm/bin/busybox head -n1
BusyBox v1.21.0 (2017-11-07 15:44:07 CST) multi-call binary.
```

### Boot sequence
TODO