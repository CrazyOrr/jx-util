"use strict";

var Providable = function Providable(setter, getter, removal) {
  this.set = setter;
  this.get = getter;
  this.rm = removal;
};

var _clz = Providable;
var _inst = _clz.prototype;
_inst.$ = _clz;

module.exports = Providable;