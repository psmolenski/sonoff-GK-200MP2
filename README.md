The goal of this project is to make SONOFF GK-200MP2 IP camera completely independent from eWlink servers.

## Goals
- [ ] set up RTSP stream without eWlink 
- [ ] set up WiFi connection without eWlink
- [ ] control motors without eWlink
- [ ] disable auto-update (if exists)
- [ ] make sure the camera does not communicate with any 3rd party servers

## Tasks
- [x] connect to serial port
- [x] access bootloader
- [x] dump flash memory
- [x] get root
- [x] get remote access (SSH/telnet/rsh)
- [ ] find a way to modify file system
- [ ] be able to get back to factory state
- [ ] identify all 3rd party processes

## Hardware

## Software 
### Bootloader
```
U-Boot 2012.10 (May 29 2019 - 11:20:26) for GK7102S dyzl-gk7102s-gc1034-v1.0 (GOKE)
```

### Operating system
```
/ # uname -a
Linux root 3.4.43-gk #27 PREEMPT Fri Sep 27 18:28:39 CST 2019 armv6l GNU/Linux
```

### BusyBox
```
/ # /gm/bin/busybox | head -n1
BusyBox v1.21.0 (2017-11-07 15:44:07 CST) multi-call binary.
```

### 3rd party processes
* IOTCare
* devctrl
* captive_server
* avencode
* netp2p
* colink
* AVRecorder
* AVRecSch
* AlarmServer
* ProcessGuard
* hwwdg (hardware watchdog?)
* ntpdate
* license

### Boot sequence
1. u-boot
2. kernel (zImage)
3. `/squasfs_init.sh`
4. mount filesystems
5. `mdev`
6. `busybox --install -s`
7. `sbin/init`  or `linuxrc`
8. `/etc/init.d/rc.sysinit`
9. `/boot.sh`
10. `/sd_upgrade.sh`
11. `/gm/bin/license`
12. `/gm/bin/netupdate`
13. `/mnt/mtd/ipc/script/boot.sh`
14. `/mnt/mtd/ipc/app/App.sh`
15. `getty -L ttySGK0 115200 vt100`

## Similar projects
https://github.com/EpicLPer/Sonoff_GK-200MP2-B_Dump
https://ramgattie.com/index.html

## Tools
https://ghidra-sre.org/
https://github.com/s-horiguchi/hexdump2bin

## How to access serial port
## How to access bootloader
## How to dump flash memory
## How to get local root
## How to get remote root

