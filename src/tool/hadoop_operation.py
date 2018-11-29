from hdfs import *

def mkdir(client, path):
    client.makedirs(path)

def upload(client, start, end):
    srcPath = '/home/bowen/Parallel/data/IBIS/standard/sites'
    targetPath = '/site/ibis/file/sites'
    for i in range(start, end + 1):
        filename = str(i) + '_proced.csv'
        client.upload(targetPath + '/' + filename, srcPath + '/' + filename)

def createSeqFile(client, start, end):
    # hdfs package not support

def main():
    client = Client("http://172.21.212.122:50070", root="/", session=False)
    upload(client, 1, 10000)
    print(client.list("/site/ibis/file/sites"))

if __name__ == "__main__":
    main()