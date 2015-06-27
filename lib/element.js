'use strict';

// LESS THAN //

/**
* FUNCTION: lt( x, y )
*	Checks whether input element x is less than y
*
* @param {Number|String} x - input value
* @param {Number|String} y - comparator
* @returns {Number} 1 if x is less than y, 0 otherwise
*/
function lt( x, y ) {
		return x < y ? 1 : 0;
} // end FUNCTION lt()

// EXPORTS //

module.exports = lt;
