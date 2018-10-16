module.exports = (function ( ƒ ) {
  var $ = ƒ.url = {}

  // url参数转对象
  $.query2obj = function query2obj(url) {
    url = !url ? window.location.href : url
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }

  // 参数对象序列化
  $.query2str = function query2str(obj) {
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
})