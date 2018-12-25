"""
hdfs包操作HDFS
"""

import sys
from hdfs import *

# 命令行参数
HADOOP_URL = 'http://10.36.0.2:50070'   # 'http://172.21.212.122:50070'
SRC_DIR = '/home/bowen/Parallel/data/IBIS/standard/params'      # '/home/bowen/Parallel/data/IBIS/standard/params'
TARGET_DIR = '/site/ibis/file/params'   # '/site/ibis/file/params/10'

def mkdir(client, path):
    client.makedirs(path)

def uploadBySiteIndex(client, start, end):
    srcPath = SRC_DIR
    targetPath = TARGET_DIR
    for i in range(start, end + 1):
        filename = str(i) + '.txt'
        client.upload(targetPath + '/' + filename, srcPath + '/' + filename)

def deleteBySiteIndex(client, start, end):
    targetPath = TARGET_DIR
    for i in range(start, end + 1):
        filename = str(i) + '.txt'
        client.delete(targetPath + '/' + filename)

def deleteDir(client):
        client.delete('/site/ibis/seqFile/10_sites', True)

def rename(client):
        srcPath = '/site/ibis/seqFile/10000'
        dstPath = '/site/ibis/seqFile/10000_sites'
        client.rename(srcPath, dstPath)

def main():
    client = Client(HADOOP_URL, root="/", session=False)

    mkdir(client, '/log')
    # uploadBySiteIndex(client, 1, 10000)
    # deleteBySiteIndex(client, 1, 10)
    # deleteDir(client)
    # rename(client)


if __name__ == "__main__":
    main()