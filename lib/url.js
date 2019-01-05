module.exports = (function ( f ) {
  var $ = f.url = {}

  $.query2obj = $.decode = function (url) {
    if (f.str.empty(url)) return {}

    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }

  $.encode = function (url, obj) {
    if (f.str.empty(url)) return '';

    if (f.is.empty(obj)) return url;

    var pairs = [];

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
    return `${url}?${pairs.join('&')}`
  }
})