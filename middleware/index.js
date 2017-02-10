var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all middleware goes here
var middlewareObj = {};

middlewareObj.checkAuth = function checkAuth(req,res,next) {
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, found) {
			if(err) {
				res.redirect('back');
			} else {
				if(found.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
}
middlewareObj.checkCommentOwnership = function(req,res,next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, found) {
			if(err) {
				res.redirect('back');
			} else {
				if(found.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
}
middlewareObj.isLoggedIn = function(req,res,next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Please Log In First');
	res.redirect('/login');
}


module.exports = middlewareObj;