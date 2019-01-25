'use strict';

/*
1. 日志分级
console.log("log log")
console.info("console info")
console.warn("console warn")
console.error("console error");
*/

// 2.console 占位符
// 支持字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）四种。
//3.分组打印
//如果信息太多，可以分组显示，用到的方法是console.group()和console.groupEnd()。
//4.查看对象的所有属性和方法 console.dir()
//5.线上网页节点信息 console.dirxml()
//6.断言，console.assert()
//7.追踪函数调用轨迹console.trace()
//8.计时功能
//console.time()和console.timeEnd()，用来显示代码的运行时间。
//9.性能分析
// console.profile('性能分析器一');
// Foo();
// console.profileEnd();

var beautify = require('./js-beautify').js;

var logger = function () {
  var dev, prod, logModel;
  var _logger_;
  var logHandler;

  dev = {
    DEBUG: function DEBUG(msg) {
      console.debug(msg);
    },
    INFO: function INFO(msg) {
      console.info(msg);
    },
    WARN: function WARN(msg) {
      console.warn(msg);
    },
    ERROR: function ERROR(msg) {
      console.error(msg);
    }
  };

  prod = {
    DEBUG: function DEBUG(msg) {},
    INFO: function INFO(msg) {},
    WARN: function WARN(msg) {},
    ERROR: function ERROR(msg) {}
  };

  logModel = dev;

  var s;
  var traceEnabled;
  var traceStack = [];

  function buildMessage(msg, tag) {
    var tagStr = '[' + tag + '] ==> ';
    var msgStr = msg;

    if (tag) return tagStr + msgStr;else return msgStr;
  }

  function log(n) {
    var message = buildMessage(n.msg, n.tag);
    try {
      logModel[n.type](message);

      if (logHandler) logHandler(n.type, message);
    } catch (e) {}
  }

  function dump(obj) {
    var typeofobj = Object.prototype.toString.call(obj);

    if (typeofobj === '[object String]') {
      return beautify(obj, { indent_size: 2, space_in_empty_paren: true });
    } else {
      return beautify(JSON.stringify(obj), { indent_size: 2, space_in_empty_paren: true });
    }
  }

  function format(r) {
    return r.join(' ');
  }

  function flat(n) {
    if (n.length == 0) return null;
    var r = [];
    for (var t = 0; t < n.length; t++) {
      var i = n[t];
      var d = dump(i);

      r.push(d);
    }

    return format(r);
  }

  function verbose(logType, args) {
    var tag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var pack = {
      type: logType,
      msg: flat(args),
      tag: tag
    };

    log(pack);

    if (traceEnabled === undefined || traceEnabled) {
      traceStack.push(pack);
    }
  }

  return _logger_ = {
    // 日志输出控制
    setEnabled: function setEnabled(enabled) {
      logModel = enabled ? dev : prod;
    },

    // 日志重定向 { level, msg }
    setHandler: function setHandler(handler) {
      logHandler = handler;
    },

    // 日志调试输出
    debug: function debug() {
      verbose("DEBUG", arguments, this._tag);
    },

    // 日志信息输出
    info: function info() {
      verbose("INFO", arguments, this._tag);
    },

    // 日志警告输出
    warn: function warn() {
      verbose("WARN", arguments, this._tag);
    },

    // 日志错误输出
    error: function error() {
      verbose("ERROR", arguments, this._tag);
    },

    // 打印tag，但是会有并发问题
    tag: function tag(_tag) {
      this._tag = _tag;
      return this;
    },

    // 日志统计输出
    output: function output() {
      var onlyOutput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var n = [];
      for (var o = 0; o < traceStack.length; o++) {
        var r = traceStack[o];
        n.push(r.type + ":" + r.msg);
      }

      var outputStr = n.join("\n");

      !onlyOutput && verbose("DEBUG", [outputStr]);

      return outputStr;
    },

    // 日志统计清理
    reset: function reset(flag) {
      traceEnabled = flag;
      if (traceEnabled === false) {
        traceStack = [];
      }
    }
  };
}();

module.exports = logger;