module.exports = (function ( f ){

  var $ = f

	$.uniqId = function () {
		return Math.floor( Math.random() * 11 ) +''+ Math.floor( Math.random() * 1000000 )
	}

	$.uuid = (function() {
		var s4 = function () {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1)
		}

		return function() {
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4()
		}
	})()

	/**
	 * @desc 测量执行函数所用的时间
	 * 1. console.time()和console.timeEnd(), 只能在控制台输出计时时间，但不能返回输出内容，也就不能赋给变量保存
	 * 2. window.performance.now() 
	 */
	$.timing = callback => {
		let start = Date.now()
		
		const r = callback()

		let end = Date.now()
		return end - start
	},

  $.forEach = $.each = function ( o, fn, context ) {
		if( f.is.Array( o ) ) {
			return f.array.each.apply( null, arguments )
		}
		if( f.is.Object( o ) ) {
			return f.object.each.apply( null, arguments )
		}

		return false
	}

	$.map = function ( o, fn, context ) {
		if ( !f.is.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}
		if( f.is.Array( o ) ) {
			return $.Array.map.apply( null, arguments )
		}
		if( f.is.Object( o ) ) {
			return f.object.map.apply( null, arguments )
		}

		return false
	}

	$.filter = function ( o, fn, context ) {
		if ( !f.is.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}
		if( f.is.Array( o ) ) {
			return f.array.filter.apply( null, arguments )
		}
		if( f.is.Object( o ) ) {
			return f.object.filter.apply( null, arguments )
		}

		return false
	}

	$.clone = function ( obj ) {
		var clone = {}
		clone.constructor = obj.constructor
		clone.prototype = obj.prototype
		return f.extend( clone, obj )
	}

	$.extend = function ( target ) {
		var srcs,
			r = false,
			i, j, len, src

		if ( target === true) {
			target = arguments[1]
			r = true
			srcs = Array.prototype.slice.call(arguments, 2)
		} else {
			srcs = Array.prototype.slice.call(arguments, 1)
		}

		for ( j = 0, len = srcs.length; j < len; j++ ) {
			src = srcs[j]
			for ( i in src ) {
				if ( r && typeof target[i] == 'object' )
					this.extend( target[i], src[i] )
				else
					target[i] = src[i]
			}
		}
		return target
	}

	$.slice = function ( target, start, end ) {
		if ( f.is.Function( target.slice ) ) {
			return target.slice( start, end )
		}
		if ( f.is.Object( target ) ) {
			var keys = Object.keys( target ).slice( start, end )

			return f.filter( target, function ( value, key ) {
				return keys.indexOf( key ) !== -1
			});
		}

		return []
	}

	$.stamp = (function () {
		var last_id = 0

		return function ( obj ) {
			obj._id = obj._id || ++last_id
			return obj._id
		}
	})()

	/**
	 * @example
	 *
	 *      type({}); //=> "Object"
	 *      type(1); //=> "Number"
	 *      type(false); //=> "Boolean"
	 *      type('s'); //=> "String"
	 *      type(null); //=> "Null"
	 *      type([]); //=> "Array"
	 *      type(/[A-z]/); //=> "RegExp"
	 */
	$.type = x => {
    if (x === null) {
			return 'Null'
    }

    if (x === undefined) {
			return 'Undefined'
    }

    return Object.prototype.toString.call(x).slice(8, -1)
	}
})
