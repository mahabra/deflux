var Deflux = require('./../../src/Deflux.js');
var validateNumber = new Deflux.Validator({
    testUnit: true,
    deepUnit: {
    	count: [function(val) {
    		return "number"===typeof val;
    	}]
    }
});
var defaults = new Deflux.Defaults({
	hello: 'World'
});
var store2 = new Deflux(validateNumber, defaults);

try {
    store2.setState({
        testUnit: 'Hello'
    });
} catch(e) {
    console.log('Invalid key');
}

store2.setState({
    testUnit: '333',
    deepUnit: {
    	count: 5
    }
});

console.log('Result 1:', store2.getState().testUnit);
console.log('Hello', store2.getState().hello);