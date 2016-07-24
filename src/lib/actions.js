var actionTypes = require('./actionTypes.js');
/*
Actions
*/
exports.actionUpdate = function actionUpdate(data) {
	return {
		type: actionTypes.ACTION_TYPE_UPDATE,
		data: data
	}
}