var Providable = function  (setter, getter, removal) {
  this.set = setter
  this.get = getter
  this.rm = removal
}

const _clz = Providable;
const _inst = _clz.prototype;
_inst.$ = _clz;

module.exports = Providable