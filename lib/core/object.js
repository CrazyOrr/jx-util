"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (f) {
	var $ = f.object = f.obj = {};

	$.forEach = $.each = function (object, fn, context) {
		if (!f.is.Object(object)) {
			throw new TypeError("object must be an object");
		}
		if (!f.is.Function(fn)) {
			throw new TypeError("fn must be a function");
		}

		var i;

		for (i in object) {
			if (object.hasOwnProperty(i)) {
				fn.call(context || object, object[i], i, object);
			}
		}

		return object;
	};

	$.map = function (object, fn, context) {

		if (!f.is.Function(fn)) {
			throw new TypeError("fn must be a function");
		}

		var res = {};

		f.each(object, function (v, k) {
			res[k] = fn.call(context || object, v, k, object);
		});

		return res;
	};

	$.filter = function (object, fn, context) {
		if (!f.is.Object(object)) {
			throw new TypeError("object must be an object");
		}
		if (!f.is.Function(fn)) {
			throw new TypeError("fn must be a function");
		}

		var res = {};

		f.each(object, function (v, k) {
			if (fn.call(context || object, v, k, object)) {
				res[k] = object[k];
			}
		});

		return res;
	};

	$.isEmpty = function (obj) {
		if (!obj || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || Array.isArray(obj)) return false;
		return !Object.keys(obj).length;
	};

	/**
  * @desc 移除从 JSON 对象指定的属性之外的任何特性
  * 
  * @param childIndicator 特殊的键, 在里面深入搜索, 并将函数应用于内部对象
  */
	$.clean = function (obj) {
		var keysToKeep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var childIndicator = arguments[2];

		var o = obj,
		    k = keysToKeep,
		    c = childIndicator;

		_cleanObj = function (_cleanObj2) {
			function _cleanObj(_x3) {
				return _cleanObj2.apply(this, arguments);
			}

			_cleanObj.toString = function () {
				return _cleanObj2.toString();
			};

			return _cleanObj;
		}(function (_obj) {
			var _keysToKeep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			var _childIndicator = arguments[2];

			Object.keys(_obj).forEach(function (key) {
				if (key === _childIndicator) {
					_cleanObj(_obj[key], _keysToKeep, _childIndicator);
				} else if (!_keysToKeep.includes(key)) {
					delete _obj[key];
				}
			});
		});

		_cleanObj(o, k, c);
	};

	/**
  * @desc 从给定的键值对创建对象
  */
	$.fromPairs = function (arr) {
		return arr.reduce(function (a, v) {
			return a[v[0]] = v[1], a;
		}, {});
	};

	/**
  * @desc 从对象创建键值对数组
  * 
  * @example
  * 
  * 		toPairs({a: 1, b: 2, c: 3})
  * 		=>
  * 		[['a', 1], ['b', 2], ['c', 3]]
  */
	$.toPairs = function (obj) {
		return Object.keys(obj).map(function (k) {
			return [k, obj[k]];
		});
	};

	/**
  * @desc 创建对象的浅复制
  */
	$.shallowClone = function (obj) {
		return Object.assign({}, obj);
	};
	$.clone = function deepClone(values) {
		var copy;
		// Handle the 3 simple types, and null or undefined
		if (null == values || "object" != (typeof values === "undefined" ? "undefined" : _typeof(values))) return values;
		// Handle Date
		if (values instanceof Date) {
			copy = new Date();
			copy.setTime(values.getTime());
			return copy;
		};
		// Handle Array
		if (values instanceof Array) {
			copy = [];
			for (var i = 0, len = values.length; i < len; i++) {
				copy[i] = deepClone(values[i]);
			}
			return copy;
		};
		// Handle Object
		if (values instanceof Object) {
			copy = {};
			for (var attr in values) {
				if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
			}
			return copy;
		}
		throw new Error("Unable to copy values! Its type isn't supported.");
	};

	/**
  * @desc equal to hasOwnProperty
  */
	$.has = f.function.curryN(2, function (prop, obj) {
		return obj != null && Object.prototype.hasOwnProperty.call(obj, prop);
	});

	/**
  * @desc 扩展，返回原有对象
  */
	$.extend = f.function.curryN(2, function (src) {
		for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			sources[_key - 1] = arguments[_key];
		}

		return Object.assign.apply(Object, [src].concat(sources));
	});

	/**
  * @desc 合并差集
  */
	$.mergeDiff = function (src, dst) {
		if (!src) src = {};
		if (!dst || f.object.isEmpty(dst)) return src;

		f.each(dst, function (v, k) {
			if (!src[k]) {
				src[k] = v;
			}
		});

		return src;
	};
	/**
  * @desc 合并，返回新的对象
  */
	$.merge = f.function.curryN(2, function () {
		for (var _len2 = arguments.length, sources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			sources[_key2] = arguments[_key2];
		}

		return Object.assign.apply(Object, [{}].concat(sources));
	});

	var mergeDeep = function mergeDeep() {
		for (var _len3 = arguments.length, sources = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			sources[_key3] = arguments[_key3];
		}

		var result = Object.assign(isArray(sources[0]) ? [] : {}, sources[0] || {});

		for (var i = 1; i < sources.length; i++) {
			var src = sources[i];

			if (!src) {
				continue;
			}

			var keys = f.object.keys(src);

			for (var j = 0; j < keys.length; j++) {
				var key = keys[j];
				var value = src[key];
				var res = result[key];

				if (isPlainObject(res) && isPlainObject(value)) {
					result[key] = f.object.mergeDeep(res, value);
				} else {
					result[key] = value;
				}
			}
		}

		return result;
	};

	/**
  * @desc 深度合并
  */
	$.mergeDeep = f.function.curryN(2, mergeDeep);

	// mergeWith((x, y) => x + y, { 'name': 'fred', 'age': 10 }, { 'age': 40 }); //=> { 'name': 'fred', 'age': 50 }
	$.mergeWith = f.function.curryN(3, function (fn) {
		for (var _len4 = arguments.length, sources = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			sources[_key4 - 1] = arguments[_key4];
		}

		var result = Object.assign({}, sources[0]);

		for (var i = 1; i < sources.length; i++) {
			var source = sources[i];
			var keys = f.object.keys(source);

			for (var j = 0; j < keys.length; j++) {
				var key = keys[j];

				if (Object.prototype.hasOwnProperty.call(result, key)) {
					result[key] = fn(result[key], source[key], key, result, source);
				} else {
					result[key] = source[key];
				}
			}
		}

		return result;
	});

	/**
  * @desc 返回键数组
  */
	$.keys = function (obj) {
		return f.is.object(obj) ? Object.keys(obj) : [];
	};

	/**
  * @desc 返回值数组
  */
	$.values = function (obj) {
		var keys = f.object.keys(obj);
		var len = keys.length;
		var values = new Array(len);

		for (var i = 0; i < len; i++) {
			values[i] = obj[keys[i]];
		}

		return values;
	};

	/**
  * @desc 返回键值 pairs
  */
	$.entries = function (obj) {
		var arr = [];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var key = _step.value;

				arr.push([key, obj[key]]);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return arr;
	};

	/**
  * @desc 对象键值对的数目
  */
	$.size = function (obj) {
		return f.object.objectKeys(obj).length;
	};

	/**
  * Returns a partial copy of an object containing only the keys specified. If
  * the key does not exist, the property is ignored.
  *
  * @param {[String]} props an array of String property names to copy onto a new object
  * @param {Object} obj The object to copy from
  * @return {Object} A new object with only properties from `names` on it.
  * @example
  *
  *      pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
  *      pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
  */
	$.pick = f.function.curryN(2, function () {
		var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var result = {};

		for (var i = 0; i < props.length; i++) {
			var _prop = props[i];

			if (_prop in obj) {
				result[_prop] = obj[_prop];
			}
		}

		return result;
	});

	// omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
	$.omit = f.function.curryN(2, function () {
		var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var result = {};
		var keys = f.object.keys(obj);

		for (var i = 0; i < keys.length; i++) {
			var _prop2 = keys[i];

			if (props.indexOf(_prop2) === -1) {
				result[_prop2] = obj[_prop2];
			}
		}

		return result;
	});

	/**
  * @desc 
  */
	$.prop = f.function.curryN(2, function (prop, obj) {
		return obj != null ? obj[prop] : undefined;
	});

	/**
  * Returns the result of `fn` with value of property in `obj`.
  *
  * @param {String} propName The property name to apply.
  * @param {Function} fn function to apply
  * @param {Object} obj The object to retrieve the property from.
  * @return {*} result of calling fn with property.
  *
  * @example
  *
  *      propApply('a', x => 'is ' + x, {a: 2}); //=> is 2
  *      propApply('b', x => x > 0, {b: 2}); //=> true
  */
	$.propApply = f.function.curryN(3, function (propName, fn, obj) {
		return fn(prop(propName, obj));
	});

	/**
  * Returns `true` if the specified object property is equal to the given value; `false` otherwise.
  *
  * @param {String} propName
  * @param {*} value
  * @param {*} obj
  * @return {Boolean}
  * @example
  *
  *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
  *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
  *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
  *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
  *      var kids = [abby, fred, rusty, alois];
  *      var hasBrownHair = propEq('hair', 'brown');
  *      filter(hasBrownHair, kids); //=> [fred, rusty]
  */
	$.propEq = f.function.curryN(3, function (propName, value, obj) {
		return f.object.prop(propName, obj) === value;
	});

	/**
  * @desc 可以直接用 delete，注意使用结果！
  */
	$.propDel = function (obj, propName) {
		delete obj[propName];
	};
};