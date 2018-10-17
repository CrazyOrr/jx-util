JavaScript工具函数库
===========

*TODO*

- [ ] 测试覆盖率 100%
- [ ] need core: https://github.com/findhit/util


## [更新/发布](https://www.cnblogs.com/penghuwan/p/6973702.html)

```
第一次

npm adduser
npm publish

第n+1次

npm login
npm publish

```

## 单元测试

```
npm install es6-promise --save --verbose

npm install -g mocha --verbose
npm install --save-dev chai --verbose

mocha uniteat/index.js

持续测试
mocha --watch tests

生成测试结果html报表
npm install --save-dev mocha --verbose
npm install --save-dev mochawesome --verbose

mocha --reporter mochawesome tests

测试覆盖率
npm install -g istanbul --verbose

istanbul cover ./node_modules/mocha/bin/_mocha -- -t 2000 --recursive -R spec tests/
```

## stringutil

* changeCase            大小写转换
* removeSpace            字符串去除空格
* replace            字符串替换
* stringFormat            格式化字符串
* repeatCopy            字符串重复复制
* digitUppercase            现金额转大写

## arrayutil

* disorder            打乱数组顺序
* equal            判断两个数组是否相等
* flatten            数组扁平化
* random            从数组中随机获取元素
* deduplicate            数组去重
* sum            数组求和（数字类型的数组）
* numbersOfElement            返回数组或字符串中一个元素出现的次数
* countMax            返回数组(或字符串)中出现最多的元素和出现次数
* findMax            找出数组中的最大值（数字类型的数组）
* findMin            找出数组中的最小值（数字类型的数组）

## functutil

* debounce            函数防抖
* throttle            函数节流

## objectutil

* isType            数据类型判断
* deepClone            深拷贝，支持常见类型
* isEmpty            判断obj是否为空isEmptyObject.js)

## dateutil

* formatPassTime            格式化${startTime}距现在的已过时间
* formatRemainTime            格式化现在距${endTime}的剩余时间

## randomutil

* randomColor            随机生成颜色
* randomNumber            生成指定范围随机数

## domutil

* hasClass            判断元素是否有某个class
* addClass            为元素添加class
* removeClass            为元素移除class

## bomutil

* setScrollTop            设置滚动条距顶部的距离
* getScrollTop            获取滚动条距顶部的距离
* scrollTo            在${duration}时间内，滚动条平滑滚动到${to}指定位置
* offset            获取一个元素的距离文档(document)的位置，类似jQ中的offset()
* isSupportWebP            判断浏览器是否支持webP格式图片
* fullScreen            全屏显示与取消全屏

## regutil

* isEmail            判断是否为邮箱地址
* isIdCard            判断是否为身份证号
* isPhoneNum            判断是否为手机号
* isUrl            判断是否为URL地址

## urlutil

* parseQueryString            url参数转对象
* stringfyQueryString            对象序列化

## cookieutil

* setCookie            设置Cookie
* cookieForName            根据name读取cookie
* removeCookieByName            根据name删除cookieremoveCookie.js)

## deviceutil

* explorerInfo            获取浏览器类型和版本
* osInfo            获取操作系统类型
* getKeyboardKeyName            根据keycode获得键名

## 这个很棒

* [util.js](https://github.com/TinkoffCreditSystems/utils.js)