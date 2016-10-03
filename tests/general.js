var test = require('ava');
var Deflux = require('./../src/Deflux.js');

var validators = new Deflux.Validator({
	testUnit: true
});
var validateNumber = new Deflux.Validator({
	testUnit: Deflux.validators.numberLike
});

var store = new Deflux(validators);

/*
Must fail, because testUnit required.
*/
test("Simple deflux", function(t) {
	try {
		store.setState({
			hello: 'World'
		});
		t.fail();
	} catch(e) {
		t.pass();
	}
});

/*
Must pass, because testUnit required.
*/
test("Simple deflux #2", function(t) {
	try {
		store.setState({
			testUnit: 'Hello'
		});
		t.fail();
	} catch(e) {
		t.pass();
	}
});

var store2 = new Deflux(validateNumber);
test("Number in deflux", function(t) {
	
	try {
		store.setState({
			testUnit: 'Hello'
		});
		t.fail();
	} catch(e) {
		t.pass();
	}
});


test("Number in deflux", function(t) {
	try {
		store.setState({
			testUnit: '333'
		});
		t.pass();
	} catch(e) {
		console.log('Error: ', e);
		t.fail();
	}
});

