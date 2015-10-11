
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../app/models/user');

var configAuth = require('./auth');


module.exports = function (passport) {

	// ---------  passport session setup ------------
	// required for persistent login sessions
	// passport needs to serialize and deserialize users out of session
	
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	
	
	// --------------------- TWITTER ------------------------
	
	passport.use(new TwitterStrategy({
		consumerKey: configAuth.twitterAuth.consumerKey,
		consumerSecret: configAuth.twitterAuth.consumerSecret,
		callbackURL: configAuth.twitterAuth.callbackURL
	},
		function (token, tokenSecet, profile, done) {
			process.nextTick(function () {
				User.findOne({ 'twitter.id': profile.id }, function (err, user) {
					if (err)
						return done(err);

					if (user) {
						return done(null, user);
					} else {
						var newUser = new User();

						newUser.twitter.id = profile.id;
						newUser.twitter.token = token;
						newUser.twitter.username = profile.username;
						newUser.twitter.displayName = profile.displayName;

						newUser.save(function (err) {
							if (err)
								throw err;
							return done(null, newUser);
						});
					}
				});
			});
		}
		));
	

};