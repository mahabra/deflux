var DEFAULTS_MUST_BE_AN_OBJECT= require('./constMsgs.js');
module.exports = function Validator(data) {
	if ("object"!==typeof data) throw new Error(VALIDATOR_MUST_BE_AN_OBJECT);
	for (var prop in data) {
		if (data.hasOwnProperty(prop)) this[prop] = data[prop];
	}
}