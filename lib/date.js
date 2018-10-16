module.exports = (function ( f ) {

  var $ = f.Date = f.date = {}

  // 格式化${startTime}距现在的已过时间
  $.formatPassTime = function formatPassTime(startTime) {
    var currentTime = Date.parse(new Date()),
        time = currentTime - startTime,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12)
    if (year) return year + "年前"
    if (month) return month + "个月前"
    if (day) return day + "天前"
    if (hour) return hour + "小时前"
    if (min) return min + "分钟前"
    else return '刚刚'
  }

  // 格式化现在距${endTime}的剩余时间
  $.formatRemainTime = function formatRemainTime(endTime) {
    var startDate = new Date(); //开始时间
    var endDate = new Date(endTime); //结束时间
    var t = endDate.getTime() - startDate.getTime(); //时间差
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    };
    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒"
  }

  // 字符串转成日期对象
  $.fromString = function str2date (str) {
    let exec = /(\d{2,4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/.exec(
      str
    )
    let res = new Date(0)
    if (exec && exec[1]) {
      res.setFullYear(exec[1])
      res.setMonth(parseInt(exec[2], 10) - 1)
      res.setDate(exec[3])
      res.setHours(exec[4])
      res.setMinutes(exec[5])
      res.setSeconds(exec[6])
    }
    return res
  }

  // 前导零
  const prefix = v => (v < 10 ? "0" : "") + v

  // 把日期对象格式化成字符串
  $.toString = (date, format = "") => {
    let newDate = new Date(date.getTime())
    let replace = v => {
      switch (v) {
        case "YYYY":
          return newDate.getFullYear()
        case "YY":
          return newDate.getFullYear().substr(-2)
        case "MM":
          return prefix(newDate.getMonth() + 1)
        case "M":
          return newDate.getMonth() + 1
        case "DD":
          return prefix(newDate.getDate())
        case "D":
          return newDate.getDate()
        case "HH":
          return prefix(newDate.getHours())
        case "H":
          return newDate.getHours()
        case "mm":
          return prefix(newDate.getMinutes())
        case "m":
          return newDate.getMinutes()
        case "ss":
          return prefix(newDate.getSeconds())
        case "s":
          return newDate.getSeconds()
        case "w":
          return newDate.getDay()
        case "W":
          return "日一二三四五六"[newDate.getDay()]
      }
    }
    return format.replace(
      /Y{4}|Y{2}|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|W|w/g,
      $0 => replace($0)
    )
  }
})