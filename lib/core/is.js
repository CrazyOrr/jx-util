module.exports = (function ( f ) {

	// For internal API
	f.isisnt = f.IsIsnt = {}

	f.is = f.Is = {}
	f.isnt = f.Isnt = {}

	f.is.instanceof = function ( ClassToEval, instance ) {
		return instance && instance.constructor ? instance.constructor === ClassToEval : instance instanceof ClassToEval
	}
	f.isnt.instanceof = function ( ClassToEval, instance ) {
		return instance && instance.constructor ? instance.constructor !== ClassToEval : ! ( instance instanceof ClassToEval )
	}

	var register = f.IsIsnt.register = function ( ClassToEval, keys ) {
			if( ! ClassToEval ) return

			var isFn = function ( instance ) {
					return f.is.instanceof( ClassToEval, instance )
				},
				isntFn = function ( instance ) {
					return f.isnt.instanceof( ClassToEval, instance )
				};

			if( typeof keys !== 'object' ) {
				keys = [ keys ]
			}

			keys.forEach(function ( key ) {
				f.is[ key ] = isFn
				f.isnt[ key ] = isntFn
			})
		},
		registerCustom = f.IsIsnt.registerCustom = function ( keys, isFn, isntFn ) {

			if( f.isnt.function( isFn ) ) {
				throw new TypeError("isFn must be a function")
			}

			if( f.isnt.function( isntFn ) ) {
				isntFn = function ( instance ) {
					return ! isFn( instance )
				};
			}

			if( typeof keys !== 'object' ) {
				keys = [ keys ]
			}

			keys.forEach(function ( key ) {
				f.is[ key ] = isFn
				f.isnt[ key ] = isntFn
			})

		}

	// Default Javascript Classes

	register( Function, [ 'Function', 'function' ] )
	register( Array, [ 'Array', 'array' ] )
	register( Object, [ 'Object', 'object' ] )
	register( String, [ 'String', 'string' ] )
	register( Error, [ 'Error', 'error' ] )
	register( RegExp, [ 'RegExp', 'Regexp', 'regExp', 'regexp' ] )

	// Default Browser Classes
	if( typeof HTMLElement !== 'undefined' ) {
		register( HTMLElement, [ 'HTMLElement', 'HTMLelement' ] )
	}

	// Custom evaluators

	// 判断是否为一个数字
	registerCustom( [ 'numeric', 'number', 'Number' ], function ( variable ) {

		// Parse it to a number if it isn't
		variable = typeof variable === 'number' ? variable : parseInt( variable )

		// We don't want to tell that "Not a Number" is a Number...
		return ! isNaN( variable )

		// 另一个方法
		// return !isNaN(parseFloat(value)) && isFinite(value)
	})
	registerCustom( [ 'undefined', 'Undefined', 'notDefined', 'notdefined' ], function ( variable ) {
		return typeof variable === 'undefined'
	})
	registerCustom( [ 'true' ], function ( variable ) {
		return variable === true
	})
	registerCustom( [ 'false' ], function ( variable ) {
		return variable === false
	})
	registerCustom( [ 'Null', 'null', 'NULL' ], function ( variable ) {
		return variable === null
	})
	registerCustom( [ 'json', 'JSON', 'Json' ], function ( variable ) {
		if (/^[\],:{}\s]*$/
				.test( variable
					.replace( /\\["\\\/bfnrtu]/g, '@')
					.replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']' )
					.replace( /(?:^|:|,)(?:\s*\[)+/g, '' )
				)
			) return true

		return false
	})

	// 判断布尔值
	registerCustom( ['Boolean', 'bool', 'boolean'], val => Object.prototype.toString.call(val) == "[object Boolean]")

	// 判断是否为Symbol
	registerCustom( ['Symbol', 'symbol'], val => Object.prototype.toString.call(val) == "[object Symbol]")

	registerCustom( ['Date', 'date'], val => Object.prototype.toString.call(val).slice(8, -1) === "Date")

	registerCustom( ['Promise', 'promise'], val => Object.prototype.toString.call(val).slice(8, -1) === "Promise")

	registerCustom( ['bad'], val => {
		if (
      val == "" ||
      val == undefined ||
      val == null ||
      val == "null" ||
      val == "undefined" ||
      val == 0 ||
      val == false ||
      val == NaN
    )
      return true
    return false
	})

	registerCustom( ['ok'], val => {
		if (
      val == "" ||
      val == undefined ||
      val == null ||
      val == "null" ||
      val == "undefined" ||
      val == 0 ||
      val == false ||
      val == NaN
    )
      return false
    return true
	})
})
