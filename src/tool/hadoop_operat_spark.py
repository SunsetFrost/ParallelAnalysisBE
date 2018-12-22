"""
spark 操作 hadoop准备数据
生成样本sequence file
"""
import sys

from pyspark.sql import SparkSession

baseDir = "hdfs://172.21.212.122:9000"
# inputDir = "/site/ibis/file/sites"
# outputFile = "/site/ibis/seqFile/10000"
inputDir = "/site/ibis/file/params/10"
outputFile = "/site/ibis/seqFile/10_sites"

if __name__ == "__main__":
    spark = SparkSession\
        .builder\
        .appName("File2Sequence")\
        .getOrCreate()

    sc = spark.sparkContext
    rdd = sc.wholeTextFiles(inputDir)
    # rdd.saveAsSequenceFile(outputFile)

    m = rdd.collectAsMap()

    print(rdd)
    # print(m[2])
    spark.stop()