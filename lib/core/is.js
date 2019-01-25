'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (f) {
	f.is = {};

	// 注意：还未确认：the Function data-type is an instance of the Object data-type

	f.is.instanceof = function (ClassToEval, instance) {
		// 字符串 特例
		// !!'' false
		// !!"" false
		if (ClassToEval === String && typeof instance === 'string' && instance.constructor === String) {
			return true;
		}

		// 常规类型判断
		return instance && instance.constructor ? instance.constructor === ClassToEval : instance instanceof ClassToEval;
	};

	var _register = function _register(ClassToEval, keys) {
		if (!ClassToEval) return;

		var isFn = function isFn(instance) {
			return f.is.instanceof(ClassToEval, instance);
		};

		if ((typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) !== 'object') {
			keys = [keys];
		}

		keys.forEach(function (key) {
			f.is[key] = isFn;
		});
	},
	    _registerCustom = function _registerCustom(keys, isFn) {

		if (!f.is.function(isFn)) {
			throw new TypeError("isFn must be a function");
		}

		if ((typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) !== 'object') {
			keys = [keys];
		}

		keys.forEach(function (key) {
			f.is[key] = isFn;
		});
	};

	// Default Javascript Classes

	_register(Function, ['Function', 'function']);
	_register(Array, ['Array', 'array']);
	_register(Object, ['Object', 'object']);
	_register(String, ['String', 'string']);
	_register(Error, ['Error', 'error']);
	_register(RegExp, ['RegExp', 'Regexp', 'regExp', 'regexp']);

	// Default Browser Classes
	if (typeof HTMLElement !== 'undefined') {
		_register(HTMLElement, ['HTMLElement', 'HTMLelement']);
	}

	// Custom evaluators

	// 判断是否为一个数字
	_registerCustom(['numeric', 'number', 'Number'], function (variable) {

		// Parse it to a number if it isn't
		variable = typeof variable === 'number' ? variable : parseInt(variable);

		// We don't want to tell that "Not a Number" is a Number...
		return !isNaN(variable);

		// 另一个方法
		// return !isNaN(parseFloat(value)) && isFinite(value)
	});
	_registerCustom(['undefined', 'Undefined'], function (variable) {
		return typeof variable === 'undefined';
	});
	/**
  * @example
  *
  *      isTrue(true) // => true
  *      isTrue('true') // => true
  *      isTrue([true]) // => false
  *      isTrue('false') // => false
  */
	_registerCustom(['true'], function (val) {
		return val === true || val === 'true';
	});
	_registerCustom(['false'], function (variable) {
		return variable === false;
	});
	_registerCustom(['Null', 'null', 'NULL'], function (variable) {
		return variable === null;
	});
	_registerCustom(['json', 'JSON'], function (variable) {
		if (/^[\],:{}\s]*$/.test(variable.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) return true;

		return false;
	});

	_registerCustom(['Boolean', 'bool', 'boolean'], function (val) {
		return Object.prototype.toString.call(val) == "[object Boolean]";
	});
	_registerCustom(['Symbol', 'symbol'], function (val) {
		return Object.prototype.toString.call(val) == "[object Symbol]";
	});
	_registerCustom(['Date', 'date'], function (val) {
		return Object.prototype.toString.call(val).slice(8, -1) === "Date";
	});
	_registerCustom(['Promise', 'promise'], function (val) {
		return Object.prototype.toString.call(val).slice(8, -1) === "Promise";
	});
	_registerCustom(['bad', 'not'], function (val) {
		if (val == "" || val == undefined || val == null || val == "null" || val == "undefined" || val == 0 || val == false || val == NaN) return true;
		return false;
	});

	_registerCustom(['ok'], function (val) {
		if (val == "" || val == undefined || val == null || val == "null" || val == "undefined" || val == 0 || val == false || val == NaN) return false;
		return true;
	});

	/* isPlainObject({ a: 'test' }); // => true
 	*
 	* isPlainObject(moment()); // => false
 	*
 	* isPlainObject(<span></span>); // => false
 	*/
	_registerCustom(['plain'], function isPlainObject(test) {
		if (!f.is.object(test)) {
			return false;
		}

		var prototype = Object.getPrototypeOf(test);

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
	});

	/**
  * @example
  *
  * 		is.empty(undefined); // => true
  * 		is.empty([]); // => true
  * 		is.empty(null); // => true
  * 		is.empty({}); // => true
  * 		is.empty(''); // => true
  * 		is.empty('test'); // => false
  * 		is.empty({ a: 5 }); // => false
  * 		is.empty([1]); // => false
  */
	_registerCustom(['empty', 'Empty'], function (test) {
		if (test === undefined) return true;

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
	});

	_registerCustom(['functionExists'], function (funcName) {
		try {
			if (typeof eval(funcName) == "function") {
				return true;
			}
		} catch (e) {}

		return false;
	});
	_registerCustom(['valExists'], function (variableName) {
		try {
			if (typeof variableName == "undefined") {
				return false;
			} else {
				return true;
			}
		} catch (e) {}

		return false;
	});

	var isEqualNativeTypes = function isEqualNativeTypes(test1, test2) {
		return test1.toString() === test2.toString();
	};
	var isEqualArrays = function isEqualArrays(test1, test2) {
		var len = test1.length;
		if (len !== test2.length) {
			return false;
		}
		for (var i = 0; i < len; i++) {
			if (!isEqual(test1[i], test2[i])) {
				return false;
			}
		}

		return true;
	};

	var isEqualObjects = function isEqualObjects(test1, test2) {
		var keys = Object.keys(test1);
		var len = keys.length;
		if (len !== Object.keys(test2).length) {
			return false;
		}

		for (var i = 0; i < len; i++) {
			var key = keys[i];
			if (!(Object.prototype.hasOwnProperty.call(test2, key) && isEqual(test1[key], test2[key]))) {
				return false;
			}
		}

		return true;
	};

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
	var isEqual = function isEqual(test1, test2) {
		if (test1 === test2) {
			return true;
		}

		if ((typeof test1 === 'undefined' ? 'undefined' : _typeof(test1)) !== (typeof test2 === 'undefined' ? 'undefined' : _typeof(test2)) || test1 !== Object(test1) || !test1 || !test2) {
			return false;
		}

		if (f.is.Array(test1) && f.is.Array(test2)) {
			return isEqualArrays(test1, test2);
		}

		var test1ToString = Object.prototype.toString.call(test1);

		if (test1ToString === '[object Object]' && Object.prototype.toString.call(test2) === test1ToString) {
			return isEqualObjects(test1, test2);
		}

		return isEqualNativeTypes(test1, test2);
	};

	_registerCustom(['equal'], f.function.curry(isEqual));
};