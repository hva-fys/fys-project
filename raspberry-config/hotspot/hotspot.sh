#!/bin/sh

clear

echo "Welkom team 4! We gaan een hotspot maken!"
echo ""
echo "We gaan eerst even ethernet interface controleren..."

ETH_STATE=$(cat /sys/class/net/eth0/operstate)
if [ "$ETH_STATE" = "up" ]; then
   echo "Interface eth0 is beschikbaar!"
else
   echo "Interface eth0 is NIET beschikbaar. Check of je kabel goed is aangesloten"
   exit 1
fi;
echo ""
echo "Benodigde software installeren... Dit kan soms even duren..."
sudo apt-get install -y hostapd isc-dhcp-server > /dev/null
echo iptables-persistent iptables-persistent/autosave_v4 boolean true | sudo debconf-set-selections
echo iptables-persistent iptables-persistent/autosave_v6 boolean true | sudo debconf-set-selections
sudo apt-get install -y iptables-persistent > /dev/null
echo "Software geinstalleerd!"
echo ""
echo "Configuratiebestanden aanmaken..."
sudo cp -rf hostapd /etc/default/hostapd
sudo cp -rf hostapd.conf /etc/hostapd/hostapd.conf
sudo cp -rf dhcpcd.conf /etc/dhcpcd.conf
sudo cp -rf dhcpd.conf /etc/dhcp/dhcpd.conf
sudo cp -rf isc-dhcp-server /etc/default/isc-dhcp-server
sudo cp -rf init.d/hostapd /etc/init.d/hostapd
sudo cp -rf sysctl.conf /etc/sysctl.conf
sudo cp -rf rc.local /etc/rc.local
echo "Configuratiebestanden aangemaakt!"
echo ""
echo "DHCP en NAT regelen..."
sudo ifconfig wlan0 192.168.42.1
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
sudo sh -c "iptables-save > /etc/iptables/rules.v4"
echo "DHCP en NAT geregeld!"
echo ""
echo "Services starten..."
systemctl daemon-reload
sudo service hostapd start
sudo service isc-dhcp-server start 2> /dev/null
sudo update-rc.d hostapd enable
sudo update-rc.d isc-dhcp-server enable
echo "Services gestart!"
echo ""
echo "We gaan rebooten, hierna zou je hotspot moeten werken. Laters!"
sleep 5
sudo reboot
