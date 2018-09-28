JavaScript工具函数库
===========

mocha 测试工具

```

npm install -g mocha --verbose

npm install --save-dev chai --verbose
```

## stringutil
* changeCase&nbsp;-&nbsp;大小写转换
* removeSpace&nbsp;-&nbsp;字符串去除空格
* stringReplace&nbsp;-&nbsp;字符串替换
* stringFormat&nbsp;-&nbsp;格式化字符串
* repeatCopy&nbsp;-&nbsp;字符串重复复制
* digitUppercase&nbsp;-&nbsp;现金额转大写

## arrayutil
* arrayDisorder&nbsp;-&nbsp;打乱数组顺序
* arrayEqual&nbsp;-&nbsp;判断两个数组是否相等
* arrayFlattening&nbsp;-&nbsp;数组扁平化
* arrayRandom&nbsp;-&nbsp;从数组中随机获取元素
* arrayRemoveRepeat&nbsp;-&nbsp;数组去重
* arraySum&nbsp;-&nbsp;数组求和（数字类型的数组）
* getEleCount&nbsp;-&nbsp;返回数组或字符串中一个元素出现的次数
* getCount&nbsp;-&nbsp;返回数组(或字符串)中出现最多的元素和出现次数
* maxArr&nbsp;-&nbsp;找出数组中的最大值（数字类型的数组）
* minArr&nbsp;-&nbsp;找出数组中的最小值（数字类型的数组）

## functutil
* debounce&nbsp;-&nbsp;函数防抖
* throttle&nbsp;-&nbsp;函数节流

## objectutil
* dataType&nbsp;-&nbsp;数据类型判断
* deepClone&nbsp;-&nbsp;深拷贝，支持常见类型
* isEmptyObject&nbsp;-&nbsp;判断obj是否为空isEmptyObject.js)

## dateutil
* formatPassTime&nbsp;-&nbsp;格式化${startTime}距现在的已过时间
* formatRemainTime&nbsp;-&nbsp;格式化现在距${endTime}的剩余时间

## randomutil
* randomColor&nbsp;-&nbsp;随机生成颜色
* randomNum&nbsp;-&nbsp;生成指定范围随机数

## domutil
* hasClass&nbsp;-&nbsp;判断元素是否有某个class
* addClass&nbsp;-&nbsp;为元素添加class
* removeClass&nbsp;-&nbsp;为元素移除class

## bomutil
* setScrollTop&nbsp;-&nbsp;设置滚动条距顶部的距离
* getScrollTop&nbsp;-&nbsp;获取滚动条距顶部的距离
* scrollTo&nbsp;-&nbsp;在${duration}时间内，滚动条平滑滚动到${to}指定位置
* offset&nbsp;-&nbsp;获取一个元素的距离文档(document)的位置，类似jQ中的offset()
* isSupportWebP&nbsp;-&nbsp;判断浏览器是否支持webP格式图片
* fullScreen&nbsp;-&nbsp;全屏显示与取消全屏

## regutil
* isEmail&nbsp;-&nbsp;判断是否为邮箱地址
* isIdCard&nbsp;-&nbsp;判断是否为身份证号
* isPhoneNum&nbsp;-&nbsp;判断是否为手机号
* isUrl&nbsp;-&nbsp;判断是否为URL地址

## urlutil
* parseQueryString&nbsp;-&nbsp;url参数转对象
* stringfyQueryString&nbsp;-&nbsp;对象序列化

## cookieutil
* setCookie&nbsp;-&nbsp;设置Cookie
* getCookie&nbsp;-&nbsp;根据name读取cookie
* removeCookie&nbsp;-&nbsp;根据name删除cookieremoveCookie.js)

## deviceutil
* getExplore&nbsp;-&nbsp;获取浏览器类型和版本
* getOS&nbsp;-&nbsp;获取操作系统类型
* getKeyName&nbsp;-&nbsp;根据keycode获得键名

