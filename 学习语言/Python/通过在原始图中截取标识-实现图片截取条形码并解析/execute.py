import aircv
import cv2
from PIL import Image, ImageEnhance
import pyzbar.pyzbar as pyzbar

# 进行图片的匹配 返回结果中准确率最高的一个的信息
def match_pic_one(img_source, img_target):
    """
        进行图片的匹配
        判断img_target是否在img_source内出现，若存在则提供在图片img_source中的位置
        返回圆心、左上、右下坐标
    """
    imsrc = aircv.imread(img_source)
    imobj = aircv.imread(img_target)
    pos = aircv.find_template(imsrc, imobj, rgb=True, bgremove=True)
    if not pos:
        return None, None, None, None

    left_top = pos['rectangle'][0]  # 左上
    right_bottom = pos['rectangle'][3]  # 右下
    circle_center_pos = pos['result']  # 中心点坐标
    circle_center_pos = tuple(map(int, circle_center_pos))
    confidence = pos['confidence'] # 准确率
    print('准确率:', confidence)
    #print(circle_center_pos)  # 坐标位置
    return circle_center_pos, left_top, right_bottom, confidence

def pos_convert_rectangle(center_pos,x1,y1,x2,y2):
    """
        通过原点，计算矩形范围
        center_pos 原点坐标，tuple类型
        x1,y1,x2,y2: 左上点坐标，右下点坐标
    """
    base_x = center_pos[0]
    base_y = center_pos[1]
    # 左上 右下坐标，放入一个tuple内
    pos_m = (base_x+x1,base_y+y1,base_x+x2,base_y+y2)
    pos_m = tuple(map(int, pos_m))
    # 左上 右下坐标，分两个tuple
    left_top_m = (base_x+x1,base_y+y1)
    right_bottom_m = (base_x+x2,base_y+y2)
    
    left_top = tuple(map(int, left_top_m))
    right_bottom = tuple(map(int, right_bottom_m))
    print("整体位置 ",pos_m," 左上位置 ",left_top_m," 右下位置 ",right_bottom_m)
    return pos_m,left_top,right_bottom

# 在图像指定位置画矩形
def draw_rectangle(img_source, left_top, right_bottom,  color, line_width):
    """
        在图片img_source内标记出 左上点为left_top 右下点为right_bottom 的空心图形

        # 对 match_pic_one 的结果画方块
        计算条形码位置 // 坐标转入参tuple(map(int, circle_center_pos))
        left_top_m = (base_x+490,base_y-25)
        right_bottom_m = (base_x+716,base_y+80)
        print("条形码位置",left_top_m,right_bottom_m)
        left_top = tuple(map(int, left_top_m))
        right_bottom = tuple(map(int, right_bottom_m))
        imsrc = aircv.imread(img_source)
        draw_rectangle(imsrc, left_top, right_bottom, color = (255, 0, 0), line_width = 5)
    """
    # 画方
    cv2.rectangle(img_source, left_top, right_bottom, color, line_width)  # 左上，右下
    cv2.namedWindow("objDetect", 0)
    cv2.resizeWindow("objDetect", 640, 480)
    cv2.moveWindow("objDetect", 200, 200)
    cv2.imshow('objDetect', img_source)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
# 解析本地二维码
def analysis_qr_code_local(img_path):
    """
        读取本地图片 识别二维码 条形码
        print(image_util().analysis_qr_code_local('D:\Program\\123.png'))
    """
    image = Image.open(img_path)
    image = ImageEnhance.Brightness(image).enhance(1.5)  # 增加亮度
    image = ImageEnhance.Sharpness(image).enhance(5.0)  # 锐利化

    enh_col = ImageEnhance.Color(image)
    color = 2.5
    image = enh_col.enhance(color)

    image = ImageEnhance.Contrast(image).enhance(3.0)  # 增加对比度
    image = image.convert('L')  # 灰度化
    barcodes = pyzbar.decode(image)
    # 解析二维码
    # 二维码跳转路径
    data = ''
    if barcodes:
        for barcode in barcodes:
            # 二维码路径
            barcodeData = barcode.data.decode("utf-8")
            # print(barcodeData)
            data = barcodeData
    return data

def execute(img_source,img_target):
    circle_center_pos, left_top, right_bottom, confidence  = match_pic_one(img_source, img_target);
    print("基础位置",circle_center_pos)
    pos_m,left_top,right_bottom = pos_convert_rectangle(circle_center_pos,970,-45,1416,180)
    """
    imsrc = aircv.imread(img_source)
    draw_rectangle(imsrc, left_top, right_bottom, color = (255, 0, 0), line_width = 5)
    iu.cut_pic(img_source,dir+"/cut.png",pos_m)
    """
    print(analysis_qr_code_local(dir+"\\cut.png"))

if __name__ == "__main__":
    dir="D:\\Download\\python-image\\pic"
    img_source = dir+"\\unprocess.jpg"
    img_target = dir+"\\base1.jpg"
    execute(img_source,img_target)
    
    
