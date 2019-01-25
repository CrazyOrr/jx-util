"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interceptor = exports.Interceptor = function Interceptor() {
  var before = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  _classCallCheck(this, Interceptor);

  this.before = before;
  this.after = after;
};