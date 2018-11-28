JavaScript工具函数库
===========

*TODO*

- [ ] 测试覆盖率 100%
- [ ] need core: https://github.com/findhit/util


## [更新/发布](https://www.cnblogs.com/penghuwan/p/6973702.html)

```
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

[Mocha测试异步代码](https://harttle.land/2016/07/12/async-test-with-chai-as-promised.html)

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

## object

| 函数名 | 功能 |
| ------ | ------ |

## to

| 函数名 | 功能 |
| ------ | ------ |




## rx

管道+源、运算子、消费

## 这个很棒

* [util.js](https://github.com/TinkoffCreditSystems/utils.js)