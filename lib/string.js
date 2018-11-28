module.exports = (function ( f ){
  var $ = f.String = f.string = {}

  // is and isnt
  $.is = f.is.String

  // 清除字符串左侧或右侧的任意空格
  $.trim = function ( str ) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
  }

	// 清除左空格
	$.ltrim = function (str) {
		return str.replace(/^\s+/, "")
  }

	// 清除右空格
	$.rtrim = function (val) {
		return val.replace(/\s+$/, "")
  }

  // split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
  $.split = f.function.curryN(2, (delim = '', str = '') =>
    str.split(delim)
  )

  // Case conversions - start

  // from CamelCase to ...

  $.fromCamelToDash = function ( str ) {
    return str
    .replace(/([A-Z])/g, function ( l ){return "-"+l.toLowerCase();})
    .replace(/^\-/g,'')
  }

  $.fromCamelToUnderscore = function ( str ){
  return str
  .replace(/([A-Z])/g, function ( l ){return "_"+l.toLowerCase();})
  .replace(/^\_/g,'');
  }

  $.fromCamelToSpaced = function ( str ){
  return str
  .replace(/([A-Z])/g, function ( l ){return " "+l;})
  .replace(/^ /g,'');
  }

  // from dash-case to ...
  $.fromDashToCamel = function ( str ){
    return str
    .replace(/(\-[a-z])/g, function ( l ){return l.toUpperCase().replace('-','');})
    .replace(/^[a-z]{1}/g,function ( l ){return l.toUpperCase();});
  }

  $.fromDashToUnderscore = function ( str ){
    return str
    .replace(/(\-[a-z])/g, function ( l ){return l.replace('-','_');})
    .replace(/^\_/g,'')
  }

  $.fromDashToSpaced = function ( str ){
    return str
    .replace(/(\-[a-z])/g, function ( l ){return l.toUpperCase().replace('-',' ');})
    .replace(/^\ /g,'')
    .replace(/^[a-z]{1}/g,function ( l ){return l.toUpperCase();})
  }

  // from underscore_case to ...

  $.fromUnderscoreToCamel = function ( str ){
    return str
    .replace(/(\_[a-z])/g, function ( l ){return l.toUpperCase().replace('_','');})
    .replace(/^[a-z]{1}/g,function ( l ){return l.toUpperCase();});
  }

  $.fromUnderscoreToDash = function ( str ) {
    return str
    .replace(/(\_[a-z])/g, function ( l ){return l.replace('_','-');})
    .replace(/^\-/g,'');
  }

  $.fromUnderscoreToSpaced = function ( str ) {
    return str
    .replace(/(\_[a-z])/g, function ( l ){return l.toUpperCase().replace('_',' ');})
    .replace(/^[a-z]{1}/g,function ( l ){return l.toUpperCase();});
  }

  // Case conversions - end

  $.toHtml = function( str ) {
    return str
    .replace( new RegExp( '\n',  'g' ), '<br />' )
    .replace( new RegExp( '&quot;', 'g' ), '"' )
    .replace( new RegExp( '&lt;', 'g' ), '<' )
    .replace( new RegExp( '&gt;', 'g' ), '>' )
  }

  $.toText = function( str ) {
    return str
    .replace( new RegExp( '<br />', 'g'), '\n' )
    .replace( new RegExp( '"', 'g'), '&quot;' )
    .replace( new RegExp( '<', 'g' ), '&lt;' )
    .replace( new RegExp( '>', 'g' ), '&gt;' )
  }

  // 字符串去除空格
  // type 1:去除所有空格  2:去除前后空格  3:去除前空格 4:去除后空格
  $.removeSpace = function removeSpace(str, type) {
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "")
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "")
      case 3:
        return str.replace(/(^\s*)/g, "")
      case 4:
        return str.replace(/(\s*$)/g, "")
      default:
        return str
    }
  }

  // 字符串重复复制
  // count:复制次数
  $.repeatCopy = function repeatCopy(str, count) {
    var text = ''
    for (var i = 0; i < count; i++) {
      text += str
    }
    return text
  }

  /**
   * 
   * @desc   字符串替换
   * @param  {String} str 
   * @param  {String} FindText:要替换的字符或正则表达式
   * @param  {String} RegText:替换成什么
   * @return {String} 
   */
  $.replaceWith = function replaceWith(str, FindText, RegText) {
    fRegExp = new RegExp(FindText, "g")
    return str.replace(fRegExp, RegText)
  }

	// 截取给定长度的字符串
	$.truncate = function(str, len){
		if(str.length >len){
			str = str.substring(0, len)
		}
		return str
	}

  
	// capitalize: 将字符串的第一个字母大写
	// 使用 destructuring 和toUpperCase()可将第一个字母、...rest用于获取第一个字母之后的字符数组, 然后是Array.join('')以使其成为字符串。省略lowerRest参数以保持字符串的其余部分不变, 或将其设置为true以转换为小写
	$.capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join("").toLowerCase() : rest.join(""))

	// capitalizeEveryWord: 将字符串中每个单词的首字母大写
	// 使用replace()匹配每个单词和toUpperCase()的第一个字符以将其大写
	$.capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase())

  // 首字母小写
  $.decapitalize = function ( str ) {
    return str.slice(0,1).toLowerCase() + str.slice(1)
  }

	// reverseString: 反转字符串
	// 使用数组 destructuring 和Array.reverse()可反转字符串中字符的顺序。使用join('')组合字符以获取字符串
	$.reverse = str => [...str].reverse().join("")

	// truncateString: 将字符串截断为指定长度
	// 确定字符串的length是否大于num。将截断的字符串返回到所需的长度, 并将...追加到末尾或原始字符串
  $.truncate = (str, num) => str.length > num ? str.slice(0, num > 3 ? num -3 : num) + "..." : str
  
  $.endsWith = f.function.curryN(2, (postfix = '', str = '') => str.slice(-postfix.length) === postfix)
  $.startsWith = f.function.curryN(2, (prefix = '', str = '') => str.slice(0, prefix.length) === prefix)

  $.toLower = (str = '') => str.toLowerCase()
  $.toUpper = (str = '') => str.toUpperCase()

  /**
   * 
   * * toString(null); // => ''
  *
  * toString('test'); // => 'test'
  *
  * toString([1, 2, 3]); => '1,2,3'
  *  */
  $.from = val => {
    if (val == null) {
        return ''
    }

    return `${val}`
  }

  // escape('fred, barney, & pebbles'); // => 'fred, barney, &amp; pebbles'
  const escapeRegExp = /[&<>"']/g
  const htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
  };
  const escape = char => htmlEscapes[char]
  $.escape = (str = '') => str.replace(escapeRegExp, escape)

  // unescape('fred, barney, &amp; pebbles'); // => 'fred, barney, & pebbles'
  const unescapeRegExp = /&(?:amp|lt|gt|quot|#39);/g
  const htmlUnescapes = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'"
  }
  const unescape = char => htmlUnescapes[char]
  $.unescape = (str = '') => str.replace(unescapeRegExp, unescape)
})