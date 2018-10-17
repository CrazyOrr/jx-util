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
			s4() + '-' + s4() + s4() + s4();
		}
	})()

	// timeTaken: 测量执行函数所用的时间
	// 使用console.time()和console.timeEnd()来测量开始和结束时间之间的差异, 以确定回调执行所用的时间
	$.timeTaken = callback => {
		console.time("timeTaken");
		const r = callback();
		console.timeEnd("timeTaken");
		return r;
	},

  $.forEach = $.each = function ( o, fn, context ) {

		if( f.is.Array( o ) ) {
			return f.Array.each.apply( null, arguments )
		}

		if( f.is.Object( o ) ) {
			return f.Object.each.apply( null, arguments )
		}

		return false
	}

	$.map = function ( o, fn, context ) {

		if ( f.isnt.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}

		if( f.is.Array( o ) ) {
			return $.Array.map.apply( null, arguments )
		}

		if( f.is.Object( o ) ) {
			return f.Object.map.apply( null, arguments )
		}

		return false
	}

	$.filter = function ( o, fn, context ) {

		if ( f.isnt.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}

		if( f.is.Array( o ) ) {
			return f.Array.filter.apply( null, arguments )
		}

		if( f.is.Object( o ) ) {
			return f.Object.filter.apply( null, arguments )
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

		if ( target === true){
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

  // TODO:
	// f.log = console.log

})
