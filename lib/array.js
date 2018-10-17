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
})