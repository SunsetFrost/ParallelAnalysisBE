"""
hdfs包操作HDFS
"""

import sys
from hdfs import *

# 命令行参数
HADOOP_URL = sys.argv[1]   # "http://172.21.212.122:50070"
SRC_DIR = sys.argv[2]      # '/home/bowen/Parallel/data/IBIS/standard/params'
TARGET_DIR = sys.argv[3]   # '/site/ibis/file/params/10'

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

def createSeqFile(client, start, end):
    # hdfs package not support
    return

def main():
    client = Client(HADOOP_URL, root="/", session=False)
    # mkdir(client, '/site/ibis/file/params/10')
    uploadBySiteIndex(client, 1, 10)
    # deleteBySiteIndex(client, 1, 10)

if __name__ == "__main__":
    main()