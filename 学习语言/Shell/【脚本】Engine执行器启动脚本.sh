# 启动项目
#!/bin/sh
# $1 : 项目所在文件夹
# $2 : 项目启动端口

# 项目所在文件夹
PROJECT_FOLDER=$1
SERVER_PORT=$2



unCompress(){
    echo "1"
}
unCompress



# volidate
if [ "$PROJECT_FOLDER"x == ""x ]; then
   echo "Error! project folder can't null"
   exit
fi
if [ "$SERVER_PORT"x == ""x ]; then
   echo "Error! project port can't null"
   exit
fi


# build jar path
JAR_PATH='/home/'$USER'/huangruiying/engine-executor/'$PROJECT_FOLDER'/engine-executor.jar'

# kill old project
pid=$(ps -ef |grep $JAR_PATH | grep 'java -jar'| awk -F ' '  '{print $2}')
`kill -9 $pid`
echo 'killed :'$pid

# choose eureka
# yc-fsgqa-licai-vm06-01.epc.duxiaoman.com  10.157.122.71
EUREKA_URL='cp01-fsgqa-vm02.epc.baidu.com'

# init port
declare -i XXL_EXEC_PORT=$SERVER_PORT+1
declare -i DEBUG_PORT=$XXL_EXEC_PORT+1

# init run parameter
RUN_OPTIONS='-Xms1024m -Xmx1024m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=512m -XX:+UseCompressedClassPointers -XX:CompressedClassSpaceSize=256m -Xss256k -Xmn512m -XX:InitialCodeCacheSize=128m -XX:ReservedCodeCacheSize=256m -XX:MaxDirectMemorySize=128m'
XXL_ADDRESS='-Dxxl.job.admin.addresses=http://yq01-fpd-licai-22.epc.baidu.com:8890'
XXL_TARGET='-Dxxl.job.executor.appname=qa-engine-executor'
ENV='-Denv=fat'
APP_NAME='-Dapp.name=engine-executor'
APP_ID='-Dapp.id=100033'
SERVER_PORT='-Dserver.port='$SERVER_PORT
XXL_EXEC_CONFIG=' -Dxxl.job.executor.port='$XXL_EXEC_PORT
EUREKA='-Deureka.serviceUrl.default=http://licai:licai@'$EUREKA_URL':8761/eureka/'
EUREKA='-Deureka.client.serviceUrl.defaultZone=http://licai:licai@'$EUREKA_URL':8761/eureka/'
EUREKA='-Deureka.serviceUrl.default=http://licai:licai@10.157.89.21:8761/eureka/'
EUREKA='-Deureka.client.serviceUrl.defaultZone=http://licai:licai@10.157.89.21:8761/eureka/'
DEBUG_CONFIG='-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address='$DEBUG_PORT





# run
`nohup /home/$USER/jdk1.8.0_131/bin/java -jar $RUN_OPTIONS $XXL_ADDRESS $XXL_TARGET $ENV $APP_NAME $APP_ID $SERVER_PORT $XXL_EXEC_CONFIG $EUREKA $DEBUG_CONFIG $JAR_PATH >/dev/null  2>&1  &`

echo '======== RUNNING ======='
echo 'project        port :'$SERVER_PORT
echo 'execute center port :'$XXL_EXEC_PORT
echo 'debug          port :'$DEBUG_PORT




## RUNTIME_OPTS="${RUNTIME_OPTS} -Deureka.serviceUrl.default=http://licai:licai@${EureksServiceIpPort}:8761/eureka/"
## RUNTIME_OPTS="${RUNTIME_OPTS} -Deureka.client.serviceUrl.defaultZone=http://licai:licai@${EureksServiceIpPort}:8761/eureka/"













