/**
 * @desc   大小写转换
 * @param  {String} str 
 * @param  {Number} type 1:首字母大写  2:首页母小写  3:大小写转换 4:全部大写 5:全部小写
 * @return {String} 
 */
function changeCase(str, type) {
  function ToggleCase(str) {
      var itemText = "";
      str.split("").forEach(
          function (item) {
              if (/^([a-z]+)/.test(item)) {
                  itemText += item.toUpperCase();
              } else if (/^([A-Z]+)/.test(item)) {
                  itemText += item.toLowerCase();
              } else {
                  itemText += item;
              }
          });
      return itemText;
  }
  switch (type) {
      case 1:
          return str.replace(/\b\w+\b/g, function (word) {
              return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
          });
      case 2:
          return str.replace(/\b\w+\b/g, function (word) {
              return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
          });
      case 3:
          return ToggleCase(str);
      case 4:
          return str.toUpperCase();
      case 5:
          return str.toLowerCase();
      default:
          return str;
  };
}

/**
 * 
 * @desc   现金额转大写
 * @param  {Number} n 
 * @return {String}
 */
function digitUppercase(n) {
  var fraction = ['角', '分'];
  var digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  };
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
      };
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  };
  return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整');
}

/**
 * @desc   字符串去除空格
 * @param  {String} str 
 * @param  {Number} type 1:去除所有空格  2:去除前后空格  3:去除前空格 4:去除后空格
 * @return {String} 
 */
function removeSpace(str, type) {
  switch (type) {
      case 1:
          return str.replace(/\s+/g, "");
      case 2:
          return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
          return str.replace(/(^\s*)/g, "");
      case 4:
          return str.replace(/(\s*$)/g, "");
      default:
          return str;
  }
}

/**
 * @desc   字符串重复复制
 * @param  {String} str 
 * @param  {Number} count:复制次数 
 * @return {String} 
 */
function repeatCopy(str, count) {
  var text = '';
  for (var i = 0; i < count; i++) {
      text += str;
  };
  return text;
}

/**
 * @desc   格式化字符串
 * @param  {String} str 
 * @param  {String} size:单个字符的长度
 * @param  {Number} delimiter:用来连接的字符
 * @return {String} 
 */
function stringFormat(str, size, delimiter) {
  var _size = size || 3,
      _delimiter = delimiter || ',';
  var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
  var reg = new RegExp(regText, 'g');
  return str.replace(reg, _delimiter)
}

/**
 * 
 * @desc   字符串替换
 * @param  {String} str 
 * @param  {String} FindText:要替换的字符或正则表达式
 * @param  {String} RegText:替换成什么
 * @return {String} 
 */
function replaceWith(str, FindText, RegText) {
  fRegExp = new RegExp(FindText, "g");
  return str.replace(fRegExp, RegText);
}

module.exports = {
  changeCase,
  digitUppercase,
  removeSpace,
  repeatCopy,
  stringFormat,
  replaceWith
}