var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
		name: "Cloud's Rest",
		image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
		description: "blah blah blah"
	},
	{
		name: "Desert Mesa",
		image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
		description: "blah blah blah"
	},
	{
		name: "Canyon Floor",
		image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",
		description: "blah blah blah"
	}
];
function seedDB() {
	//REMOVE ALL CAMPS
	Campground.remove({}, function(err) {
		if(err) {
			console.log(err);
		}
		console.log("REMOVED CAMPS");
		//add a few camps
		data.forEach(function(seed){
			Campground.create(seed, function(err,camp) {
				if(err) {
					console.log(err);
				} else {
					console.log('added a camp');
					//create a comment
					Comment.create({
						text: "This place is great, but I wish there was an internet",
						author: "Homer"
					}, function(err, comment) {
						if(err) {
							console.log(err);
						} else {
							camp.comments.push(comment);
							camp.save()
							console.log('Created new comment');
						}
					});
				}
			})
		});
	});
}

module.exports = seedDB;
