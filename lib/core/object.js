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
				copy.setTime(values.getTime());
				return copy;
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
})
