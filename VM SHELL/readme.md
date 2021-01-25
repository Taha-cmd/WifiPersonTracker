# Wifi Personen Tracker RaspberyyPi
## Requirments
- Raspberry Pi with a Linux Distribution
- An intigrated or extern Wlan Adapter that supportes monitoring
- The two shell scripts *airodump_start* and *sending_csv*

## Execution
- First you will need to exeute *airodum_start* to create a new lan interface in monitor mode and start airodump-ng
- Open a Terminal and write
	./airodump_start.sh
- Now you will find a csv file that has been newly created by the shell script. 
- You will need to send the file to our API using the second shell script *sending_csv.sh*
	./sending_csv.sh
- The csv file updates every 10 seconds with new data and is sent to the API.
