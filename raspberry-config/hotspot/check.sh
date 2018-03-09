#!/bin/sh

ETH_STATE=$(cat /sys/class/net/eth0/operstate)
if [ "$ETH_STATE" = "up" ]; then
   echo "Interface eth0 is beschikbaar"
else
   echo "Interface eth0 is NIET beschikbaar. Check of je kabel goed is aangesloten"
fi;