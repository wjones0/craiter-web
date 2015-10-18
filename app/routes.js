var User = require('../app/models/user');


module.exports = function (app, passport) {
	
	
	
	
	// ----------------- TWITTER ----------------------------
	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect: '/profile',
			failureRedirect: '/'
		})
		);
	
	
	// ------------ Logout   /logout -----------------------
	app.post('/logout', function (req, res) {
		req.logout();
		res.json({ redirect: '/' });
	});
	
	// --------------  user data   /api/userData ---------------
	app.get('/api/userData', isLoggedInAjax, function (req, res) {
		return res.json(req.user);
	});

	app.post('/api/searchstring', isLoggedInAjax, function (req, res) {
		User.findOne({ 'twitter.token': req.user.twitter.token }, function (err, user) {
			if (err)
				return done(err);

			if (user) {
				user.search_strings.push(req.body.search);
				user.save(function(err) {
					if(err)
						throw err;
					return res.json({});
				})
			} else {
				return res.json({userfound:"false"});
			}
		});
	});

	app.delete('/api/searchstring', isLoggedInAjax, function(req,res) {
		User.findOne({ 'twitter.token': req.user.twitter.token }, function (err, user) {
			if (err)
				return done(err);
			if (user) {
				var index = -1;
				var search = req.body.search;
				for(var i=0; i<user.search_strings.length; i++)
				{
					if(user.search_strings[i].name === search.name && user.search_strings[i].search === search.search)
						index = i;
				} 
				if(index > -1) {
					user.search_strings.splice(index,1);
				}
				user.save(function(err) {
					if(err)
						throw err;
					return res.json({});
				})
			} else {
				return res.json({userfound:"false"});
			}
		});
		
	});	

	//  -----------  Index  /  ------------------
	app.get('*', function (req, res) {
		res.sendfile('./public/views/index.html');
	});


	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();

		res.redirect('/');
	}

	function isLoggedInAjax(req, res, next) {
		if (!req.isAuthenticated()) {
			return res.json({ redirect: '/login' });
		} else {
			next();
		}
	}

};