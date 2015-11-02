
var config = require('../config');

module.exports = {

	
	'twitterAuth' : {
		'consumerKey' : config.twitter.consumer_key,
		'consumerSecret' : config.twitter.consumer_secret,
		'callbackURL' : 'http://localhost:8080/auth/twitter/callback'
		
		// 'consumerKey' : process.env.TWITCONSUMERKEY,
		// 'consumerSecret' : process.env.TWITCONSUMERSECRET,
		// 'callbackURL' : process.env.TWITURLCALLBACK

	}
	
};