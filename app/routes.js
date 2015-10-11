

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
		res.json({ redirect: '/'});
	});
	
	// --------------  user data   /api/userData ---------------
	app.get('/api/userData', isLoggedInAjax, function (req, res) {
		return res.json(req.user);
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