module.exports = (function ( f ) {
  var $ = f.url = {}

  // 参数转对象
  $.query2obj = $.decode = function query2obj(url) {
    url = !url ? window.location.href : url
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }

  // 参数对象序列化
  $.query2str = function (obj) {
    if (!obj) return ''
    var pairs = []

    for (var key in obj) {
      var value = obj[key]
      if (value instanceof Array) {
        for (var i = 0; i < value.length; ++i) {
          pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]))
        }
        continue
      }
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    }
    return pairs.join('&')
  }

  // 和上面的函数取其一，TODO 单元测试
  $.encode = function (param = {}, key = null, encode = false) {  
    if ( param == null ) return ''
    var paramStr = ''
    var t = typeof (param)
    if (t == 'string' || t == 'number' || t == 'boolean') {  
      paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param)
    } else {  
      for (var i in param) {  
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += urlEncode(param[i], k, encode)
      }  
    }
  
    return paramStr
  }
})