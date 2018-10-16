module.exports = (function ( ƒ ){
	var $ = ƒ.to = {}

	$.String = function ( variable ) {
		return ( ƒ.is.string( variable ) ) ? variable : JSON.stringify( variable )
	}

})
