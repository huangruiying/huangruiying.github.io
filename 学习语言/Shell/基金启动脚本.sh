#!/usr/bin/env bash
JAVA_HOME="/home/work/soft/java8/"
APP_BASE="/huangry/project/"
APP_NAME="Aaa"

# 内存参数配置
MEM_OPTS="-Xms4096m \
-Xmx4096m \
-XX:MetaspaceSize=512m \
-XX:MaxMetaspaceSize=1024m \
-XX:+UseCompressedClassPointers \
-XX:CompressedClassSpaceSize=256m \
-Xss512k \
-Xmn2048m \
-XX:InitialCodeCacheSize=256m \
-XX:ReservedCodeCacheSize=512m \
-XX:MaxDirectMemorySize=256m"

PROD_MEM_OPTS="-Xms32g \
-Xmx32g \
-XX:MetaspaceSize=1024m \
-XX:MaxMetaspaceSize=1024m \
-XX:+UseCompressedClassPointers \
-XX:CompressedClassSpaceSize=1024m \
-Xss512k \
-Xmn12g \
-XX:InitialCodeCacheSize=1024m \
-XX:ReservedCodeCacheSize=2048m \
-XX:MaxDirectMemorySize=1024m"
# server启动参数-gc、错误相关
NORMAL_OPTS="-server \
-Dfile.encoding=UTF-8 \
-Dapp.name=${APP_NAME} \
-Dlogging.path=${APP_LOGS_DIR} \
-XX:+UseConcMarkSweepGC \
-XX:CMSInitiatingOccupancyFraction=75 \
-XX:+UseCMSInitiatingOccupancyOnly \
-XX:MaxTenuringThreshold=2 \
-XX:+PrintTenuringDistribution \
-XX:+PrintGCDetails \
-XX:+PrintGCDateStamps \
-XX:+PrintGCApplicationStoppedTime \
-XX:-OmitStackTraceInFastThrow \
-verbose:gc \
-Xloggc:${APP_LOGS_DIR}/gc.log \
-XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=128M \
-XX:+HeapDumpOnOutOfMemoryError \
-XX:HeapDumpPath=${APP_LOGS_DIR} \
-XX:ErrorFile=${APP_LOGS_DIR}/hs_err_pid%p.log "


DEBUG_PARAM="-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=$(($PORT+100)),suspend=n"
RUNTIME_OPTS="${MEM_OPTS} ${NORMAL_OPTS} -Denv=fat -Dapp.id=fund_engine -Dspring.profiles.active=test"
SERVER_PORT='-Dserver.port=8007'

exec ${JAVA_HOME}/bin/java ${DEBUG_PARAM} -jar ${RUNTIME_OPTS} ${APP_BASE}/${APP_NAME}.jar > /dev/null 2>&1 &