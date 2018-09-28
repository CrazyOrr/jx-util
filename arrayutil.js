/**
 * @desc 打乱数组顺序
 * @param {Array} arr
 * @return {Array}
 */
function disorder(arr) {
  return arr.sort(function () {
    return Math.random() - 0.5
  })
}

/**
 * @desc 判断两个数组是否相等
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @return {Boolean}
 */
function equal(arr1, arr2) {
  if (arr1 === arr2) return true
  if (arr1.length != arr2.length) return false
  for (var i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false
  }
  return true
}

/**
 * @desc 数组扁平化
 * @param {Array} arr
 * @return {Array}
 */
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

/**
 * @desc 从数组中随机获取一个元素
 * @param {Array} arr
 * @return {Number}
 */
function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * @desc 数组去重
 * @param {Array} arr 
 * @return {Array}
 */
function deduplicate(arr) {
  return [...new Set(arr)]
}

/**
 * @desc 数组求和（数字类型的数组）
 * @param {Array} arr
 * @return {Number}
 */
function sum(arr) {
  return arr.reduce(function (pre, cur) {
    return pre + cur;
  })
}

/**
 * @desc 返回数组(或字符串)中出现最多的元素和出现次数
 * @param {Array} arr
 * @param {Number} rank:长度，默认为数组长度
 * @param {Number} ranktype:排序方式，默认降序;如果ranktype为1，则为升序
 * @return {Array[Object]} el:元素，count:次数
 */
function countMax(arr, rank, ranktype) {
  var obj = {},
    k, arr1 = [];
  //记录每一元素出现的次数
  for (var i = 0, len = arr.length; i < len; i++) {
      k = arr[i];
      if (obj[k]) {
          obj[k]++;
      } else {
          obj[k] = 1;
      };
  };
  //保存结果{el:'元素'，count:出现次数}
  for (var o in obj) {
      arr1.push({
          el: o,
          count: obj[o]
      });
  };
  //排序（降序）
  arr1.sort(function (n1, n2) {
      return n2.count - n1.count;
  });
  //如果ranktype为1，则为升序，反转数组
  if (ranktype === 1) {
      arr1 = arr1.reverse();
  };
  var rank1 = rank || arr1.length;
  return arr1.slice(0, rank1);
}

/**
 * @desc 返回数组或字符串中一个元素出现的次数
 * @param {Array|String} arr
 * @param {Number|String} ele
 * @return {Number}
 */
function numbersOfElement(obj, ele) {
  var num = 0;
  for (var i = 0, len = obj.length; i < len; i++) {
      if (ele === obj[i]) {
          num++;
      };
  };
  return num;
}

/**
 * @desc 找出数组中的最大值（数字类型的数组）
 * @param {Array} arr
 * @return {Number}
 */
function findMax(arr) {
  return Math.max(...arr)
}

/**
 * @desc 找出数组中的最小值（数字类型的数组）
 * @param {Array} arr
 * @return {Number}
 */
function findMin(arr) {
  return Math.min(...arr);
}

module.exports = {
  disorder,
  equal,
  flatten,
  randomOne,
  deduplicate,
  sum,
  countMax,
  numbersOfElement,
  findMax,
  findMin
}