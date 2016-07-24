module.exports = Object.freeze({
	numberLike: function(value) {
		return !isNaN(parseInt(value));
	}
});