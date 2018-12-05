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

let beautify = require('./js-beautify').js

const logger = function  () {
  var now = new Date()
  var dev, prod, logModel
  
  dev = {
    DEBUG: function (msg) {
      console.debug(msg)
    },
    INFO: function (msg) {
      console.info(msg)
    },
    WARN: function (msg) {
      console.warn(msg)
    },
    ERROR: function (msg) {
      console.error(msg)
    }
  }
  
  prod = {
    DEBUG: function (msg) {},
    INFO: function (msg) {},
    WARN: function (msg) {},
    ERROR: function (msg) {}
  }

  logModel = dev

  var s
  var traceEnabled
  var traceStack = []
  var oldDate = now

  function buildMessage (timeStamp, msg, tag) {
    let tagStr = '[' + tag + '] ==> '
    let msgStr = timeStamp + "(ms): " + msg

    if (tag) return tagStr + msgStr
    else return msgStr
  }

  function log (n) {
    // 输出日志打印耗时
    var newDate = new Date;
    var timeStamp = newDate - oldDate;
    var message = buildMessage(timeStamp, n.msg, n.tag)
    try {
      logModel[n.type](message)
    } catch (e) {
      return
    }
    oldDate = newDate;
  }

  function dump (obj) {
    let typeofobj = Object.prototype.toString.call(obj)

    if (typeofobj === '[object String]') {
      return beautify(obj, { indent_size: 2, space_in_empty_paren: true })
    } else {
      return beautify(JSON.stringify(obj), { indent_size: 2, space_in_empty_paren: true })
    }
  }

  function format (n, r) {
    return n + r.join(' ')
  }

  function flat (n) {
    if (n.length == 0) return null
    var r = []
    for (var t = 0; t < n.length; t++) {
      var i = n[t]
      var d = dump(i)

      r.push(d)
    }

    return format(n, r)
  }

  function verbose (logType, args, tag = null) {

    var pack = {
      type: logType,
      msg: flat(args),
      tag: tag
    }

    log(pack)

    if (traceEnabled === undefined || traceEnabled) {
      traceStack.push(pack)
    }
  }

  var _logger_
  return _logger_ = {
    // 日志环境，模拟器或真机
    setIsSimulator: (isSimulator) => {
      if (isSimulator) {
        newlines = '\n'
      } else {
        newlines = '<br/>'
      }
    },
    // 日志输出控制
    setLogging: function (isLogging) {
      logModel = isLogging ? dev : prod
    },
    // 日志调试输出
    debug: function () {
      verbose("DEBUG", arguments, _logger_._tag)
    },
    // 日志信息输出
    info: function () {
      verbose("INFO", arguments, _logger_._tag)
    },
    // 日志警告输出
    warn: function () {
      verbose("WARN", arguments, _logger_._tag)
    },
    // 日志错误输出
    error: function () {
      verbose("ERROR", arguments, _logger_._tag)
    },
    tag: (tag) => {
      _logger_._tag = tag
      return _logger_
    },
    // 日志统计输出
    traceOutput: function (onlyOutput = false) {
      var n = []
      for (var o = 0; o < traceStack.length; o++) {
        var r = traceStack[o]
        n.push(r.type + ":" + r.msg)
      }

      let outputStr = n.join("\n")

      !onlyOutput && verbose("DEBUG", [outputStr])

      return outputStr
    },
    // 日志统计清理
    traceReset: function (flag) {
      traceEnabled = flag;
      if (traceEnabled === false) {
        traceStack = []
      }
    }
  }
}()

export default logger