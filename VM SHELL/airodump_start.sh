#!/bin/sh
sleep 10s
sudo iw phy phy0 interface add mon0 type monitor
sudo airmon-ng start mon0
sudo airodump-ng --channel 1-13,36-165 --write dump --output-format csv mon0

