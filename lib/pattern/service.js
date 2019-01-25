'use strict';

// var BaseClass= function(){
//   this.code = 1000
// }
// class TestClass extends BaseClass {
// }
// var t = new TestClass()
// console.log(t.code)

var HashMap = require('../struct/hashmap');
// let Stack = require('../struct/stack');
var Dependable = require('./dependable');

/**
 * @prop runnable
 * @prop dependable 服务内部特定事件依赖
 * @prop dependencies 外部服务依赖
 */
var Service = function Service() {
  this.runnable = false;
  // this.dependencies = new Stack();
  this.dependable = new Dependable();
  this.when = this;
};

// 类方法区域，所有类的共性

var _clzz = Service;
_clzz.services = new HashMap();
_clzz.register = function (name, target) {
  this.services.put(name, target);
};

_clzz.get = function (name) {
  return this.services.get(name);
};

// 实例方法区域，所有实例的共性

var _inst = _clzz.prototype;

/**
 * @desc 服务依赖
 */
_inst.depends = function () {
  return [];
};

/**
 * @desc 获取服务
 * @param name 获取服务，如果name为空，则获取的是自己
 */
_inst.of = function (name) {
  if (name) {
    return _clzz.get(name);
  }

  return this;
};

/**
 * @desc 服务是否安装
 */
_inst.installed = function () {
  return false;
};

/**
 * @desc 服务是否在运行
 */
_inst.isRunning = function () {
  return this.runnable;
};

/**
 * 服务热启动
 */
_inst.powerOn = function () {
  this.runnable = true;
};

/**
 * 服务热关闭
 */
_inst.powerOff = function () {
  this.runnable = false;
};

module.exports = _clzz;