#!/usr/bin/env bash
# unzip
output=$(ls -tl | grep "output.tgz" | grep ^- | awk -F ' ' '{print $9}' | sed -n '1,1p')
echo "will unzip package :"${output}
tar -xvf ${output}
cp output/fund-engine.jar .


JAVA_HOME=/home/work/soft/java8/
APP_NAME=fund-engine
APP_DIR=/home/work/app/
APP_BASE=${APP_DIR}${APP_NAME}
APP_LOGS_DIR=${APP_BASE}/logs
PORT=8010
SERVER_PORT="-Dserver.port=${PORT}"
DEBUG_PARAM="-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=$(($PORT+100)),suspend=n"
APP_BNS=fund-engine.licai-licai
APP_PID=$(ps -ef | grep ${APP_BASE}/${APP_NAME}.jar | grep -v grep | awk '{ print $2 }')

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


check_tomcat_startup(){
    RESP_CODE=1;
    GREP_COUNT=40;
    sleep 3s

    echo "find \"Server startup\" in  ~/${APP_NAME}/logs/"

    while [[ "${RESP_CODE}" != 0 ]]
    do
       CHECK_RESULT=`curl -s -X GET http://localhost:${PORT}/operation/health`
       RESP_CODE=$?
       GREP_COUNT=$[GREP_COUNT - 1];

       if [[ "${CHECK_RESULT}"x != "0"x ]]; then
            printf "\033\e[33m${APP_NAME}:${PORT} has not been started yet,grep_count=${GREP_COUNT}\033\e[0m\r"
       else
	    printf "\n\r \033[32mService OK!\033[0m \n\r"
	    exit 0
       fi

       if [[ "${GREP_COUNT}" == 0 ]];then
            echo -e "\033[31m Start ${APP_NAME}:${PORT} Time Out \033[0m"
            exit 1
       fi
       sleep 3s
    done
}


echo_application_info(){
    echo port is ${PORT}
    echo app name is ${APP_NAME}
    echo app base is ${APP_BASE}
    echo app log dir is ${APP_LOGS_DIR}
}
echo_application_info


# shutdown.sh
echo stop application:${APP_NAME}...
if [[ -z "$APP_NAME" ]]
then
 echo Not allowed with illegal APP_NAME
    exit -1
fi
if [[ -z "$APP_PID" ]]
then
 echo Application is already stopped
else
 echo -e "Kill project ${APP_BASE}/${APP_NAME}.jar ; final kill pid=" ${APP_PID}
 kill -9 ${APP_PID};
 sleep 10s
fi


# start.sh
echo start application:${APP_NAME}...
RUNTIME_OPTS="${MEM_OPTS} ${NORMAL_OPTS} -Denv=fat -Dapp.id=fund_engine -Dspring.profiles.active=test"
exec ${JAVA_HOME}/bin/java ${DEBUG_PARAM} -jar ${RUNTIME_OPTS} ${SERVER_PORT} ${APP_BASE}/${APP_NAME}.jar > /dev/null 2>&1 &



# check
echo check service
check_tomcat_startup
