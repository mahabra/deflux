module.exports = function each(data, iterator) {
	for (var prop in data) {
		if (data.hasOwnProperty(prop)) {
			if (iterator(data[prop], prop)===false) break;
		}
	}
}