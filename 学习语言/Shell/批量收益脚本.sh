#!/bin/bash
#
# Eg: sh this.sh [product] [sub] [days] [ip] [port]
# product:产品号
# sub:当前日期向后推几天，-1 向前推一天 1 向后推一天
# days:执行周期的总天数
# ip:执行器地址
# port:执行器注册到调度中心的端口
#
# 当前日期2019-12-12
# 执行sh this.sh 0 31时，跑的是2019-12-13为起始日的批处理程序
#
product=$1
sub=$2
days=$3
ip=$4
port=$5
# 执行器任务id
jobid=$6
for((i=1;i<=$days;i++));
do
    # cul add days
    declare -i result=$i+$sub
    # start date : tommorow
    dateStr=$(date -d "+$result days" '+%Y%m%d000000');
    # mac
    # dateStr=$(date -v+"$result"d "+ %Y%m%d000000");
    # show log
    echo -e "\n""\033[0m""跑批日>>""\033[36m"$dateStr"\033[0m" "请求参数>> jobId=$jobid&executorParam=product%3d"$product"%26staticRoute%3d$ip%3a$port%26date%3d$dateStr \033[32m"
    sleep 3s
    # send request
    curl -d "jobId=$jobid&executorParam=product%3d$product%26staticRoute%3d10.92.181.54%3a$port%26date%3d$dateStr" "http://xxxxxxx:8890/services/trigger"
    sleep 7s
done

echo -e "\n""\033[0m""-- DONE --"



#调用脚本姿势
##!/bin/sh
#
#sh /home/p2p/huangruiying/engine-executor/profit.sh 87023700 $1 $2 10.60.64.28 8681 119










