'use strict';

var lt = require( './../lib' ),
	sum = require( 'compute-sum' );

// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

var out = lt( data, 50 );

// Count the number of values less than 50...
var count = sum( out );

console.log( 'Total: %d', count );
