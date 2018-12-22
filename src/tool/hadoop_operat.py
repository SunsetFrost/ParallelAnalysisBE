from hdfs import *

def mkdir(client, path):
    client.makedirs(path)

def upload(client, start, end):
    srcPath = '/home/bowen/Parallel/data/IBIS/standard/params'
    targetPath = '/site/ibis/file/params/10'
    for i in range(start, end + 1):
        filename = str(i) + '.txt'
        client.upload(targetPath + '/' + filename, srcPath + '/' + filename)

def deleteFile(client, start, end):
    targetPath = '/site/ibis/file/params'
    for i in range(start, end + 1):
            filename = str(i) + '.txt'
            client.delete(targetPath + '/' + filename)

def createSeqFile(client, start, end):
    # hdfs package not support
    return

def main():
    client = Client("http://172.21.212.122:50070", root="/", session=False)
    # mkdir(client, '/site/ibis/file/params/10')
    upload(client, 1, 10)
    # deleteFile(client, 1, 10)

if __name__ == "__main__":
    main()