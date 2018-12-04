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

class LogFactory {
  constructor () {

  }
}

const defaultLogger = new LogFactory()

var StringUtil = function () {
  return {
    format: function (n, r) {
      return n.replace(/\{(\d+)\}/g, function (n, t) {
        return typeof r[t] != "undefined" ? r[t] : n
      })
    },
    format2: function (n, r) {
      return n + r.join(' ')
    },
    hashCode: function (n) {
      if (typeof n != "string") return "not string";
      var r = 0;
      if (n.length === 0) return r;
      for (var i = 0; i < n.length; i++) {
          r = (r << 5) - r + n.charCodeAt(i);
          r = r & r
      }
      return r
    }
  }
}();

const logger = function  () {
  var now = new Date()
  var newlines = '\n'
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

  function parseObjToString (obj) {
    var filter = ['top', 'window', 'document', 'localStorage', 'sessionStorage', 'cookie'], // 不会解析该属性。
    x         = null, // 没用的临时变量
    n         = '\n', // 换行 '\n<br/>'
    Parse     = {
      parseObj : function(obj, blank, parseObjTimes = 0) { // 解析对象和数组
        // !parseObjTimes && (parseObjTimes = 0)

        if (parseObjTimes > 20) {
          return '';
        }

        switch(typeof obj) {
          case 'object':
            var temp   = '',
                isobj  = true;
                temp  += n;
                blank  = blank || 1;

            ''+{}.toString.call(obj) === "[object Array]" && (isobj = false)

            isobj ? temp = '\n{'+ n : temp = '\n['+ n

            for (x in obj) {
              if (typeof obj[x] == 'object') {
                if (filter.indexOf(x) !== -1 ) continue

                parseObjTimes ++;
                temp += this.getBlank(blank)+ x+ ': '+ this.parseObj(obj[x], blank+1, parseObjTimes)+ ',' + n;
              } else {
                temp += this.getBlank(blank)+ x+ ': '+ this.parseSign(obj[x]) +',' + n;
              }
            }

            temp = temp.length > 2/** {\n */ ? temp.substr(0, temp.length - (',' + n).length) + n : temp

            return temp + this.getBlank(blank - 1) + (isobj ? '}' : ']')

          default : 
            return obj;
        }
      },
      parseSign: function (str) {// 解析特殊符号
        return (''+str)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n|\n\r/g, '<br>')
        .replace(/\t/g, '&nbsp;&nbsp;')
        .replace(/\s\s/g, '&nbsp;');
      },
      getBlank : function (num) {// 返回相应num的空白
        for (var i = 0, blank=''; i < num; i++) {
          // blank += '&nbsp;&nbsp;&nbsp;&nbsp;'
          blank += '  '
        }
        // blank += '\n'
        return blank;
      }
    }

    return Parse.parseObj(obj)
  }

  function dump (obj) {
    let typeofobj = Object.prototype.toString.call(obj)

    if (typeof obj === "[object Array]") {
      var o = "[";
      for (var r = 0; r < obj.length; r++) {
        o = o + dump(obj[r]) + ","
      }
      return o + "]"
    } else if (typeofobj === "[object Object]") {
      return parseObjToString (obj)
    } else if (typeofobj === "[object Error]") {
      return parseObjToString (obj)
    } else if (typeofobj === '[object Number]') {
      return obj + ''
    } else if (typeofobj === '[object String]') {
      return obj
    } else if (typeofobj === '[object Undefined]') {
      return 'undefined'
    } else if (typeofobj === '[object Null]') {
      return null
    } else if (typeofobj === '[object Function]') {
      return JSON.stringify(obj)
    } else if (typeofobj === '[object Boolean]') {
      return JSON.stringify(obj)
    }
    else {
      console.log('other type', Object.prototype.toString.call(obj))

      return JSON.stringify(obj)
    }
  }

  function flat (n) {
    if (n.length == 0) return null;

    var o = n[0];
    if (typeof o != "string") {
      o = dump(o)
    }
    var r = [];
    for (var t = 1; t < n.length; t++) {
      var i = n[t];
      var d = dump(i);

      r.push(d)
    }

    return StringUtil.format2(o, r)
  }

  function verbose (logType, o, tag = null) {
    var pack = {
      type: logType,
      msg: flat(o),
      tag: tag
    }

    log(pack)

    if (traceEnabled === undefined || traceEnabled) {
      traceStack.push(pack)
    }
  }

  var _logger_
  return _logger_ = {
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