"""
包含
    均值哈希算法判断两图片是否相似
    根据小图在大图中匹配(获取最优结果&所有结果)
    在图片指定位置做标记(包括圆形&矩形)
    解析条形码&二维码

"""
# pip install aircv
import aircv
# pip install opencv-python
import cv2
# pip install Pillow
from PIL import Image, ImageEnhance
# 识别条形码
# 1、windows 下直接pip 安装: pip install pyzbar
# 2、ubuntu16.04 安装方式 
# sudo apt-get install libzbar-dev
# pip install zbar
# 3、centos7 安装方式
# yum install python-devel
# yum install zbar-devel
# yum install zbar
# 4、mac 安装方式
# brew install zbar
# pip install pyzbar
# 最后： pip install pyzbar
import pyzbar.pyzbar as pyzbar
import requests
from io import BytesIO
# pip install numpy
import numpy as np
# pip install scipy
import scipy.special
# pip install matplotlib
import matplotlib.pyplot as plt


class image_util:

    # 进行图片的匹配 返回结果中准确率最高的一个的信息
    def match_pic_one(self, img_source, img_target):
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
        confidence = pos['confidence']  # 准确率
        print('准确率:', confidence)
        # print(circle_center_pos)  # 坐标位置
        return circle_center_pos, left_top, right_bottom, confidence

    # 进行图片的匹配 返回所有匹配结果(准确率、坐标信息)
    def match_pic_multi(self, img_source, img_target, threshold=0.5):
        """
            判断img_target是否在img_source内出现，若存在则提供在图片img_source中的 “所有” 位置
            result = iu.match_pic_multi(img_source, img_target, threshold=0.6);
            result[0].get("result") # 圆心
            result[0].get("result") # 矩形四角 左上 左下
            result[0].get("result") # 圆心
            for r in result:
                print(r.get("result"),r.get("rectangle"),r.get("confidence"))
                circle_temp_pos = r.get("result")  # 中心点坐标
                circle_pos_result.append(tuple(map(int, circle_temp_pos)))
        """
        imsrc = aircv.imread(img_source)
        imobj = aircv.imread(img_target)
        # pos = aircv.find_template(imsrc, imobj, rgb=True, bgremove=True)
        result = aircv.find_all_template(imsrc, imobj, threshold, rgb=True, bgremove=True)
        if not result:
            return None
        return result

    # 均值哈希判定图片相似度
    def match_pic_similarity(self, img_source_path, img_target_path):
        """
        均值哈希判定图片相似度
            if(n>22):
                print('均值哈希算法计算的图片相似度：', n/64)
                cv2.imwrite('xxx.jpg',img)
        :param img_source_path: 图片地址
        :param img_target_path: 图片地址
        :return: 相似度
        """
        n = 0
        hash1 = self.calculate_pic_hash(cv2.imread(img_source_path))
        hash2 = self.calculate_pic_hash(cv2.imread(img_target_path))
        print("match_pic_similarity :", hash1)
        print("match_pic_similarity :", hash2)
        # hash长度不同则返回-1代表传参出错
        if len(hash1) != len(hash2):
            return -1
        # 遍历判断
        for i in range(len(hash1)):
            # 不相等则n计数+1，n最终为相似度
            if hash1[i] != hash2[i]:
                n = n + 1
        return n

    # 计算图片均值hash
    def calculate_pic_hash(self, img):
        """
        计算图片均值hash
        :param img: img=cv2.imread('xxx.jpg')
        :return: image hash
        """
        # 缩放为8*8
        plt.imshow(img)
        plt.axis('off')
        plt.show()
        img = cv2.resize(img, (8, 8))
        plt.imshow(img)
        plt.axis('off')
        plt.show()
        # 转换为灰度图
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # s为像素和初值为0，hash_str为hash值初值为''
        s = 0
        hash_str = ''
        # 遍历累加求像素和
        for i in range(8):
            for j in range(8):
                s = s + gray[i, j]
        # 求平均灰度
        avg = s / 64
        # 灰度大于平均值为1相反为0生成图片的hash值
        for i in range(8):
            for j in range(8):
                if gray[i, j] > avg:
                    hash_str = hash_str + '1'
                else:
                    hash_str = hash_str + '0'
        return hash_str

    # 在图像指定位置画圆圈
    def draw_cicle(self, img_source, pos, circle_radius, color, line_width):
        """
            在图片img_source内标记出 中心点为pos 半径为circle_radius
            pos = [tuple(map(int, iu.match_pic_multi(img_source, img_target, threshold=0.6)[0].get("result"))),...,...]
            circle_radius   半径 40
            color           颜色 (255, 0, 0)
            line_width      线宽度 1

            # 对 match_pic_one 的结果画圈
            imsrc = aircv.imread(img_source)
            circle_pos_result = [circle_center_pos] // 坐标转入参tuple(map(int, circle_center_pos))
            iu.draw_cicle(imsrc, circle_pos_result, circle_radius = 40, color = (255, 0, 0), line_width = 1)
        """
        if not pos:
            print('pos is null')
            return
        for p in pos:
            cv2.circle(img_source, p, circle_radius, color, line_width)
        cv2.namedWindow("objDetect", 0)
        cv2.resizeWindow("objDetect", 640, 480)
        cv2.moveWindow("objDetect", 200, 200)
        cv2.imshow('objDetect', img_source)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    # 在图像指定位置画矩形
    def draw_rectangle(self, img_source, left_top, right_bottom, color, line_width):
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

    # 截图
    def cut_pic(self, img_source, img_out, pos):
        """
            根据区域截图并保存
            img_source: 图像输入路径
            img_out:    图像输出路径
            pos: 坐标tuple() (x, y, w, h) x,y是左上角坐标

            e.g.
            circle_temp_pos = (100,100,200,200)
            pos = tuple(map(int, circle_temp_pos))
            iu.cut_pic(img_source,dir+"/cut.png",pos)
        """
        image = Image.open(img_source)
        range = image.crop(pos)
        range = ImageEnhance.Contrast(range).enhance(1.5)
        range.save(img_out)

    # 识别图像中的条形码 并输出内容
    # https://www.cnblogs.com/dy8888/p/13275587.html

    # 通过cv2打开摄像头
    def open_capture(self):
        capture = cv2.VideoCapture(0, cv2.CAP_DSHOW)
        capture.set(3, 640)
        capture.set(4, 480)
        while True:
            # 读取摄像头中的图像，ok为是否读取成功的判断参数
            ret, img = capture.read()
            cv2.imshow('frame', img)
            k = cv2.waitKey(1)
            if k == 27:  # 'ESC'关闭
                break

    # 解析网络二维码
    def analysis_qr_code_net(self, img_url):
        """
            读取网络图片 识别二维码 条形码
        """
        res = requests.get(img_url)
        new_img = Image.open(BytesIO(res.content))
        new_img = ImageEnhance.Brightness(new_img).enhance(1.5)  # 增加亮度
        new_img = ImageEnhance.Sharpness(new_img).enhance(5.0)  # 锐利化

        enh_col = ImageEnhance.Color(new_img)
        color = 2.5
        new_img = enh_col.enhance(color)

        new_img = ImageEnhance.Contrast(new_img).enhance(3.0)  # 增加对比度
        new_img = new_img.convert('L')  # 灰度化
        barcodes = pyzbar.decode(new_img)
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

    # 解析本地二维码
    def analysis_qr_code_local(self, img_path):
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

    def pos_convert_rectangle(self, center_pos, x1, y1, x2, y2):
        """
            通过原点，计算矩形范围
            center_pos 原点坐标，tuple类型
            x1,y1,x2,y2: 左上点坐标，右下点坐标
        """
        base_x = center_pos[0]
        base_y = center_pos[1]
        # 左上 右下坐标，放入一个tuple内
        pos_m = (base_x + x1, base_y + y1, base_x + x2, base_y + y2)
        pos_m = tuple(map(int, pos_m))
        # 左上 右下坐标，分两个tuple
        left_top_m = (base_x + x1, base_y + y1)
        right_bottom_m = (base_x + x2, base_y + y2)

        left_top = tuple(map(int, left_top_m))
        right_bottom = tuple(map(int, right_bottom_m))
        print("整体位置 ", pos_m, " 左上位置 ", left_top_m, " 右下位置 ", right_bottom_m)
        return pos_m, left_top, right_bottom


