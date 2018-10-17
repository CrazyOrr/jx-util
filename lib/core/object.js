module.exports = (function ( f ) {
	var $ = f.Object = f.Object = {}

	// is and isnt
	$.is = f.is.Object
	$.isnt = f.isnt.Object

	$.forEach = $.each = function ( object, fn, context ) {

		if ( f.isnt.Object( object ) ) {
			throw new TypeError("object must be an object")
		}
		if ( f.isnt.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}

		var i;

		for( i in object ) {
			if ( object.hasOwnProperty( i ) ) {
				fn.call( context || object, object[ i ], i, object )
			}
		}

		return object
	}

	$.map = function ( object, fn, context ) {

		if ( f.isnt.Function( fn ) ) {
			throw new TypeError("fn must be a function")
		}

		var res = {}

		f.each( object, function ( v, k ) {
			res[ k ] = fn.call( context || object, v, k, object )
		});

		return res
	}

	$.filter = function ( object, fn, context ) {

		if ( f.isnt.Object( object ) ) {
			throw new TypeError("object must be an object");
		}
		if ( f.isnt.Function( fn ) ) {
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

	$.isType = function isType(o, type) {
		if (type) {
				var _type = type.toLowerCase();
		};
		switch (_type) {
				case 'string':
						return Object.prototype.toString.call(o) === '[object String]';
				case 'number':
						return Object.prototype.toString.call(o) === '[object Number]';
				case 'boolean':
						return Object.prototype.toString.call(o) === '[object Boolean]';
				case 'undefined':
						return Object.prototype.toString.call(o) === '[object Undefined]';
				case 'null':
						return Object.prototype.toString.call(o) === '[object Null]';
				case 'function':
						return Object.prototype.toString.call(o) === '[object Function]';
				case 'array':
						return Object.prototype.toString.call(o) === '[object Array]';
				case 'object':
						return Object.prototype.toString.call(o) === '[object Object]';
				case 'nan':
						return isNaN(o);
				case 'elements':
						return Object.prototype.toString.call(o).indexOf('HTML') !== -1;
				default:
						return Object.prototype.toString.call(o);
		}
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
	
	// 判断`obj`是否为空
	$.isEmpty = function isEmpty(obj) {
		if (!obj || typeof obj !== 'object' || Array.isArray(obj))
				return false;
		return !Object.keys(obj).length;
	}

	// cleanObj: 移除从 JSON 对象指定的属性之外的任何特性
	// 使用Object.keys()方法可以遍历给定的 json 对象并删除在给定数组中不是included 的键。另外, 如果给它一个特殊的键 (childIndicator), 它将在里面深入搜索, 并将函数应用于内部对象
	$.cleanObj = (obj, keysToKeep = [], childIndicator) => {
		let o = obj, k = keysToKeep, c = childIndicator;
		_cleanObj = (_obj, _keysToKeep = [], _childIndicator ) => {
			Object.keys(_obj).forEach(key => {
				if(key === _childIndicator){
					_cleanObj(_obj[key], _keysToKeep, _childIndicator);
				}
				else if(!_keysToKeep.includes(key)){
					delete _obj[key];
				}
			})
		}
		return _cleanObj(o, k, c)
	}

	// objectFromParis: 从给定的键值对创建对象
	// 使用Array.reduce()创建和组合键值对
	$.objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {})

	// objectToPairs: 从对象创建键值对数组
	// 使用Object.keys()和Array.map()循环访问对象的键并生成具有键值对的数组
	$.objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]])

	// shallowClone: 创建对象的浅复制
	// 使用Object.assign()和一个空对象 ({}) 创建原始的浅克隆
	$.shallowClone = obj => Object.assign({}, obj)

	// truthCheckCollection: 检查谓词 (第二个参数) 是否 truthy 集合的所有元素 (第一个参数)
	// 使用Array.every()检查每个传递的对象是否具有指定的属性, 以及是否返回 truthy值
	$.truthCheckCollection = (collection, pre) => (collection.every(obj => obj[pre]))
})
