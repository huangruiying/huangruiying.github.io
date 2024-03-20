#!/usr/bin/env bash
# 结果输出位置
output_file="result_券商融合三期"
# 今日 yyyyMMdd格式日期
date_str=$(date '+%Y%m%d')
# 上行款监管文件
# 百付宝要划的钱
# 退款监管文件
#
#



broker_sql=("select amount from inner_detail_20220304 where batch_no='hundsun_broker_export_bfb_apply_spdbank_20220304' ;" "select amount from inner_detail_20220304 where batch_no='hundsun_broker_export_baiying_refund_spdbank_20220304' ;")
fund_sql=("select amount from engine_detail_20220304 where batch_no='hundsun_broker_export_bfb_apply_file_20220304' ;" "select amount from engine_detail_20220304 where batch_no='hundsun_broker_export_baiying_refund_file_20220304' ;")


for broker_item in ${broker_sql[@]};
# 遍历数组
do
    echo ${broker_item}
done


# 券商
# mysql '-h10.157.122.43' '-P8307' '-urecon_r'   '-pX9K31hT5qh2PI2I' paylcengine -s -e"${broker_sql}" >> "${output_file}"

# 基金
# mysql '-hdbbk-fpdfundsale.siod-mdc.serv' '-uv_huangruiying_dxm' '-pQEmeZDJrjoAmfCR' '-P5100' db_fund_engine -s -e"${fund_sql}" "${output_file}"


#上行款监管文件
#退款监管文件
#划款指令()
#select * from inner_detail_20220311 where batch_no='hundsun_broker_export_bfb_apply_spdbank_20220311' ;
#select sum(amount) from inner_detail_20220311 where batch_no='hundsun_broker_export_bfb_apply_spdbank_400101_20220311' and extension like '%payChannel":"1%' ;
#select sum(amount) from inner_detail_20220311 where batch_no='hundsun_broker_export_bfb_apply_spdbank_400101_20220311' and extension like '%payChannel":"2%' ;
#select * from inner_detail_20220311 where batch_no='hundsun_broker_export_baiying_refund_spdbank_20220311' ;
#select * from inner_detail_20220311 where batch_no='hundsun_broker_baiying_transfer_fund_nofity_20220311' ;
