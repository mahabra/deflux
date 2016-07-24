var Deflux = require('./../../src/Deflux.js');
var validateNumber = new Deflux.Validator({
    testUnit: Deflux.validators.numberLike
});
var store2 = new Deflux(validateNumber);

try {
    store2.setState({
        testUnit: 'Hello'
    });
} catch(e) {
    console.log('Invalid key', e.message);
}

store2.setState({
    testUnit: '333'
});

console.log('Result 1:', store2.getState().testUnit);