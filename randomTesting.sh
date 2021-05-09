count=`ls test | wc -l`
i=1

while true
do
	randomNumber=`shuf -i 0-$count -n 1`
	
	for file in `ls test`
	do
		if [ $i == $randomNumber ]
		then
			curl -F data=@test/$file wifipersontracker.herokuapp.com/data
			sleep 10
		fi
		
		i=`expr $i + 1`
	done
	i=1
done

