#!/bin/bash

# master ip
IP=${1}

# start master
sudo docker rm -f master-calc
echo "start calculate master..."
sudo docker run -it \
            --name master-calc \
            jupyter/all-spark-notebook:9f9e5ca8fe5a

# into master docker
sudo docker exec -it master-calc /bin/bash

cd /usr/local/spark/
./sbin/start-master.sh -h $IP