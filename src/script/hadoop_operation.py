from hdfs import *
client = Client("http://172.21.212.122:50070", root="/", session=False)
# print(client.list("/", status=True))
client.makedirs("/site/ibis/10")
client.upload("/site/ibis/10", "D:\\test.txt")
print(client.list("/site/ibis/10"))
