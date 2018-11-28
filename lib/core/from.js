module.exports = (function ( f ){
	var $ = f.from = {}

	$.string = function ( string ) {
		if( f.isnt.string( string ) ) {
			throw new TypeError("string should be string")
		}

		if( string == 'undefined' ) return undefined
		if( string == 'null' ) return null
		if( string == 'true' ) return true
		if( string == 'false' ) return false
		if( f.is.number( string ) ) return parseInt( string )
		if( f.is.json( string ) ) return JSON.parse( string )

		return string
	}

})
