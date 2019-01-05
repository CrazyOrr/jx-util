
// var BaseClass= function(){
//   this.code = 1000
// }
// class TestClass extends BaseClass {
// }
// var t = new TestClass()
// console.log(t.code)

import HashMap from '../struct/hashmap'

var Service = function () {
  this.runnable = false
}
var _clzz = Service

_clzz.services = new HashMap()
_clzz.register = function (name, target) {
  this.services.put(name, target);
}

_clzz.get = function (name) {
  return this.services.get(name)
}

var _inst = _clzz.prototype

/**
 * @desc 获取服务
 */
_inst.get = function () {
  return this
}

/**
 * @desc 服务是否安装
 */
_inst.installed = function () {
  return false
}

/**
 * 服务热启动
 */
_inst.powerOn = function () {
  this.runnable = true
}

/**
 * 服务热关闭
 */
_inst.powerOff = function () {
  this.runnable = false
}

module.exports = _clzz