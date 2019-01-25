"use strict";

module.exports = function (f) {
  var $ = f.timer = {};

  /**
   * @desc 定时回调
   * @param {*} seconds 
   * @param {*} handler 
   */
  $.interval = function (seconds, handler) {
    return setInterval(handler, seconds * 1000);
  };

  $.off = function (timer) {
    clearInterval(timer);
  };

  /**
   * @desc 超时回调
   */
  $.timeout = function (seconds, handler) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    return setTimeout.apply(undefined, [handler, seconds * 1000].concat(rest));
  };

  $.expire = function (timer) {
    clearTimeout(timer);
  };
};