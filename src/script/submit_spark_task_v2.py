"""
调用模型并行计算
1 从Hadoop提取数据并转换为输入数据
2 通过Wine调用window模型
3 结果数据保存至Hadoop
"""

import sys
import os
import subprocess
import shutil
from pyspark.sql import SparkSession

# 命令行参数
INSTANCE_ID = sys.argv[1]

HADOOP_URL = 'hdfs://10.36.0.2:9000'  # hdfs://10.36.0.2:9000
HADOOP_INPUT_DIR =  HADOOP_URL + '/site/ibis/seqFile'
HADOOP_OUTPUT_DIR = HADOOP_URL + '/instance/' + INSTANCE_ID
# OUTPUT_DIR = '/home/bowen/Parallel/instance'
OUTPUT_DIR = '/home/jovyan/instance/' + INSTANCE_ID
MODEL_PATH = '/home/jovyan/model/IBIS/IBIS.exe'

# 运算的站点列表
calcList = ['2', '3', '5']

# 返回实际需要计算的站点RDD
def filterCalcParamList(hdfsObj):
    # 获取站点索引
    hdfsIndex = hdfsObj[0]    
    hdfsList = hdfsIndex.split('/')
    siteIndex = hdfsList[len(hdfsList) - 1].split('.')[0]

    isCalcIndex = calcList.count(siteIndex)
    if isCalcIndex == 0:
        return False
    else:
        return True

def filterCalcSiteList(hdfsObj):
    # 获取站点索引
    hdfsIndex = hdfsObj[0]    
    hdfsList = hdfsIndex.split('/')
    siteIndex = hdfsList[len(hdfsList) - 1].split('_')[0]

    isCalcIndex = calcList.count(siteIndex)
    if isCalcIndex == 0:
        return False
    else:
        return True        

def siteIndexStandized(Obj):
    hdfsIndex = Obj[0]    
    hdfsList = hdfsIndex.split('/')
    index = hdfsList[len(hdfsList) - 1].split('_')[0]

    return [index, Obj[1]]

def paramIndexStandized(Obj):
    hdfsIndex = Obj[0]    
    hdfsList = hdfsIndex.split('/')
    index = hdfsList[len(hdfsList) - 1].split('.')[0]
    return [index, Obj[1]]   

# RDD内存数据转换为本地文本数据
def rdd2file(Obj):
    siteContent = Obj[1][0]
    paramContent = Obj[1][1]

    baseDir = OUTPUT_DIR + '/' + Obj[0]
    os.makedirs(baseDir)

    sitePath = baseDir + '/site.csv'
    with open(sitePath, 'w') as f:
        f.write(siteContent)

    paramPath = baseDir + '/param.txt'
    with open(paramPath, 'w') as f:
        f.write(paramContent)

    return

# 调用模型生成结果数据
def invokeModel(Obj):
    index = Obj[0]
    sitePath = OUTPUT_DIR + '/' + index + '/site.csv'
    outputPath = OUTPUT_DIR + '/' + index + '/output.txt'
    paramPath = OUTPUT_DIR + '/' + index + '/param.txt'
    subprocess.call('wine ' + MODEL_PATH + ' -i=' + sitePath + ' -o=' + outputPath + ' -s=' + paramPath, shell=True)
    return

# 结果数据转化为RDD
def outputFile2RDD(Obj):
    baseDir = OUTPUT_DIR + '/' + INSTANCE_ID + '/' + Obj[0]
    outputPath = baseDir + '/param.txt'

    outputContent = ''
    with open(outputPath, 'r') as f:
        outputContent = f.read()

    return (Obj[0], outputContent)

# 计算
def calc(Obj):
    # rdd2file
    siteContent = Obj[1][0]
    paramContent = Obj[1][1]

    baseDir = OUTPUT_DIR + '/' + Obj[0]
    os.makedirs(baseDir)

    sitePath = baseDir + '/site.csv'
    with open(sitePath, 'w') as f:
        f.write(siteContent)

    paramPath = baseDir + '/param.txt'
    with open(paramPath, 'w') as f:
        f.write(paramContent)

    # invoke model
    index = Obj[0]
    outputPath = OUTPUT_DIR + '/' + index + '/output.txt'
    subprocess.call('wine ' + MODEL_PATH + ' -i=' + sitePath + ' -o=' + outputPath + ' -s=' + paramPath)

    # 结果数据转化为RDD
    outputContent = ''
    with open(outputPath, 'r') as f:
        outputContent = f.read()

    return (Obj[0], outputContent)

# 清除中间缓存
def clearCache(Obj):
    baseDir = OUTPUT_DIR + '/' + Obj[0]
    shutil.rmtree(baseDir)
    return

if __name__ == "__main__":
    spark = SparkSession\
        .builder\
        .appName(INSTANCE_ID)\
        .getOrCreate()

    sc = spark.sparkContext
    sc.setLogLevel("ERROR")

    siteInputDir = HADOOP_INPUT_DIR + '/10000_sites'
    ParamInputDir = HADOOP_INPUT_DIR + '/10000_params'
    # 分割数据
    rddSiteInput = sc.sequenceFile(siteInputDir)
    rddParamInput = sc.sequenceFile(ParamInputDir)
    # filter
    rddCalcSiteInput = rddSiteInput.filter(filterCalcSiteList)
    rddCalcParamInput = rddParamInput.filter(filterCalcParamList)
    # trans keyvalue
    rddCalcSiteStandInput = rddCalcSiteInput.map(siteIndexStandized)
    rddCalcParamStandInput = rddCalcParamInput.map(paramIndexStandized)
    # join two rdd
    rddCalcInput = rddCalcSiteStandInput.join(rddCalcParamStandInput)
    #calculate
    rddOutput = rddCalcInput.map(calc)

    # rddCalcInput.foreach(rdd2file)
    # rddCalcInput.foreach(invokeModel)
    # rddOutput = rddCalcInput.map(outputFile2RDD)

    outputPath = HADOOP_OUTPUT_DIR + '/output'
    rddOutput.saveAsSequenceFile(outputPath)

    # rddOutput.foreach(clearCache)  出错  运行提前

    print(rddOutput.collect())

    spark.stop()