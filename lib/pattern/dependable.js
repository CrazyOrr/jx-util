var utils = require('../string')
var Asyncable = require('./asyncable')
var HashMap = require('../struct/hashmap')

var _clz = Dependable = function () {
  this.map = new HashMap()
}

const _inst = _clz.prototype;
_inst.$ = _clz;

_inst.ready = function (eventName) {
  // 如果监测在前
  var asyncable = this.map.get(eventName)

  if (asyncable) {
    asyncable.then()
  } else {
    this.map.put(eventName, new Asyncable(true))
  }
  
}

/**
 * @desc 同步检查
 * @param eventName 'ready'
 * @return Promise对象
 */
_inst.when = function (eventName) {
  // 如果分发在前
  var asyncable = this.map.get(eventName)

  // console.log(this.map.toString(), ',', asyncable)
// return Promise.resolve(1);

  if (asyncable) {
    return asyncable.promisely()
  } else {
    asyncable = new Asyncable()

    this.map.put(eventName, asyncable)

    return asyncable.promisely()
  }
}

module.exports = _clz