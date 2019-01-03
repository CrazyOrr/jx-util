JavaScript工具函数库
===========

*TODO*

- [ ] 测试覆盖率 100%
- [x] need core: https://github.com/findhit/util
- [x] js beautify 打印 obj中嵌套 json string，被嵌套的部分没有格式化


## [更新/发布](https://www.cnblogs.com/penghuwan/p/6973702.html)

```
main.minor.patch

// 第一次发布
npm adduser
npm publish

// 第n+1次发布
npm login
npm publish

// 查看包的版本
npm view jx-util version
```

## 单元测试

[Mocha测试异步代码](https://harttle.land/2016/07/12/async-test-with-chai-as-promised.html),
[在Nodejs中贯彻单元测试](https://www.jianshu.com/p/3bcac18945a3)

```
// 安装依赖
npm install es6-promise --save --verbose
npm install -g mocha --verbose // 测试框架
npm install --save-dev chai --verbose // 断言库

npm install --save-dev mocha --verbose
npm install --save-dev mochawesome --verbose

npm install -g istanbul --verbose

// 单次测试
mocha tests/test-regex.js

// 持续测试
mocha --watch tests

// 生成测试结果html报表
mocha --reporter mochawesome tests

// 测试覆盖率
istanbul cover ./node_modules/mocha/bin/_mocha -- -t 2000 --recursive -R spec tests/
```

## core

| 函数名 | 功能 |
| ------ | ------ |
| uniqId | 唯一ID码 |
| uuid | '8-4-4-4-12' 字符串 |
| timing | 测量函数执行时间 |
| forEach | 遍历数组、字典 |
| map | 映射函数 |
| filter | 过滤函数 |
| clone | 克隆函数 |
| extend | 对象扩展函数 |
| slice | 片取函数 |
| stamp | 邮戳函数 |

## from

| 函数名 | 功能 |
| ------ | ------ |
| string | 从string转换为本有类型 |

## function

| 函数名 | 功能 |
| ------ | ------ |
| bind | 上下文绑定 |
| return | immutable 值 |
| falsify | immutable 假 |
| truthify | immutable 真 |
| nullify | immutable 空 |
| undefinify | immutable 为定义 |
| always | immutable 值 |
| args | 获取实参名称数组 |
| chain | 链异步函数 |
| compose | 执行从右向左的函数组合 |
| curry | 函数柯里化 |
| allPass | 条件判断 |
| anyPass | 条件判断 |
| tryCatch | 异常捕获封装 |
| pipes | 执行从左向右的函数组合 |
| promisify | 转换异步 |
| runPromisesInSeries | 异步串行 |
| sleep | 延迟异步执行 |
| throttle | 函数节流 |
| debounce | 函数防抖 |

## is

| 函数名 | 功能 |
| ------ | ------ |
| instanceof | ------ |
| function | ------ |
| array | ------ |
| object | ------ |
| string | ------ |
| error | ------ |
| regexp | ------ |
| HTMLelement | ------ |
| number | ------ |
| undefined | ------ |
| true | ------ |
| false | ------ |
| null | ------ |
| json | json 字符串，不为字符串，则返回false |
| bool | ------ |
| symbol | ------ |
| date | ------ |
| promise | ------ |
| not | ------ |
| ok | ------ |
| plain | ------ |
| empty | ------ |
| equal | ------ |

## object

| 函数名 | 功能 |
| ------ | ------ |
| forEach, each | ------ |
| map | ------ |
| filter | ------ |
| clone | ------ |
| isEmpty | ------ |
| clean | ------ |
| fromPairs | ------ |
| toPairs | ------ |
| shallowClone | ------ |
| has | ------ |
| merge | ------ |
| mergeDeep | ------ |
| mergeWith | ------ |
| keys | ------ |
| values | ------ |
| entries | ------ |
| pick | ------ |
| omit | ------ |
| prop | ------ |
| propApply | ------ |
| propEq | ------ |
| size | ------ |

## to

| 函数名 | 功能 |
| ------ | ------ |
| string | ------ |

## array 

| 函数名 | 功能 |
| ------ | ------ |
| head/first | 首位元素 |
| tail/last | 末尾元素 |
| disorder/shuffle | 打乱 |
| equal | 等价 |
| contains | 包含 |
| flatten | 扁平化 |
| randomOne | 随机选取 |
| countOccurrences | 计算元素数目 |
| unique | 去重 |
| sum | 求和（数值型数组） |
| maxify | 求最大值（数值型数组） |
| minify | 求最小值（数值型数组） |
| forEach/each | 遍历 |
| clone | 克隆 |
| map | 映射 |
| filter | 过滤 |
| del/rm/remove | 移除 |
| randomFilter | 指定元素数目，随机过滤 |
| empty | 清空 |
| union/merge | 求并集 |
| intersect | 求交集 |
| adjust | 对指定元素加值 |
| allPass | 全量判定 |
| anyPass | 选择判定 |
| append | 追加元素 |
| concat | 拼接数组 |
| diff | 求差集 |
| slice | 片取 |

## date 

| 函数名 | 功能 |
| ------ | ------ |
| head/first | 首位元素 |

## number


## regex

## string

## timer

## url

## logger

*基本功能*

* 日志级别
* 模块信息、字段信息与格式


*重要组件*

| 组件名称 | 对应类名 | 功能描述 |
| ------ | ------ | ------ |
| 日志器 | Logger | 提供了应用程序可一直使用的接口 |
| 处理器	| Handler |	将logger创建的日志记录发送到合适的目的输出 |
| 过滤器	| Filter| 提供了更细粒度的控制工具来决定输出哪条日志记录，丢弃哪条日志记录 |
| 格式器	| Formatter	| 决定日志记录的最终输出格式 |




