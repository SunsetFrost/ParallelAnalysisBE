"""
spark操作hadoop准备数据
生成样本sequence file
"""
import sys
from pyspark.sql import SparkSession

# 命令行参数
APPNAME = sys.argv[1]
HADOOP_URL = sys.argv[2]  # hdfs://172.21.212.122:9000
INPUT_DIR = sys.argv[3]   # /site/ibis/file/sites
OUTPUT_DIR = sys.argv[4]  # /site/ibis/seqFile/10000

if __name__ == "__main__":
    spark = SparkSession\
        .builder\
        .appName(APPNAME)\
        .getOrCreate()

    sc = spark.sparkContext
    rdd = sc.wholeTextFiles(inputDir)
    # rdd.saveAsSequenceFile(outputFile)

    m = rdd.collectAsMap()

    print(rdd)
    # print(m[2])
    spark.stop()