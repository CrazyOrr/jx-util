module.exports = (function ( f ) {
  var $ = f.Array = f.array = {}

  // is and isnt
	$.is = f.is.Array
  $.isnt = f.isnt.Arrays
  
  // 打乱数组顺序
  $.disorder = function disorder(arr) {
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

  // 数组扁平化
  $.flatten = function flatten(arr) {
    while (arr.some((item) => Array.isArray(item))) {
      arr = [].concat(...arr)
    }
    return arr
  }

  // 从数组中随机获取一个元素
  $.randomOne = function randomOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  // 数组去重
  $.deduplicate = function deduplicate(arr) {
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
})