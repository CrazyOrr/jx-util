module.exports = (function ( ƒ ){
  var $ = ƒ.String = ƒ.string = {}

  // is and isnt
  $.is = ƒ.is.String
  $.isnt = ƒ.isnt.String

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
})