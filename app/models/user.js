

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
	
	username :String,
	cities:[{city :String}],
	search_strings:[{
		search : String,
		name : String
	}],
	posts:[{url : String}],
	twitter: {
		id	:String,
		token	:String,
		displayName	:String,
		username	:String
	}
});

// -----------   methods ---------------

// hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);	
};

// check if pw is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);	
};

// create the model and expose it
module.exports = mongoose.model('User', userSchema);