if __name__ == "__main__":
    # case1 返回对比成功的第一个位置
    """
    iu = image_util()
    dir="/Users/dxm/work"
    img_source = dir+"/dtk.jpg"
    img_target = dir+"/hfk.png"

    circle_center_pos, left_top, right_bottom, confidence = iu.match_pic_one(img_source, img_target)
    print(circle_center_pos.count,circle_center_pos[0],circle_center_pos[1])
    circle_pos_result = [circle_center_pos]
    # 在原图上标记出小图的位置
    imsrc = aircv.imread(img_source)
    iu.draw_cicle(imsrc, circle_pos_result, circle_radius = 40, color = (255, 0, 0), line_width = 1)
    """

    # case2 返回对比成功的所有位置
    """
    iu = image_util()
    dir="/Users/dxm/work"
    img_source = dir+"/dtk.jpg"
    img_target = dir+"/hfk.png"

    circle_pos_result = []
    result = iu.match_pic_multi(img_source, img_target, threshold=0.6);
    for r in result:
        print(r.get("result"),r.get("rectangle"),r.get("confidence"))
        circle_temp_pos = r.get("result")  # 中心点坐标
        circle_pos_result.append(tuple(map(int, circle_temp_pos)))
    # 在原图上标记出所有小图的位置
    imsrc = aircv.imread(img_source)
    iu.draw_cicle(imsrc, circle_pos_result, circle_radius = 40, color = (255, 0, 0), line_width = 1)
    """

    # case3 处理答题卡
    """
    iu = image_util()
    dir="/Users/dxm/work"
    img_source = dir+"/dtk.jpg"
    img_target = dir+"/mark.png"

    result = iu.match_pic_multi(img_source, img_target, threshold=0.6);
    # 1. 判断四个方块的位置
    base_pos = result[0].get("result")
    base_x = base_pos[0]
    base_y = base_pos[1]
    print("基础位置",base_pos)
    # 2. 计算条形码位置
    pos_m = (base_x+490,base_y-25,base_x+716,base_y+80)
    pos_m = tuple(map(int, pos_m))
    print("条形码位置",pos_m)

    # 3. 计算身份证位置
    pos_p = (base_x+50,base_y+195,base_x+620,base_y+260)
    pos_p = tuple(map(int, pos_p))
    print("身份证位置",pos_p)


    # 4. 截图
    iu.cut_pic(img_source,dir+"/cut.png",pos_p) # 条形码截图

    # 5. 识别条形码 + 身份证，并进行对比
    """

    # case4 打开摄像头
    """
    iu = image_util()
    iu.open_capture()
    """

    # case5 识别本地二维码
    """
    print(image_util().analysis_qr_code_local('D:\Program\\123.png'))
    print(image_util().analysis_qr_code_net('https://net-img.popziti.com/moban/user/2020/04/22/b84b16c97607cfd50d58162b8dd86d92.png?auth_key=1622395865-0-0-995999713afe9b6b6674937676b1ff1d'))
    """

    # case6 识别条形码
    """
    print(image_util().analysis_qr_code_local('D:\Program\\cnaidc.png'))
    """

    # case7
    """
    path="D:\\Download\\python-image\\pic"
    pic_source = path+"\\unprocess.jpg"
    pic_target = path+"\\base.jpg"
    """

    # case8 通过图片获取条形码并读取
    iu = image_util()
    dir = "D:\\Download\\python-image\\pic"
    img_source = dir + "\\unprocess.jpg"
    img_target = dir + "\\base1.jpg"

    # 1. 通过子图定位在母图中位置
    circle_center_pos, left_top, right_bottom, confidence = iu.match_pic_one(img_source, img_target);
    print("基础位置", circle_center_pos)
    # 2. 通过原点计算条形码位置位置  矩形
    pos_m, left_top, right_bottom = iu.pos_convert_rectangle(circle_center_pos, 970, -45, 1416, 180)
    imsrc = aircv.imread(img_source)
    iu.draw_rectangle(imsrc, left_top, right_bottom, color=(255, 0, 0), line_width=5)
    # 裁剪
    # iu.cut_pic(img_source,dir+"/cut.png",pos_m)
    print(iu.analysis_qr_code_local(dir + "\\cut.png"))
