Less Than
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise comparison (less than) of an array.


## Installation

``` bash
$ npm install compute-lt
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var lt = require( 'compute-lt' );
```

#### lt( arr, x )

Computes an element-wise comparison (less than) for each input `array` element. `x` may either be an `array` of equal length or a single value (`number` or `string`).

The function returns an `array` with length equal to that of the input `array`. Each output `array` element is either `0` or `1`. A value of `1` means that an element is less than a compared value and `0` means that an element is __not__ less than a compared value.

``` javascript
var arr = [ 5, 3, 8, 3, 2 ],
	out;

// Single comparison value:
out = lt( arr, 4 );
// returns [ 0, 1, 0, 1, 1 ]

// Array of comparison values:
out = lt( arr, [ 6, 2, 6, 7, 3 ] );
// returns [ 1, 0, 0, 1, 1 ]
```


## Examples

``` javascript
var lt = require( 'compute-lt' ),
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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


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
