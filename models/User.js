const mongoose = require("mongoose");

const User = mongoose.model("User", {
	email: String,
	username: String,
	token: String,
	hash: String,
	salt: String,
	fav_comics: Array,
	fav_characters: Array,
});

module.exports = User;
