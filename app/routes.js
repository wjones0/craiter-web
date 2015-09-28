

module.exports = function (app, passport) {
	
	
	
	//  ---------  Login   /login -------------------
	// app.get('/login', function(req,res) {
	// 	res.render('login.ejs', {message: req.flash('loginMessage') });
	// });

	app.post('/login', function (req, res, next) {
		if (!req.body.email || !req.body.password) {
			return res.json({ error: 'Email and Password required' });
		}
		passport.authenticate('local-login', function (err, user, info) {
			if (err) {
				return res.json(err);
			}
			if (user.error) {
				return res.json({ error: user.error });
			}
			req.logIn(user, function (err) {
				if (err) {
					return res.json(err);
				}
				return res.json({ redirect: '/profile' });
			});
		})(req, res);
	});
	
	
	
	// ------------ Sign up   /signup ---------------------
	// app.get('/signup', function(req,res) {
	// 	res.render('signup.ejs', {message: req.flash('signupMessage') });
	// });
	
	app.post('/signup', function (req, res, next) {
		if (!req.body.email || !req.body.password) {
			return res.json({ error: 'Email and Password required' });
		}
		passport.authenticate('local-signup', function (err, user, info) {
			if (err) {
				return res.json(err);
			}
			if (user.error) {
				return res.json({ error: user.error });
			}
			req.logIn(user, function (err) {
				if (err) {
					return res.json(err);
				}
				return res.json({ redirect: '/profile' });
			});
		})(req, res);
	});
	
	
	
	// ------------ Profile   /profile --------------------
	// app.get('/profile', isLoggedIn, function(req,res) {
	// 	res.render('profile.ejs', {
	// 		user : req.user
	// 	});
	// });
	
	
	// -------------  FACEBOOK -----------------------------
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));	
	
	
	// ----------------- TWITTER ----------------------------
	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect: '/profile',
			failureRedirect: '/'
		})
		);
	
	
	// ------------------ GOOGLE ----------------------------
	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

	app.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));
	
	
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