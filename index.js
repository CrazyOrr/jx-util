// 该库的扩展，不采用原型扩展

var f = {}

// core

require('./lib/core/core')( f )
require('./lib/core/function')( f )
require('./lib/core/is')( f )
require('./lib/core/object')( f )
require('./lib/core/from')( f )
require('./lib/core/to')( f )

// lib

require('./lib/array')( f )
require('./lib/date')( f )
require('./lib/number')( f )
require('./lib/regex')( f )
require('./lib/string')( f )
require('./lib/timer')( f )
require('./lib/url')( f )

// Export it
module.exports = f