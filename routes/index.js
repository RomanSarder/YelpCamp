var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//ROOT ROUTE
router.get('/', function(req,res) {
	res.render('landing');
});

// AUTH ROUTES
//============

//NEW
router.get('/register', function(req,res) {
	res.render('register');
});

//CREATE
router.post('/register', function(req,res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user) {
		if(err) {
			console.log(err);
			return res.render('register')
		}
		passport.authenticate('local')(req,res,function() {
			res.redirect('/campgrounds');
		});
	});
});

//LOGIN ROUTES
router.get('/login', function(req,res) {
	res.render('login')
});

router.post('/login', passport.authenticate('local', 
	{
		successRedirect: "/campgrounds",
		failureRedirect: '/login'
	}), function(req,res) {
});
//LOGOUT
router.get('/logout', function(req,res) {
	req.logout();
	res.redirect('/campgrounds');
});

module.exports = router;
