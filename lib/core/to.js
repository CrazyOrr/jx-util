module.exports = (function ( f ){
	var $ = f.to = {}

	$.String = function ( variable ) {
		return ( f.is.string( variable ) ) ? variable : JSON.stringify( variable )
	}

})
