#!/usr/bin/env bash

DATABASE_HOST='10.157.122.43'
USER='payment_r'
PASSWORD='0QZ0v46B8AjHhv6'
PORT=8888

for i in {0..9}
do
        dbId="0${i}"
        for j in {0..9}
        do
                table="wms_db_${dbId}.t_pre_trans_${dbId}_${j}"
                sql="select * from ${table} where F_goods_id in (88100087) and F_state in (1,5)"
                echo $sql
                ./mysql -h${DATABASE_HOST} -u${USER} -p${PASSWORD} -P ${PORT} -e "$sql" >> temp.txt
        done
        sleep 1
done

for i in {10..99}
do
        dbId="${i}"
        for j in {0..9}
        do
                table="wms_db_${dbId}.t_pre_trans_${dbId}_${j}"
                sql="select * from ${table} where F_goods_id in (88100087) and F_state in (1,5) "
                echo $sql
                ./mysql -h${DATABASE_HOST} -u${USER} -p${PASSWORD} -P ${PORT} -e "$sql" >> temp.txt
        done
        sleep 1
done

# mysql -hdbbk-paylccoredb.siod-mdc.serv -ulinzhemin_dxm -p2v0DMSKAefmVqiG -P 6030 -e "$sql" >> temp.txt