var msgs = require('./constMsgs.js');

function validate(key, value, validator) {
	var valid = true;
	if (validator instanceof Array) {
		validator.forEach(function(validator) {
			valid = validate(key, value, validator)
			if (valid!==true) { 
				return false;
			}
		});
	} else {
		if ("object"===typeof validator) {
			if (validator instanceof Object) {
				if ("object"===typeof value) {
					for (var prop in validator) {
						if (validator.hasOwnProperty(prop)) {
							valid = validate(prop, value[prop], validator[prop]);
							if (valid!==true) { 
								break;
							}
						}
					}
				} else {
					valid = new Error(key+' must be an object');
				}
			} else {
				if (!(value instanceof validator)) valid = new Error(key+' must be instance of '+validator);
			}
		} else if ("function"===typeof validator) {
			valid = validator(value);
		} else if (true===validator) {
			if ("undefined"===typeof value) {
				valid = new Error(key+' is required.');
			}
		} else {
			throw new Error(msgs.ERROR_VALIDATOR_INCORRECT_TYPE);
		}
	}

	return valid;
}

module.exports = validate;