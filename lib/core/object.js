module.exports = (function ( f ) {
	var $ = f.object = {}

	$.forEach = $.each = function ( object, fn, context ) {
		if ( !f.is.Object( object ) ) {
			throw new TypeError("object must be an object")
		}
		if ( !f.is.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}

		var i

		for( i in object ) {
			if ( object.hasOwnProperty( i ) ) {
				fn.call( context || object, object[ i ], i, object )
			}
		}

		return object
	}

	$.map = function ( object, fn, context ) {

		if ( !f.is.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}

		var res = {}

		f.each( object, function ( v, k ) {
			res[ k ] = fn.call( context || object, v, k, object )
		});

		return res
	}

	$.filter = function ( object, fn, context ) {
		if ( !f.is.Object( object ) ) {
			throw new TypeError("object must be an object");
		}
		if ( !f.is.Function( fn ) ) {
			throw new TypeError("fn must be a function");
		}

		var res = {}

		f.each( object, function ( v, k ) {
			if( fn.call( context || object, v, k, object ) ) {
				res[ k ] = object[ k ]
			}
		})

		return res
	}
	
	$.clone = function deepClone(values) {
		var copy;
		// Handle the 3 simple types, and null or undefined
		if (null == values || "object" != typeof values) return values;
		// Handle Date
		if (values instanceof Date) {
				copy = new Date();
				copy.setTime(values.getTime())
				return copy
		};
		// Handle Array
		if (values instanceof Array) {
				copy = [];
				for (var i = 0, len = values.length; i < len; i++) {
						copy[i] = deepClone(values[i]);
				};
				return copy;
		};
		// Handle Object
		if (values instanceof Object) {
				copy = {};
				for (var attr in values) {
						if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
				};
				return copy;
		};
		throw new Error("Unable to copy values! Its type isn't supported.");
	}
	
	$.isEmpty = function (obj) {
		if (!obj || typeof obj !== 'object' || Array.isArray(obj))
				return false;
		return !Object.keys(obj).length;
	}

	/**
	 * @desc 移除从 JSON 对象指定的属性之外的任何特性
	 * 
	 * @param childIndicator 特殊的键, 在里面深入搜索, 并将函数应用于内部对象
	 */
	$.clean = (obj, keysToKeep = [], childIndicator) => {
		let o = obj, k = keysToKeep, c = childIndicator

		_cleanObj = (_obj, _keysToKeep = [], _childIndicator ) => {
			Object.keys(_obj).forEach(key => {
				if(key === _childIndicator) {
					_cleanObj(_obj[key], _keysToKeep, _childIndicator)
				}
				else if(!_keysToKeep.includes(key)) {
					delete _obj[key]
				}
			})
		}
		
		_cleanObj(o, k, c)
	}

	/**
	 * @desc 从给定的键值对创建对象
	 */
	$.fromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {})

	/**
	 * @desc 从对象创建键值对数组
	 * 
	 * @example
	 * 
	 * 		toPairs({a: 1, b: 2, c: 3})
	 * 		=>
	 * 		[['a', 1], ['b', 2], ['c', 3]]
	 */
	$.toPairs = obj => Object.keys(obj).map(k => [k, obj[k]])

	/**
	 * @desc 创建对象的浅复制
	 */
	$.shallowClone = obj => Object.assign({}, obj)

	/**
	 * @desc 检查谓词 (第二个参数) 是否 truthy 集合的所有元素 (第一个参数)
	 */
	$.truthCheckCollection = (collection, pre) => (collection.every(obj => obj[pre]))

	/**
	 * @desc equal to hasOwnProperty
	 */
	$.has = f.function.curryN(2, (prop, obj) =>
		obj != null && Object.prototype.hasOwnProperty.call(obj, prop)
	)

	/**
	 * @desc 类似于map
	 */
	$.keyBy = f.function.curryN(2, (fn, obj = {}) => {
			const result = {}
			const keys = f.object.keys(obj)

			for (let i = 0; i < keys.length; i++) {
					const key = keys[i]
					const groupValue = fn(obj[key], key, obj)

					result[groupValue] = obj[key]
			}

			return result;
	});

	/**
	 * @desc 合并
	 */
	$.merge = f.function.curryN(2, (...sources) => Object.assign({}, ...sources))

	const mergeDeep = (...sources) => {
    const result = Object.assign(isArray(sources[0]) ? [] : {}, sources[0] || {});

    for (let i = 1; i < sources.length; i++) {
        const src = sources[i];

        if (!src) {
            continue;
        }

        const keys = f.object.keys(src);

        for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            const value = src[key];
            const res = result[key];

            if (isPlainObject(res) && isPlainObject(value)) {
                result[key] = f.object.mergeDeep(res, value);
            } else {
                result[key] = value;
            }
        }
    }

    return result;
	}

	/**
	 * @desc 深度合并
	 */
	$.mergeDeep = f.function.curryN(2, mergeDeep)

	// mergeWith((x, y) => x + y, { 'name': 'fred', 'age': 10 }, { 'age': 40 }); //=> { 'name': 'fred', 'age': 50 }
	$.mergeWith = f.function.curryN(3, (fn, ...sources) => {
    const result = Object.assign({}, sources[0]);

    for (let i = 1; i < sources.length; i++) {
        const source = sources[i];
        const keys = f.object.keys(source);

        for (let j = 0; j < keys.length; j++) {
            const key = keys[j];

            if (Object.prototype.hasOwnProperty.call(result, key)) {
                result[key] = fn(result[key], source[key], key, result, source);
            } else {
                result[key] = source[key];
            }
        }
    }

    return result;
	})

	/**
	 * @desc 返回键数组
	 */
	$.keys = obj => f.is.object(obj) ? Object.keys(obj) : []

	/**
	 * @desc 返回值数组
	 */
	$.values = obj => {
		const keys = f.object.keys(obj)
		const len = keys.length
		const values = new Array(len)

		for (let i = 0; i < len; i++) {
			values[i] = obj[keys[i]]
		}

		return values
	}

	/**
	 * @desc 返回键值 pairs
	 */
	$.entries = function (obj) {
		let arr = []
		for (let key of Object.keys(obj)) {
			arr.push([key, obj[key]])
		}
		return arr
	}
	

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
	$.pick = f.function.curryN(2, (props = [], obj = {}) => {
    const result = {};

    for (let i = 0; i < props.length; i++) {
        const prop = props[i];

        if (prop in obj) {
            result[prop] = obj[prop];
        }
    }

    return result;
	})

	// omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
	$.omit = f.function.curryN(2, (props = [], obj = {}) => {
			const result = {};
			const keys = f.object.keys(obj);

			for (let i = 0; i < keys.length; i++) {
					const prop = keys[i];

					if (props.indexOf(prop) === -1) {
							result[prop] = obj[prop];
					}
			}

			return result;
	});

	/**
	 * @desc 
	 */
	$.prop = f.function.curryN(2, (prop, obj) =>
		obj != null ? obj[prop] : undefined
	)

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
	$.propApply = f.function.curryN(3, (propName, fn, obj) =>
		fn(prop(propName, obj))
	)

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
	$.propEq = f.function.curryN(3, (propName, value, obj) => f.object.prop(propName, obj) === value);

	/**
	 * @desc
	 */
	$.size = obj => f.object.objectKeys(obj).length
})
