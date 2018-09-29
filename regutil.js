/**
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean} 
 */
function isEmail(str) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
}

/**
 * @desc  判断是否为身份证号
 * @param  {String|Number} str 
 * @return {Boolean}
 */
function isIdCard(str) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}

/**
 * @desc   判断是否为手机号
 * @param  {String|Number} str 
 * @return {Boolean} 
 */
function isPhoneNum(str) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
}

/**
 * @desc   判断是否为URL地址
 * @param  {String} str 
 * @return {Boolean}
 */
function isUrl(str) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}

/**
 * @desc 判断名字的构成
 * @param {min} 最少字符数目
 * @param {max} 最多字符
 * @param {Number} 1: 有数字 2: 有英文字符 4: 有中文字符
 */
function isValidName(str, type = 1|2|4, min = 1, max = 99999) {
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

/**
 * 手动档
 */
function test(rule, str) {
  let reg = new RegExp(rule)

  return reg.test(str)
}

module.exports = {
  isEmail,
  isIdCard,
  isPhoneNum,
  isUrl,
  isValidName,
  test
}
