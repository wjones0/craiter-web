
var config = require('../config');

module.exports = {

	
	'twitterAuth' : {
		'consumerKey' : config.twitter.consumer_key,
		'consumerSecret' : config.twitter.consumer_secret,
		'callbackURL' : 'http://localhost:8080/auth/twitter/callback'
	}
	
};