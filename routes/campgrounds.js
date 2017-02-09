var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

router.get('/', function(req,res) {
	Campground.find({}, function(err,camps) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', {camps: camps, currentUser: req.user});
		}
	}); 
});

router.get('/new', function(req,res) {
	res.render('campgrounds/new');
});

router.post('/', function(req,res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCamp = {name: name, image:image, description: desc};
	Campground.create(newCamp, function(err,newCamp) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

router.get('/:id', function(req,res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, found) {
		if(err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', {camp: found});
		}
	});
});

function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;