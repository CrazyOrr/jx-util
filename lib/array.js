"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function (f) {
	var _this2 = this;

	var $ = f.array = f.arr = {};

	$.head = $.first = function (arr) {
		return arr[0];
	};
	$.tail = $.last = function (arr) {
		return arr[arr.length - 1];
	};

	/**
  * @desc 打乱数组顺序
  */
	$.disorder = $.shuffle = function disorder(arr) {
		return arr.sort(function () {
			return Math.random() - 0.5;
		});
	};

	/**
  * @desc 判断两个数组是否相等
  */
	$.equal = function equal(arr1, arr2) {
		if (arr1 === arr2) return true;
		if (arr1.length != arr2.length) return false;
		for (var i = 0; i < arr1.length; ++i) {
			if (arr1[i] !== arr2[i]) return false;
		}
		return true;
	};

	/**
  * @desc 检查给定数组中是否包含某项
  */
	$.contains = function (arr, item) {
		var i = arr.length;
		while (i--) {
			if (arr[i] === item) {
				return true;
			}
		}
		return false;
	};

	// flatten: 拼合数组
	// 使用Array.reduce()获取数组中的所有元素和concat()以拼合它们
	$.flatten = function (arr) {
		return arr.reduce(function (a, v) {
			return a.concat(v);
		}, []);
	};

	// 从数组中随机获取一个元素
	$.randomOne = function randomOne(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	};

	// countOccurrences: 计算数组中值的出现次数
	// 使用Array.reduce()在每次遇到数组中的特定值时递增计数器。
	$.countOccurrences = function (arr, value) {
		return arr.reduce(function (a, v) {
			return v === value ? a + 1 : a + 0;
		}, 0);
	};

	// 数组去重
	$.unique = function deduplicate(arr) {
		return [].concat(_toConsumableArray(new Set(arr)));
	};

	// 数组求和（数字类型的数组）
	$.sum = function sum(arr) {
		return arr.reduce(function (pre, cur) {
			return pre + cur;
		});
	};

	// 找出数组中的最大值（数字类型的数组）
	$.maxify = function findMax(arr) {
		return Math.max.apply(Math, _toConsumableArray(arr));
	};

	// 找出数组中的最小值（数字类型的数组）
	$.minify = function findMin(arr) {
		return Math.min.apply(Math, _toConsumableArray(arr));
	};

	/**
 * @desc 遍历数组中的元素
 * @param fn 回调函数
 */
	$.forEach = $.each = function (array, fn, context) {
		if (!f.is.Array(array)) {
			throw new TypeError("array must be an array");
		}
		if (!f.is.Function(fn)) {
			throw new TypeError("fn must be a function");
		}

		var i;

		for (i = 0; i < array.length; i++) {
			fn.call(context || array, array[i], i, array);
		}

		return array;
	};

	/**
  * @desc 数组克隆
  */
	$.clone = function (arr) {
		var o = [];
		f.array.each(arr, function (k, v) {
			o[k] = v;
		});
		return o;
	};

	// map操作
	$.map = function (array, fn, context) {

		if (!f.is.Function(fn)) {
			throw new TypeError("fn must be a function");
		}

		var res = [];

		f.array.each(array, function (v, k) {
			res.push(fn.call(context || array, v, k, array) || undefined);
		});

		return res;
	};

	// 过滤操作
	$.filter = function (array, fn, context) {

		if (!f.is.Array(array)) {
			throw new TypeError("array must be an array");
		}
		if (!f.is.Function(fn)) {
			throw new TypeError("fn must be a function");
		}

		var res = [];

		f.array.each(array, function (v, k) {
			if (fn.call(context || array, v, k, array)) {
				res.push(array[k]);
			}
		});

		return res;
	};

	/**
  * 数组元素删除
  */
	$.del = $.rm = $.remove = function (arr, ele) {
		var index = arr.indexOf(ele);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	};

	// 随机过滤
	$.randomFilter = function (array, limit) {
		if (!f.is.Array(array)) {
			throw new TypeError("array must be an array");
		}

		if (!parseInt(limit) > 0 || array.length <= limit) {
			return array || false;
		}

		var newArray = [],
		    i;

		// Copy all the options to target
		for (i in array) {
			newArray[i] = array[i];
		}

		while (newArray.length > limit) {

			// Itenerator to decrement
			i = Math.floor(Math.random() * newArray.length);

			newArray.splice(i, 1);
		}

		return newArray;
	};

	// 清空
	$.empty = function (array) {

		if (!f.is.Array(array)) {
			throw new TypeError("array must be an array");
		}

		array.splice(0, array.length);

		return array;
	};

	/*求两个集合的并集*/
	$.union = $.merge = function (a, b) {
		var newArr = a.concat(b);
		return _this2.unique(newArr);
	};

	/**
  * @desc 交集
  */
	$.intersect = function (a, b) {
		var _this = _this2;
		a = _this2.unique(a);
		return _this2.map(a, function (o) {
			return _this.contains(b, o) ? o : null;
		});
	};

	/**
  * @desc 对指定元素加值
  *
  * @param {Function} fn The function to apply.
  * @param {Number} idx The index.
  * @param {Array} list An array whose value
  *        at the supplied index will be replaced.
  * @return {Array} A copy of the supplied array with
  *         the element at index `idx` replaced with the value
  *         returned by applying `fn` to the existing element.
  *
  * @example
  *
  *      adjust([1, 2, 3], 1, add(10));     //=> [1, 12, 3]
  */
	$.adjust = f.function.curryN(3, function (list, idx, fn) {
		if (idx >= list.length || idx < -list.length) {
			return list;
		}

		var start = idx < 0 ? list.length : 0;
		var index = start + idx;
		var result = concat(list, []);

		result[index] = fn(list[index]);
		return result;
	});

	/**
  * @desc 全量判定
  *
  * @param {Function} fn The predicate function.
  * @param {Array} arr The array to consider.
  * @return {Boolean} `true` if the predicate is satisfied all elements, `false`
  *         otherwise.
  * @example
  *
  *      var lessThan2 = x => x < 2;
  *      var lessThan3 = x => x < 3;
  *      allPass([1, 2], lessThan2); //=> false
  *      allPass([1, 2], lessThan3); //=> true
  */
	$.allPass = f.function.curryN(2, function () {
		var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var fn = arguments[1];

		for (var i = 0; i < arr.length; i++) {
			if (!fn(arr[i], i, arr)) {
				return false;
			}
		}

		return true;
	});

	/**
  * Returns `true` if at least one of elements of the list match the predicate,
  * `false` otherwise.
  *
  * @param {Function} fn The predicate function.
  * @param {Array} arr The array to consider.
  * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
  *         otherwise.
  * @example
  *
  *      var lessThan0 = x => x < 0;
  *      var lessThan2 = x => x < 2;
  *      anyPass([1, 2], lessThan0); //=> false
  *      anyPass([1, 2], lessThan2); //=> true
  */
	$.anyPass = f.function.curryN(2, function () {
		var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var fn = arguments[1];
		// 操作符 保持在 操作对象后面
		for (var i = 0; i < arr.length; i++) {
			if (fn(arr[i], i, arr)) {
				return true;
			}
		}

		return false;
	});

	/**
  * @desc 追加元素
  *
  * @param {*} el The element to add to the end of the new list.
  * @param {Array} list The list of elements to add a new item to.
  *        list.
  * @return {Array} A new list containing the elements of the old list followed by `el`.
  * @example
  *
  *      append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
  *      append('tests', []); //=> ['tests']
  *      append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
  */

	$.append = f.function.curryN(2, function (list, ele) {
		return concat(list, [ele]);
	});

	/**
  * @desc 追加数组
  *
  * @param {Array|String} a The first list
  * @param {Array|String} b The second list
  * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
  * `secondList`.
  *
  * @example
  *
  *      concat('ABC', 'DEF'); // 'ABCDEF'
  *      concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
  *      concat([], []); //=> []
  */
	$.concat = f.function.curryN(2, function () {
		var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

		if (isArray(a)) {
			return a.concat(b);
		}

		return a + b;
	});

	/**
  * @desc 差集
  *
  * @param {Array} a The first array.
  * @param {Array} b The second array.
  * @return {Array} The elements in `a` that are not in `b`.
  * @example
  *
  *      difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
  *      difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
  */
	$.diff = f.function.curryN(2, function () {
		var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

		var result = [];

		for (var i = 0; i < a.length; i++) {
			if (b.indexOf(a[i]) < 0) {
				result.push(a[i]);
			}
		}

		return result;
	});

	/**
  * @desc 片取
  *
  * @example
  *
  *      slice(['a', 'b', 'c', 'd'], 1, 3);        //=> ['b', 'c']
  *      slice(['a', 'b', 'c', 'd'], 1, Infinity); //=> ['b', 'c', 'd']
  *      slice(['a', 'b', 'c', 'd'], 0, -1);       //=> ['a', 'b', 'c']
  *      slice(['a', 'b', 'c', 'd'], -3, -1);      //=> ['b', 'c']
  */

	$.slice = f.function.curryN(3, function () {
		var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var fromIndex = arguments[1];
		var toIndex = arguments[2];
		return list.slice(fromIndex, toIndex);
	});

	/**
  * Returns all but the first `n` elements of the given list, string.
  *
  * @param {Number} n
  * @param {*} xs
  * @return {*} A copy of list without the first `n` elements
  * @example
  *
  *      drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
  *      drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
  *      drop(3, ['foo', 'bar', 'baz']); //=> []
  *      drop(4, ['foo', 'bar', 'baz']); //=> []
  */

	$.drop = f.function.curryN(2, function (n, xs) {
		return f.array.slice(Math.max(0, n), Infinity, xs);
	});
};