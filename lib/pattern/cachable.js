'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @desc 缓存模式
 * @MUST 必须设置供应器
 */
var Cachable = function Cachable(key) {
  this.key = key;
};

var _clz = Cachable;
_clz.setProvider = function (provider) {
  // It should like Cachable.set/get/rm
  this.provider = provider;
};

var _inst = Cachable.prototype;
_inst.$ = _clz;

Object.assign(Cachable.prototype, {
  get: function get() {
    if (this.$.provider) {
      return this.$.provider.get(this.key);
    }

    throw new Error('Cachable need provider');
  },
  set: function set(val) {
    if (this.$.provider) {
      this.$.provider.set(this.key, val);
    }

    throw new Error('Cachable need provider');
  },
  rm: function rm() {
    if (this.$.provider) {
      this.$.provider.rm(this.key);
    }
  }
});

/**
 * 内存缓存模式
 */

var MemoryCachable = exports.MemoryCachable = function (_Cachable) {
  _inherits(MemoryCachable, _Cachable);

  function MemoryCachable(key) {
    _classCallCheck(this, MemoryCachable);

    var _this = _possibleConstructorReturn(this, (MemoryCachable.__proto__ || Object.getPrototypeOf(MemoryCachable)).call(this, key));

    _this.val = null;
    return _this;
  }

  _createClass(MemoryCachable, [{
    key: 'get',
    value: function get() {
      return this.val;
    }
  }, {
    key: 'set',
    value: function set(val) {
      this.val = val;
    }
  }, {
    key: 'rm',
    value: function rm() {
      this.val = null;
    }
  }]);

  return MemoryCachable;
}(Cachable);

exports.default = Cachable;