/**
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object} 
 */
function query2obj(url) {
  url = !url ? window.location.href : url;
  var search = url.substring(url.lastIndexOf('?') + 1);
  if (!search) {
      return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

/**
 * @desc   对象序列化
 * @param  {Object} obj 
 * @return {String}
 */
function query2str(obj) {
  if (!obj) return '';
  var pairs = [];

  for (var key in obj) {
      var value = obj[key];
      if (value instanceof Array) {
          for (var i = 0; i < value.length; ++i) {
              pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
          };
          continue;
      }
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  };
  return pairs.join('&');
}

module.exports = {
  query2obj,
  query2str
}