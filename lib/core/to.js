module.exports = (function ( f ){
	var $ = f.to = {}

	/**
	 * 对象转化为字符串
	 */
	$.string = $.String = function ( variable ) {
		return ( f.is.string( variable ) ) ? variable : JSON.stringify( variable )
	}

	/**
	 * 样板
	 * 
	 * @FIXME
	 */
	$.formatted = function ( val ) {

	}

	/**
	 * 按打印规格
	 * 
	 * @TODO
	 */
	$.printed = function ( val ) {

	}
})
