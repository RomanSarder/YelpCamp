var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//NEW ROUTE
router.get('/new', isLoggedIn, function(req,res) {
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
		} else {
			res.render('comments/new', {campground: campground});
		}
	});
});

//CREATE ROUTE
router.post('/', isLoggedIn, function(req,res) {
	Campground.findById(req.params.id,function(err, campground) {
		if(err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			console.log(req.body.comment);
			Comment.create(req.body.comment, function(err, comment){
				if(err) {
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//EDIT
router.get('/:comment_id/edit', function(req,res) {
	Comment.findById(req.params.comment_id, function(err, found) {
		if(err) {
			res.redirect('back');
		} else {
			res.render('comments/edit', {campground_id: req.params.id, comment: found});;
		}
	});
});
//UPDATE
router.put('/:comment_id', function(req,res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updated) {
		if(err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});
//DELETE
router.delete('/:comment_id', function(req,res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//MIDDLEWARE
function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;