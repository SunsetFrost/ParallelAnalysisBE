from hdfs import *
client = Client("http://172.21.213.170:50070", root="/", session=False)
# print(client.list("/", status=True))
# client.makedirs("/tmp/upload")
client.upload("tmp/upload", "D:\\Plan.txt")
print(client.list("/tmp/upload"))