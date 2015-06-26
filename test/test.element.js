/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	lt = require( './../lib/element.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'element lt', function tests() {

	it( 'should export a function', function test() {
		expect( lt ).to.be.a( 'function' );
	});

	it( 'should correctly compare differenr values', function test() {
		assert.strictEqual( lt( 2, 4 ), 1 );
		assert.strictEqual( lt( 900, 800 ), 0 );
		assert.strictEqual( lt( 'A', 'C' ), 1 );
	});

});
