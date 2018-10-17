module.exports = (function ( f ){
  var $ = f.String = f.string = {}

  // is and isnt
  $.is = f.is.String
  $.isnt = f.isnt.String

  $.trim = function ( str ) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  };

  $.splitWords = function ( str ) {
    return st.trim(str).replace(/,/g, ' ').split(/\s+/);
  };

  $.capitalize = function ( str ) {
    return str.slice(0,1).toUpperCase() + str.slice(1);
  };

  $.decapitalize = function ( str ) {
    return str.slice(0,1).toLowerCase() + str.slice(1);
  };

  $.smartTrim = function ( str ) {
    var CODEs = []

    return str
    .replace( /(?:<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/gi, function ( code ) { CODEs.push( code ); return '__CODE_BLOCK__'; })
    .replace( /\>[\t\n]+/ig, '>' ).replace( /[\t\n]+\</ig, '<' )
    .replace( /\>\s+/ig, '> ' ).replace( /\s+\</ig, ' <' )
    .replace( /\s+/ig, ' ' ).replace( /\>\s+\</ig, '> <' )
    .trim()
    .replace( /__CODE_BLOCK__/g, function () { return CODEs.shift() })
  }

  // Case conversions

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

  // 清除字符串左侧或右侧的任意空格
	$.trim = function (str){
		return str.replace(/^\s+|\s+$/g, "");
	}

	// 清除左空格
	$.ltrim = function (str){
		return str.replace(/^\s+/, "");
	}

	// 清除右空格
	$.rtrim = function (val) {
		return val.replace(/\s+$/, "");
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

	// escapeRegExp: 转义要在正则表达式中使用的字符串
	// 使用replace()可转义特殊字符
	$.escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

	// fromCamelCase: 从驼峰表示法转换为字符串形式
	// 使用replace()可删除下划线、连字符和空格, 并将单词转换为匹配。省略第二个参数以使用默认分隔符_
	$.fromCamelCase = (str, separator = "_") => str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase()

	// reverseString: 反转字符串
	// 使用数组 destructuring 和Array.reverse()可反转字符串中字符的顺序。使用join('')组合字符以获取字符串
	$.reverse = str => [...str].reverse().join("")

	// toCamelCase: 字符串转换为驼峰模式
	// 使用replace()可删除下划线、连字符和空格, 并将单词转换为驼峰模式
	$.toCamelCase = str => str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) => p2 ? p2.toUpperCase() : p1.toLowerCase())

	// truncateString: 将字符串截断为指定长度
	// 确定字符串的length是否大于num。将截断的字符串返回到所需的长度, 并将...追加到末尾或原始字符串
	$.truncate = (str, num) => str.length > num ? str.slice(0, num > 3 ? num -3 : num) + "..." : str
})