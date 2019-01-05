module.exports = (function ( f ){
  var $ = f.String = f.string = f.str = {}

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
  $.repeat = function (str, count) {
    return new Array(Math.round(count)+1).join(str)
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

  /** 在字符串末尾追加字符串 **/
  $.append = function (a, b) {
    return a.concat(b)
  }

  /** 删除指定索引位置的字符，索引无效将不删除任何字符 **/
  $.delCharAt = function (str, index) {
    if (index < 0 || index >= str.length) {
      return str.valueOf()
    }
    else if (index == 0) {
      return str.substring(1, str.length)
    }
    else if (index == str.length - 1) {
      return str.substring(0, str.length - 1)
    }
    else {
      return str.substring(0, index) + str.substring(index + 1)
    }
  }

  /** 删除指定索引区间的字符串 **/
  $.delBewteen = function (str, start, end) {
    if (start == end) {
      return f.string.delCharAt(str, start)
    } else {
      if (start > end) {
        var temp = start
        start = end
        end = temp
      }

      if (start < 0) {
        start = 0
      }

      if (end > str.length - 1) {
        end = str.length - 1
      }

      return str.substring(0, start) + str.substring(end +1 , str.length)
    }
  }

  /** 检查字符串是否以subStr结尾 **/
  $.endWith = function (str, subStr) {
    if (subStr.length > str.length) {
      return false
    }
    else {
      return (str.lastIndexOf(subStr) == (str.length - subStr.length)) ? true : false
    }
  }

  /** 比较两个字符串是否相等，也可以直接用 == 进行比较 **/
  $.equal = function (a, b) {
    if (a.length != b.length) {
      return false
    } else {
      for (var i = 0; i < a.length; i++) {
        if (a.charAt(i) != b.charAt(i)) {
          return false
        }
      }
      return true
    }
  }

  /** 比较两个字符串是否相等，不区分大小写 **/
  $.equalIgnoreCase = function (a, b) {
    var temp1 = a.toLowerCase()
    var temp2 = b.toLowerCase()
    return f.string.equal(temp1, temp2)
  }

  /** 将指定的字符串插入到指定的位置后面，索引无效将直接追加到字符串的末尾 **/
  $.insert = function (str, ofset, subStr) {
    if (ofset < 0 || ofset >= str.length - 1) {
      return f.string.append(str, subStr)
    }
    return str.substring(0, ofset + 1) + subStr + str.substring(ofset + 1)
  }

  /** 将字符串反序排列 **/
  $.reserve = function (str) {
    var temp = "";
    for (var i = str.length - 1; i >= 0; i--) {
        temp = temp.concat(str.charAt(i))
    }
    return temp
  }

  /** 将指定的位置的字符设置为另外指定的字符或字符串.索引无效将直接返回不做任何处理 **/
  $.setCharAt = function (str, index, subStr) {
    if (index < 0 || index > str.length - 1) {
        return str.valueOf();
    }
    return str.substring(0, index) + subStr + str.substring(index+1);
  }

  /** 检查字符串是否以subStr开头 **/
  $.startWith = function (str, subStr) {
    if (subStr.length > str.length) {
      return false
    }
    return (str.indexOf(subStr) == 0) ? true : false
  }

  /** 计算长度，每个汉字占两个长度，英文字符每个占一个长度 **/
  $.charLength = function (str) {
    var temp = 0
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {
        temp += 2
      }
      else {
        temp += 1
      }
    }
    return temp
  }

  /** 合并多个空白为一个空白 **/ 
  $.resetBlank = function (str) {
    return str.replace(/s+/g, " ")
  }

  /** 得到字节长度 **/ 
  $.realLength = function (str) {
    return str.replace(/[^x00-xff]/g, "--").length
  }

  /**
   * @desc 从左截取指定长度的字串
   */
  $.left = function (str, n) {
    return str.slice(0, n)
  }

  /**
   * @desc 从右截取指定长度的字串
   */
  $.right = function (str, n) {
    return str.slice(str.length - n)
  }

  /**
   * @desc 统计指定字符出现的次数
   */
  $.occurs = function(str, ch) { 
    return str.split(ch).length-1
  } 

  /**
   * @desc 返回字节数
   */
  $.lengthOfBytes = function(str) { 
    return str.replace(/[^\x00-\xff]/g,"**").length; 
  }

  $.empty = function (str) {
    if (str && str.length > 0) return false

    return true
  }
})