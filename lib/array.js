'use strict';

// MODULES //'

var isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' );

// FUNCTIONS //

var LT = require( './element.js' );


// LESS THAN //

/**
* FUNCTION: lt( out, x, y )
*	Computes an element-wise comparison (less than) of an array.
*
* @param {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array|Number[]|String[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Array|Number[]|String[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number|String} y - comparator
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} array of 1s and 0s, where a `1` indicates that an input array element is less than a compared value and `0` indicates that an input array element is greater or equal to a compared value
*/
function lt( out, arr, y ) {
	var len = arr.length,
			i;

		if ( isTypedArrayLike( y ) ) {
			if ( len !== y.length ) {
				throw new Error( 'lt()::invalid input argument. Comparator array must have a length equal to that of the input array.' );
			}
			for ( i = 0; i < len; i++ ) {
				if ( typeof arr[ i ] === 'number' ) {
					out[ i ] = LT( arr[ i ], y[ i ] );
				} else {
					out[ i ] = NaN;
				}
			}
		} else if ( isArrayLike( y ) ) {
			if ( len !== y.length ) {
				throw new Error( 'lt()::invalid input argument. Comparator array must have a length equal to that of the input array.' );
			}
			for ( i = 0; i < len; i++ ) {
				if ( ( typeof y[ i ] === 'number' || typeof y[ i ] === 'string' ) && ( typeof arr[ i ] === 'number' || typeof arr[ i ] === 'string' ) ) {
					out[ i ] = LT( arr[ i ], y[ i ] );
				} else {
					out[ i ] = NaN;
				}
			}
		} else {
			if ( typeof y === 'number' || y === 'string' ) {
				for ( i = 0; i < len; i++ ) {
					if ( typeof arr[ i ] === 'number' || typeof arr[ i ] === 'string' ) {
						out[ i ] = LT( arr[ i ], y );
					} else {
						out[ i ] = NaN;
					}
				}
			} else {
				for ( i = 0; i < len; i++ ) {
					out[ i ] = NaN;
				}
			}
		}
		return out;
} // end FUNCTION lt()


// EXPORTS //

module.exports = lt;
