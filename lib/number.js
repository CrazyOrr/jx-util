"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// 丢弃小数部分,保留整数部分
// parseInt(5/2)　　// 2
// 向上取整,有小数就整数部分加1
// Math.ceil(5/2)　　// 3
// 向下取整,丢弃小数部分
// Math.floor(5/2)　　// 2
// 四舍五入
// Math.round(5/2)　　// 3

module.exports = function (f) {
  var $ = f.number = f.Number = f.num = {};

  $.negate = function (n) {
    return -n;
  };

  /**
   * @desc 随机数
   */
  $.random = function (min, max) {
    if (arguments.length === 2) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    } else {
      return null;
    }
  };

  // generateRandom: 产生两个参数之间的随机数
  $.generateRandom = function (lowerValue, upperValue) {
    var chioces = upperValue - lowerValue + 1;

    return Math.floor(Math.random() * chioces + lowerValue);
  };

  // collatz: 实现collatz算法
  // 如果n是偶数, 则返回n/2。否则返回3n+1
  $.collatz = function (n) {
    return n % 2 == 0 ? n / 2 : 3 * n + 1;
  };

  // digitize: 将数字转换为数字数组
  // 将数字转换为字符串, 在 ES6 ([...string]) 中使用扩展运算符生成数组。使用Array.map()和parseInt()将每个值转换为整数
  $.digitize = function (n) {
    return [].concat(_toConsumableArray("" + n)).map(function (i) {
      return parseInt(i);
    });
  };

  // distance 返回两点之间的距离
  // 使用Math.hypot()计算两个点之间的欧氏距离
  $.distance = function (x0, y0, x1, y1) {
    return Math.hypot(x1 - x0, y1 - y0);
  };

  // gcd: 计算最大公约数
  // 使用递归。基本情况是当y等于0时。在这种情况下, 返回x。否则, 返回y的 GCD 和除法的其余部分x/y
  $.gcd = function (a, b) {
    var x = a,
        y = b;
    _gcd = function (_gcd2) {
      function _gcd(_x2, _x3) {
        return _gcd2.apply(this, arguments);
      }

      _gcd.toString = function () {
        return _gcd2.toString();
      };

      return _gcd;
    }(function (_x, _y) {
      return !_y ? _x : _gcd(_y, _x % _y);
    });

    return _gcd(a, b);
  };

  // isDivisible: 检查第一个数值参数是否可被另一个数字变量整除
  // 使用模数运算符 (%) 检查余数是否等于0
  $.isDivisible = function (dividend, divisor) {
    return dividend % divisor === 0;
  };

  // isEven: 如果给定的数字为偶数, 则返回true, 否则为false
  $.isEven = function (num) {
    return num % 2 === 0;
  };

  // lcm：最小公倍数
  // 结合最大公约数以及Math.abs()来确定最小公约数
  $.lcm = function (x, y) {
    var gcd = function gcd(x, y) {
      return !y ? x : gcd(y, x % y);
    };

    return Math.abs(x * y) / gcd(x, y);
  };

  // median: 返回数组的中间
  // 返回数组的中间，使用Array.sort()来对值进行排序，若length为奇数返回中间的数，若为偶数，返回中间两个值的平均值
  $.median = function (arr) {
    var mid = Math.floor(arr.length / 2),
        nums = arr.sort(function (a, b) {
      return a - b;
    });

    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

  // percentile: 使用百分比公式计算给定数组中有多少个数小于或等于给定值
  $.percentile = function (arr, val) {
    return 100 * arr.reduce(function (acc, v) {
      return acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0);
    }, 0) / arr.length;
  };

  // powerset: 返回给定数组的真子集
  // 使用Array.reduce()与Array.map()组合, 以循环访问元素并将其合并到包含所有组合的数组中
  $.powerset = function (arr) {
    return arr.reduce(function (a, v) {
      return a.concat(a.map(function (r) {
        return [v].concat(r);
      }));
    }, [[]]);
  };

  // randomIntegerInRange: 返回指定范围内的随机整数
  // 使用Math.random()生成一个随机数并将其映射到所需的范围, 使用Math.floor()使其成为整数
  $.randomIntegerInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // randomNumberInRange: 返回指定范围内的随机数
  // 使用Math.random()生成随机值, 并使用乘法将其映射到所需的范围
  $.randomNumberInRange = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  // round: 将数字四舍五入到指定的位数
  // 使用Math.round()和模板文本将数字舍入到指定的位数。省略第二个参数,decimals舍入为整数
  $.round = function (n) {
    var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Number(Math.round(n + "e" + decimals) + "e-" + decimals);
  };
};