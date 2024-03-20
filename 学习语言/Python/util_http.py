# pip install selenium
# Message: 'chromedriver' executable needs to be in PATH
# 在 http://npm.taobao.org/mirrors/chromedriver/ 下载 chromedriver
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time


class util_selenium:

    def browser_open(self):
        return webdriver.Chrome()

    def browser_close(self,webdriver):
        webdriver.close()



if __name__ == "__main__":

    handler=util_selenium()
    # 声明&打开浏览器
    browser = handler.browser_open()
    # 打开浏览器预设网址
    browser.get("https:www.baidu.com")
    # 找到输入框
    element = browser.find_element_by_id("kw")

    element.send_keys("hello word!")
    element.send_keys(Keys.ENTER)

    print(browser.page_source)#打印网页源代码

    time.sleep(3)

    browser.close()#关闭浏览器





