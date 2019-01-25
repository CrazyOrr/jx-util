'use strict';

var Asyncable = require('./asyncable');
var HashMap = require('../struct/hashmap');

var Dependable = function Dependable() {
  this.map = new HashMap();
};

var _clz = Dependable;
var _inst = _clz.prototype;
_inst.$ = _clz;

_inst.fire = _inst.ready = function (eventName) {
  // 如果监测在前
  var asyncable = this.map.get(eventName);

  if (asyncable) {
    asyncable.then();
  } else {
    this.map.put(eventName, new Asyncable(true));
  }
};

/**
 * @desc 同步检查
 * @param eventName 'ready'
 * @return Promise对象
 */
_inst.when = _inst.is = function (eventName) {
  // 如果分发在前
  var asyncable = this.map.get(eventName);

  if (asyncable) {
    return asyncable.promisely();
  } else {
    asyncable = new Asyncable();

    this.map.put(eventName, asyncable);

    return asyncable.promisely();
  }
};

module.exports = _clz;