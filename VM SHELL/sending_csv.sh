#!/bin/bash
while true
do
	sleep 10
	curl -F data=@dump-01.csv wifipersontracker.herokuapp.com/data
	echo "Sent file"
done
