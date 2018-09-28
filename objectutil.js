/**
 * @desc   数据类型判断
 * @param  {Object} o
 * @param  {Object} obj
 * @return {Boolean}
 */
function isType(o, type) {
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

/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
function deepClone(values) {
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

/**
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmpty(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj))
      return false;
  return !Object.keys(obj).length;
}

module.exports = {
  isType,
  deepClone,
  isEmpty
}