Less Than
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise comparison (less than).


## Installation

``` bash
$ npm install compute-lt
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var lt = require( 'compute-lt' );
```

#### lt( x, y[, opts] )

Computes an element-wise comparison (less than). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). `y` has to be either an `array` or `matrix` of equal dimensions as `x`, a `string` or a `number`. Correspondingly, the function returns either an `array` with length equal to that of the input `array`, a `matrix` with equal dimensions as input `x` or a single value. Each output element is either `0` or `1`. A value of `1` means that an element is less the compared value  and `0` means that an element is __not__ less than the compared value.

``` javascript
var matrix = require( 'dstructs-matrix' ),
    data,
    y,
    mat,
    out,
    i;

data = [ 5, 3, 8, 3, 2 ];

// Single comparison value:
out = lt( data, 3 );
// returns [ 0, 0, 0, 0, 1 ]

out = lt( 3, data )
// returns [ 1, 0, 0, 0, 1 ]

// Array of comparison values:
out = lt( data, [ 5, 2, 8, 7, 3 ] );
// returns [ 0, 0, 0, 1, 1 ]

// Matrices
data = new Int32Array( 9 );
y = new Int32Array( 9 )
for ( i = 0; i < 9; i++ ) {
	data[ i ] = i;
	y[ i ] = 8 - i;
}
mat = matrix( data, [3,3], 'float64' );
/*
	[ 0 1 2
	  3 4 5
	  6 7 8 ]
*/

// Single comparison value:
out = lt( mat, 3 );
/*
	[ 1 1 1
	  0 0 0
	  0 0 0 ]
*/

// Matrix of comparison values:
out = lt( mat, y );
/*
	[ 1 1 1
	  1 0 0
	  0 0 0 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = lt( data, 4, {
	'accessor': getValue
});
// returns [ 0, 1, 0, 1, 1 ]
```

When comparing values between two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

var arr = [
	{'x': 4},
	{'x': 5},
	{'x': 6},
	{'x': 5},
	{'x': 3}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = lt( data, arr, {
	'accessor': getValue
});
// returns [ 0, 1, 0, 1, 1 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second (comparison) input `array`.

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ -10, -1, 0, 1, 10 ];

var out = lt( data, 0 {
	'copy': false
});
// returns [ 1, 1, 0, 0, 0 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = lt( mat, 3, {
	'copy': false
});
/*
	[  1 1
	   1 0
	   0 0 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value or string, the result of the comparison is `NaN`.

	``` javascript
		var data, out;

		out = lt( null, 1 );
		// returns NaN

		out = lt( true, 1 );
		// returns NaN

		out = lt( {'a':'b'}, 1 );
		// returns NaN

		out = lt( [ true, null, [] ], 1 );
		// returns [ NaN, NaN, NaN ]

		function getValue( d, i ) {
			return d.x;
		}
		data = [
			{'x':true},
			{'x':[]},
			{'x':{}},
			{'x':null}
		];

		out = lt( data, 1, {
			'accessor': getValue
		});
		// returns [ NaN, NaN, NaN, NaN ]
	```

*	When calling the function with a numeric value as the first argument and a `matrix` or `array` as the second argument, the `options` object is not applicable.

	``` javascript
		var out = lt( 4, [ 1, 2, 3 ], {
			'copy': false
		});
		// Throws an error
	```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	lt = require( 'compute-lt' ),
	sum = require( 'compute-sum' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}
out = lt( data, 50 );

// Count the number of values less than 50...
var count = sum( out );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = lt( data, 50, {
	'accessor': getValue
});

// Typed arrays...
data = new Float64Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*20 );
}
tmp = lt( data, 50 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [10,10], 'float64' );
out = lt( mat, 50 );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-lt.svg
[npm-url]: https://npmjs.org/package/compute-lt

[travis-image]: http://img.shields.io/travis/compute-io/lt/master.svg
[travis-url]: https://travis-ci.org/compute-io/lt

[coveralls-image]: https://img.shields.io/coveralls/compute-io/lt/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/lt?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/lt.svg
[dependencies-url]: https://david-dm.org/compute-io/lt

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/lt.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/lt

[github-issues-image]: http://img.shields.io/github/issues/compute-io/lt.svg
[github-issues-url]: https://github.com/compute-io/lt/issues
