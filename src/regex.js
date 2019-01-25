module.exports = (function ( f ) {
  var $ = f.regex = f.reg = {}

  $.isEmail = function isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
  }

  $.isIdCard = function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  }

  $.isPhoneNum = function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
  }

  $.isURL = function isURL(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
  }

	$.isPositiveInteger = function (val) {
		return /^[1-9]d*$/.test(val)
  }
  
	$.isNegativeInteger = function (val) {
		return /^-[1-9]d*$/.test(val)
  }
  
	$.isInteger = function (val) {
		return /^(-|\+)?\d+$/.test(val)
  }
  
  // 匹配非负浮点数
	$.isNotNegativeFloatInteger = function (val) {
		return /^\d+(\.\d+)?$/.test(val)
  }
  
	//匹配由 26 个英文字母组成的字符串
	$.isAZaz = function (val) {
		return /^[A-Za-z]+$/.test(val)
  }
  
  //匹配由 26 个英文字母的大写组成的字符串
	$.isAZ = function (val) {
		return /^[A-Z]+$/.test(val);
	}
	$.isaz = function (val) {
		return /^[a-z]+$/.test(val);
  }

  $.isPwd = function (val) { // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    return /^[a-zA-Z]\w{5,17}$/.test(str);
  }

  $.isPostal = function (val) {
    return /[1-9]\d{5}(?!\d)/.test(str)
  }

  $.isQQ = function (val) {
    return /^[1-9][0-9]{4,9}$/.test(str)
  }

  $.isIP = function (val) {
    var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ 
		return re.test(val)
  }

  /**
   * @desc 判断名字的构成
   * @param {min} 最少字符数目
   * @param {max} 最多字符
   * @param {Number} 1: 有数字 2: 有英文字符 4: 有中文字符
   */
  $.isValidName = function isValidName(str, type = 1|2|4, min = 1, max = 99999) {
    var rule = '^['

    if (type & 1) {
      rule += '0-9'
    }

    if (type & 2) {
      rule += 'a-zA-Z'
    }

    if (type & 4) {
      rule += '\u4E00-\u9FA5'
    }

    rule += ']{' + min + ',' + max + '}$'

    let reg = new RegExp(rule)

    return reg.test(str)
  }

  $.isJSONString = ( str ) => {
    if (!(typeof str == 'string')) return true

    if ( /^\s*$/.test(str) ) return false
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    return (/^[\],:{}\s]*$/).test(str)
  }
})