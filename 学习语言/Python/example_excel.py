# excel 操作示例
# xlrd.biffh.XLRDError: Excel xlsx file; not supported : 版本过高 应该 pip3 install xlrd==1.2.0
import xlrd


book = xlrd.open_workbook("/Users/nenglianjituan/Downloads/temp/执行结果3.xlsx")
print("工作表[sheet]的数量",book.nsheets)
print("工作表[sheet]名字为: {0}".format(book.sheet_names()))

# 获取第一张工作表
sh = book.sheet_by_index(0)
# 当前表总行数
print("当前sheet [name]: {0} 总行数[rows]: {1} 总列数[cols]: {2}".format(sh.name, sh.nrows, sh.ncols))
# 遍历每一行
for r in range(sh.nrows):
    # 遍历每一列
    for c in range(sh.ncols):
        # 单元格的值
        letter = str(sh.cell_value(rowx=r, colx=c))
        if letter != None and letter != '' :
            # 值不为空
        else:
            # 值为空








