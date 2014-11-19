'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	lt = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-lt', function tests() {

	it( 'should export a function', function test() {
		expect( lt ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				lt( value, 10 );
			};
		}
	});

	it( 'should throw an error if a comparison value which is not an array of equal length, number, or string', function test() {
		var values = [
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				lt( [], value );
			};
		}
	});

	it( 'should throw an error if not provided a comparison array of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			lt( [1,2], [1,2,3] );
		}
	});

	it( 'should correctly compare values', function test() {
		var data, expected, actual;

		data = [ 4, 5, 3, 6, 8 ];

		// Single numeric value:
		actual = lt( data, 4 );
		expected = [ 0, 0, 1, 0, 0 ];

		assert.deepEqual( actual, expected );

		// Array of numeric values:
		actual = lt( data, [ 5, 5, 5, 5, 9 ] );
		expected = [ 1, 0, 1, 0, 1 ];

		assert.deepEqual( actual, expected );

		// Strings:
		actual = lt( data, '5' );
		expected = [ 1, 0, 1, 0, 0 ];

		assert.deepEqual( actual, expected );

		data = [ 'a', 'aa', 'aaa', 'b' ];

		actual = lt( data, 'aa' );
		expected = [ 1, 0, 0, 0 ];

		assert.deepEqual( actual, expected );

		actual = lt( data, [ 'aa', 'bb', 'aa', 'c' ] );
		expected = [ 1, 1, 0, 1 ];

		assert.deepEqual( actual, expected );
	});

});
