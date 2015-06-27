'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' );

// FUNCTIONS //

var LT = require( './element.js' );


// LESS THAN //

/**
* FUNCTION: lt( out, x, y )
*	Computes an element-wise comparison (less than) of a matrix
*
* @param {Matrix} out - output matirx
* @param {Matrix} x - input matrix
* @param {Matrix|Number} y - either a matrix of equal dimensions or a scalar
* @returns {Matrix} output matrix of 1s and 0s, where a `1` indicates that an input element is smaller than a compared value and `0` indicates that an input element is greater or equal to a compared value
*/
function lt( out, x, y ) {
	var len = x.length,
		i, j,
		M, N;

	if ( out.length !== len ) {
		throw new Error( 'lt()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	if ( isMatrixLike( y ) ) {
		M = x.shape[0];
		N = x.shape[1];
		if ( M !== x.shape[0] || N !== y.shape[1] ) {
			throw new Error( 'lt()::invalid input arguments. Matrix to be compared must have the same number of rows and columns as the input matrix.' );
		}
		for ( i = 0; i < M; i++ ) {
			for ( j = 0; j < N; j++ ) {
				out.set( i, j, LT( x.get( i, j ), y.get( i, j ) ) );
			}
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = LT( x.data[ i ], y );
		}
	}
	return out;
} // end FUNCTION lt()


// EXPORTS //

module.exports = lt;
