

module.exports = function(app, passport) {
	
	//  -----------  Index  /  ------------------
	app.get('/', function(req,res) {
		res.render('index.ejs');
	});
	
	
	//  ---------  Login   /login -------------------
	app.get('/login', function(req,res) {
		res.render('login.ejs', {message: req.flash('loginMessage') });
	});

	//app.post('/login', stuff);
	
	
	
	// ------------ Sign up   /signup ---------------------
	app.get('/signup', function(req,res) {
		res.render('signup.ejs', {message: req.flash('signupMessage') });
	});
	
	//app.post('/signup', stuff);
	
	
	
	// ------------ Profile   /profile --------------------
	app.get('/profile', isLoggedIn, function(req,res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});
	
	
	// ------------ Logout   /logout -----------------------
	app.get('/logout', function(req,res) {
		req.logout();
		res.redirect('/');
	});
	
	
	
	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();
			
		res.redirect('/');
	}
	
};