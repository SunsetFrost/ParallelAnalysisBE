"""
spark操作hadoop准备数据
生成样本sequence file
"""
import sys
from pyspark.sql import SparkSession

# 命令行参数
APPNAME = sys.argv[1]
HADOOP_URL = 'hdfs://10.36.0.2:9000'  # hdfs://172.21.212.122:9000
INPUT_DIR = '/site/ibis/file/params'   # /site/ibis/file/sites
OUTPUT_PATH = '/site/ibis/seqFile/10000_params'  # /site/ibis/seqFile/10000

def getTargetSites(indexList):
    return

if __name__ == "__main__":
    spark = SparkSession\
        .builder\
        .appName(APPNAME)\
        .getOrCreate()

    sc = spark.sparkContext

    inputDir = HADOOP_URL + INPUT_DIR
    outputDir = HADOOP_URL + OUTPUT_DIR

    rdd = sc.wholeTextFiles(inputDir)
    rdd.saveAsSequenceFile(outputDir)

    m = rdd.collect()

    print(m)

    spark.stop()