#!/bin/bash

# master ip
IP=${1}

# slave index
Index=${2}

# start master
sudo docker rm -f slave${Index}-calc
echo "start calculate slave..."
sudo docker run -it \
            --name slave${Index}-calc \
            jupyter/all-spark-notebook:9f9e5ca8fe5a

# into master docker
sudo docker exec -it slave${Index}-calc /bin/bash

cd /usr/local/spark/
./sbin/start-slave.sh -h spark://${IP}:7077