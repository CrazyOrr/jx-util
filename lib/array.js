module.exports = (function ( f ) {
  var $ = f.Array = f.array = {}

  // is and isnt
	$.is = f.is.Array
	$.isnt = f.isnt.Arrays
	
	// 返回列表的头
	$.head = arr => arr[0]

	// 返回数组中的最后一个元素
	$.last = arr => arr[arr.length - 1]
  
  // 打乱数组顺序
  $.disorder = $.shuffle = function disorder(arr) {
    return arr.sort(function () {
      return Math.random() - 0.5
    })
  }

  // 判断两个数组是否相等
  $.equal = function equal(arr1, arr2) {
    if (arr1 === arr2) return true
    if (arr1.length != arr2.length) return false
    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false
    }
    return true
	}
	
	// 检查给定数组中是否包含某项
	$.contains = function (arr, item) {
		var i = arr.length;
		while (i--) {
			if(arr[i] === item){
				return true;
			}
		}
		return false;
	}

	// flatten: 拼合数组
	// 使用Array.reduce()获取数组中的所有元素和concat()以拼合它们
	$.flatten = arr => arr.reduce((a, v) => a.concat(v), [])

  // 从数组中随机获取一个元素
  $.randomOne = function randomOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
	}
	
	// countOccurrences: 计算数组中值的出现次数
	// 使用Array.reduce()在每次遇到数组中的特定值时递增计数器。
	$.countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a+1 : a+0, 0)

  // 数组去重
  $.unique = function deduplicate(arr) {
    return [...new Set(arr)]
  }

  // 数组求和（数字类型的数组）
  $.sum = function sum(arr) {
    return arr.reduce(function (pre, cur) {
      return pre + cur;
    })
  }

  // 找出数组中的最大值（数字类型的数组）
  $.maxify = function findMax(arr) {
    return Math.max(...arr)
  }

  // 找出数组中的最小值（数字类型的数组）
  $.minify = function findMin(arr) {
    return Math.min(...arr)
  }

  // 遍历
  $.forEach = $.each = function ( array, fn, context ) {
		if ( f.isnt.Array( array ) ) {
			throw new TypeError("array must be an array")
		}
		if ( f.isnt.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}

		var i;

		for( i=0; i < array.length; i++ ) {
			fn.call( context || array, array[ i ], i, array );
		}

		return array
	}

  // map操作
	$.map = function ( array, fn, context ) {

		if ( f.isnt.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}

		var res = []

		f.each( array, function ( v, k ) {
			res.push(
				fn.call( context || array, v, k, array ) || undefined
			)
		})

		return res
	}

  // 过滤操作
	$.filter = function ( array, fn, context ) {

		if ( f.isnt.Array( array ) ) {
			throw new TypeError("array must be an array")
		}
		if ( f.isnt.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}

		var res = []

		f.each( array, function ( v, k ) {
			if( fn.call( context || array, v, k, array ) ) {
				res.push( array[ k ] )
      }
		})

		return res
	}

  // 随机过滤
	$.randomFilter = function ( array, limit ) {

		if ( f.isnt.Array( array ) ) {
			throw new TypeError("array must be an array")
		}

		if( ! parseInt( limit ) > 0 || array.length <= limit ) {
			return array || false
		}

		var newArray = [], i

		// Copy all the options to target
		for( i in array ) {
			newArray[ i ] = array[ i ]
		}

		while ( newArray.length > limit ) {

			// Itenerator to decrement
			i = Math.floor( Math.random() * newArray.length )

			newArray.splice( i, 1 )

		}

		return newArray
	}

  // 清空
	$.empty = function ( array ) {

		if ( f.isnt.Array( array ) ) {
			throw new TypeError("array must be an array")
		}

		array.splice( 0, array.length )

		return array
	}

	/*求两个集合的并集*/
	$.union = (a, b) => {
		var newArr = a.concat(b)
		return this.unique(newArr)
	}

	/*求两个集合的交集*/
	$.intersect = (a, b) => {
		var _this = this
		a = this.unique(a)
		return this.map(a, function(o) {
			return _this.contains(b, o) ? o : null
		})
	}

	/*删除其中一个元素*/
	$.remove = (arr, ele) => {
		var index = arr.indexOf(ele)
		if(index > -1) {
			arr.splice(index, 1)
		}
		return arr;
	}

	/**
	 * Applies a function to the value at the given index of an array, returning a
	 * new copy of the array with the element at the given index replaced with the
	 * result of the function application.
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
	 *      adjust(add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]
	 *      adjust(add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]
	 */
	$.adjust = f.function.curryN(3, (fn, idx, list) => {
    if (idx >= list.length || idx < -list.length) {
        return list;
    }

    const start = idx < 0 ? list.length : 0;
    const index = start + idx;
    const result = concat(list, []);

    result[index] = fn(list[index]);
    return result;
	})

	/**
	 * Returns `true` if all the elements of the array match the predicate,
	 * `false` otherwise.
	 *
	 * @param {Function} fn The predicate function.
	 * @param {Array} arr The array to consider.
	 * @return {Boolean} `true` if the predicate is satisfied all elements, `false`
	 *         otherwise.
	 * @example
	 *
	 *      var lessThan2 = x => x < 2;
	 *      var lessThan3 = x => x < 3;
	 *      all(lessThan2)([1, 2]); //=> false
	 *      all(lessThan3)([1, 2]); //=> true
	 */
	$.all = f.function.curryN(2, (fn, arr = []) => {
		for (let i = 0; i < arr.length; i++) {
				if (!fn(arr[i], i, arr)) {
						return false;
				}
		}

		return true
	})

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
	 *      any(lessThan0)([1, 2]); //=> false
	 *      any(lessThan2)([1, 2]); //=> true
	 */
	$.any = f.function.curryN(2, (fn, arr = []) => {
		for (let i = 0; i < arr.length; i++) {
				if (fn(arr[i], i, arr)) {
						return true;
				}
		}

		return false;
	})

	/**
	 * Returns a new list containing the contents of the given list, followed by
	 * the given element.
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

	$.append = f.function.curryN(2, (el, list) => (
		concat(list, [el])
	))

	/**
	 * Returns the result of concatenating the given arrays or strings.
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
	$.concat = f.function.curryN(2, (a = [], b = []) => {
		if (isArray(a)) {
				return a.concat(b);
		}

		return a + b;
	})

	/**
	 * Returns the array of all elements in the first array not
	 * contained in the second array.
	 *
	 * @param {Array} a The first array.
	 * @param {Array} b The second array.
	 * @return {Array} The elements in `a` that are not in `b`.
	 * @example
	 *
	 *      difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
	 *      difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
	 */
	$.diff = f.function.curryN(2, (a = [], b = []) => {
		const result = [];

		for (let i = 0; i < a.length; i++) {
				if (b.indexOf(a[i]) < 0) {
						result.push(a[i]);
				}
		}

		return result;
	})

	/**
	 * Returns the elements of the given list or string (or object with a `slice`
	 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	 *
	 * @param {Number} fromIndex The start index (inclusive).
	 * @param {Number} toIndex The end index (exclusive).
	 * @param {Array | String} list
	 * @return {Array | String}
	 * @example
	 *
	 *      slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	 *      slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	 *      slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	 *      slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	 */

	$.slice = f.function.curryN(3, (fromIndex, toIndex, list = []) => list.slice(fromIndex, toIndex));

})