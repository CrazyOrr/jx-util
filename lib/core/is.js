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

	registerCustom( ['bad', 'not'], val => {
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

	/* isPlainObject({ a: 'test' }); // => true
		*
		* isPlainObject(moment()); // => false
		*
		* isPlainObject(<span></span>); // => false
		*/
	registerCustom( ['plain', 'PlainObject', 'plainObject'], function isPlainObject(test) {
    if (!f.is.object(test)) {
        return false;
    }

    const prototype = Object.getPrototypeOf(test);

    if (prototype === null) {
        // objects created with Object.create(null) are still plain objects
        return true;
    }

    if (prototype !== Object.prototype) {
        // has a custom prototype, probably was created with a custom constructor,
        // may contain internal data that's not meant to be accessed from outside
        return false;
    }

    return true;
	})

	/**
	 * Checks if `test` is empty.
	 *
	 * @param {*} test The value to check.
	 * @returns {boolean} Returns `true` if `test` is empty, else `false`.
	 * @example
	 *
	 * isEmpty([]); // => true
	 * isEmpty(null); // => true
	 * isEmpty({}); // => true
	 * isEmpty(''); // => true
	 * isEmpty('test'); // => false
	 * isEmpty({ a: 5 }); // => false
	 * isEmpty([1]); // => false
	 */
	registerCustom( ['empty', 'Empty'], test => {
		switch (true) {
				case f.is.null(test):
						return true;
				case f.is.String(test):
						return test === '';
				case f.is.Array(test):
						return test.length === 0;
				case f.is.Object(test):
						return Object.keys(test).length === 0;
		}

		return false;
	})


	const isEqualNativeTypes = (test1, test2) => test1.toString() === test2.toString()
	const isEqualArrays = (test1, test2) => {
		const len = test1.length
		if (len !== test2.length) {
			return false
		}
		for (let i = 0; i < len; i++) {
			if (!isEqual(test1[i], test2[i])) {
				return false
			}
		}

		return true
	}

	const isEqualObjects = (test1, test2) => {
		const keys = Object.keys(test1)
		const len = keys.length
		if (len !== Object.keys(test2).length) {
			return false
		}

		for (let i = 0; i < len; i++) {
			const key = keys[i]

			if (!(Object.prototype.hasOwnProperty.call(test2, key) && isEqual(test1[key], test2[key]))) {
				return false
			}
		}

		return true
	}

	/**
	* Returns `true` if its arguments are equivalent, `false` otherwise.
	*
	* @param {*} test1
	* @param {*} test2
	* @return {Boolean}
	* @example
	*
	*      isEqual(1, 1); //=> true
	*      isEqual(1, '1'); //=> false
	*      isEqual([1, 2, 3], [1, 2, 3]); //=> true
	*      isEqual({ a: { b: 1 }}, { a: { b: 1 }}); //=> true
	*/
	const isEqual = (test1, test2) => {
		if (test1 === test2) {
			return true;
		}

		if (typeof test1 !== typeof test2
				|| test1 !== Object(test1)
				|| !test1
				|| !test2) {
			return false
		}

		if (f.is.Array(test1) && f.is.Array(test2)) {
			return isEqualArrays(test1, test2)
		}

		const test1ToString = Object.prototype.toString.call(test1)

		if (test1ToString === '[object Object]' && Object.prototype.toString.call(test2) === test1ToString) {
			return isEqualObjects(test1, test2)
		}

		return isEqualNativeTypes(test1, test2)
	}

	registerCustom( ['equal'], f.function.curry(isEqual))
})
