var actionTypes = require('./actionTypes.js');
exports.updateAll = function updateAll(state, action) {
	switch(action.type) {
		case actionTypes.ACTION_TYPE_UPDATE:
			return Object.assign(state, action.data);
		break;
		default:
			return state;
		break;
	}
}