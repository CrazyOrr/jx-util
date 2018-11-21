
    
/**
 * @desc 遍历数组中的元素
 * @param fun 回调函数
 */
Array.prototype.each = function ( funt ) {
	for ( var i = 0, n = this.length; i < n; i++) {
		funt( i, this[i]);	
	}
}

/**
 * @desc 数组克隆
 */
Array.prototype.clone = function() {
  var o = []
  this.each(function(k, v) {
    o[k] = v
  })
  return o
}

/**
 * @desc 数组map
 */
Array.prototype.map = function( fn ) {
  var o = []
  this.each((k, v) => {
    o[k] = fn( k, v )	
  })
  return o
}

/**
 * 数组元素删除
 */
Array.prototype.del = function ( a ) {
  var o = this.clone()
  for (var i=o.length,n=0;i>n;i--){
    if( o[i] == a ) {
      o.splice(i,1 )
    }	
  }
  return o
}
Array.prototype.rm = Array.prototype.del
Array.prototype.remove = Array.prototype.del

/**
 * 字符串转化
 */
Array.prototype.toString = function () {
  var str = ""
  this.each( (k, v) => {
    str += k+":"+ v+","
  })

  return str
}