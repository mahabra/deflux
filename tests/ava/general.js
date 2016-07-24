var test = require('ava');
var Deflux = require('./../../src/Deflux.js');

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
		t.pass();
	} catch(e) {
		t.fail(e);
	}
});

var store2 = new Deflux(validateNumber);
test("Incorrect Number in deflux", function(t) {
	
	try {
		store2.setState({
			testUnit: 'Hello'
		});
		t.fail();
	} catch(e) {
		t.pass();
	}
});


test("Number in deflux correct", function(t) {
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

var def = new Deflux.Defaults({
	testUnit: 777
});
test('Defaults', function(t) {
	var store3 = new Deflux(validateNumber, def);
	store3.setState({
		hello: 'World'
	});

	if (store3.getState().testUnit===777) {
		t.pass();
	} else {
		t.fail();
	}
});
