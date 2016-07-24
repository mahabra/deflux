var msgs = require('./lib/constMsgs.js');
var actionTypes = require('./lib/actionTypes.js');
var actionUpdate = require('./lib/actions.js').actionUpdate;
var Validator = require('./lib/Validator.js');
var Defaults = require('./lib/Defaults.js');
var reducerUpdateAll = require('./lib/reducers.js').updateAll;
var validate = require('./lib/validate.js');
var validators = require('./lib/validators.js');
var each = require('./lib/each.js');
var $$symbols = require('./lib/symbols.js');
var $$state  = $$symbols.$$state,
	$$status = $$symbols.$$status,
	$$reducer = $$symbols.$$reducer,
	$$validators = $$symbols.$$validators;



var Deflux = function Deflux() {
	this[$$state] = {};
	// Validators
	Object.defineProperty(this, $$validators, {
		configurable: false,
		enumerable: false,
		writable: false,
		value: {}
	});
	
	Object.defineProperty(this, $$status, {
		configurable: false,
		enumerable: false,
		writable: false,
		value: {
			vergin: true // State tells that store still virgin
		}
	});

	Object.defineProperty(this, $$reducer, {
		configurable: false,
		enumerable: false,
		writable: true,
		value: reducerUpdateAll
	});
	
	Array.from(arguments).forEach(function(preset) {
		this.use(preset);
	}.bind(this));
}

Deflux.Validator = Validator;
Deflux.Defaults = Defaults;
Deflux.validators = validators;

Deflux.prototype = {
	constructor: Deflux,
	/**
	* Method takes any object and handle it depending of the instance
	* 
	* Supported instances:
	* Validate - adds validation rules
	* Defaults - adds default properties
	* Object - set new data to store
	*/
	use: function(preset) {
		switch(true) {
			/*
			Validate store values
			*/
			case (preset instanceof Validator):
				if (this[$$status].isDispatched) {
					var validateResult;
					for (var prop in preset) {
						if (preset.hasOwnProperty(prop)) {
							validateResult = validate(prop, this[$$state][prop], preset[prop]);
							if (validateResult!==true) {
								throw validateResult;
							}
						}
					}
				}
				this[$$validators] = Object.assign(this[$$validators], preset);
			break;
			case (preset instanceof Defaults):
				for (var prop in preset) {
					if (preset.hasOwnProperty(prop)) {
						if (!this[$$state].hasOwnProperty(prop)) this.dispatch(actionUpdate({
							[prop]: preset[prop]
						}));
					}
				}
			break;
			case (preset instanceof Object):
				this.dispatch(actionUpdate(preset));
			break;
			default:
				throw new Error(msgs.ERROR_MSG_UNSUPPORTED_PRESET_TYPE);
			break;
		}
	},
	validate: function(data) {
		// Validate
		var valid = true;
		each(data, function(value, key) {
			if (this[$$validators][key]) {
				valid = validate(key, value, this[$$validators][key]);
				if (valid!==true) {
					throw valid===false ? new Error('Invalid value of key `'+key+'`') : valid;
					return false;
				}
			}
        }.bind(this));

		if (valid!==true) throw valid;

		return valid;
	},
	dispatch: function(action) {
		var state = this[$$reducer].call(this, this[$$state], action);
		if (this.validate(state)===true) {
			/* 
			Make it dirty. If another validators will added it will be executed.
			*/
			this[$$status].isDispatched = false;
			this[$$state] = state;
		}
	},
	setState: function(data) {
		if (!(data instanceof Object)) throw new Error("State can be only an plain object");
		return this.dispatch(actionUpdate(data));
	},
	getState: function() {
		return this[$$state];
	}
}

module.exports = Deflux;