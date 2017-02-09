var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
		name: "Cloud's Rest",
		image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida id velit quis lacinia. Maecenas venenatis nunc nec dolor dictum, non facilisis nisl sollicitudin. In sed posuere ipsum. Aenean in dictum ligula. Donec mattis turpis sit amet fringilla facilisis. Sed dictum est purus, vitae bibendum nisi malesuada at. Maecenas risus augue, euismod eu mi sed, tristique mollis odio. Sed vestibulum dui sed elit ultrices, ac elementum dui laoreet. Nunc et aliquet lacus. Aenean posuere blandit nulla et aliquet. Proin aliquet lobortis urna, eu tincidunt nisl venenatis id. Etiam quis pharetra enim. Aliquam vitae turpis non magna cursus gravida. Sed egestas placerat ligula, condimentum sollicitudin purus finibus nec."
	},
	{
		name: "Desert Mesa",
		image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida id velit quis lacinia. Maecenas venenatis nunc nec dolor dictum, non facilisis nisl sollicitudin. In sed posuere ipsum. Aenean in dictum ligula. Donec mattis turpis sit amet fringilla facilisis. Sed dictum est purus, vitae bibendum nisi malesuada at. Maecenas risus augue, euismod eu mi sed, tristique mollis odio. Sed vestibulum dui sed elit ultrices, ac elementum dui laoreet. Nunc et aliquet lacus. Aenean posuere blandit nulla et aliquet. Proin aliquet lobortis urna, eu tincidunt nisl venenatis id. Etiam quis pharetra enim. Aliquam vitae turpis non magna cursus gravida. Sed egestas placerat ligula, condimentum sollicitudin purus finibus nec."
	},
	{
		name: "Canyon Floor",
		image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida id velit quis lacinia. Maecenas venenatis nunc nec dolor dictum, non facilisis nisl sollicitudin. In sed posuere ipsum. Aenean in dictum ligula. Donec mattis turpis sit amet fringilla facilisis. Sed dictum est purus, vitae bibendum nisi malesuada at. Maecenas risus augue, euismod eu mi sed, tristique mollis odio. Sed vestibulum dui sed elit ultrices, ac elementum dui laoreet. Nunc et aliquet lacus. Aenean posuere blandit nulla et aliquet. Proin aliquet lobortis urna, eu tincidunt nisl venenatis id. Etiam quis pharetra enim. Aliquam vitae turpis non magna cursus gravida. Sed egestas placerat ligula, condimentum sollicitudin purus finibus nec."
	}
];
function seedDB() {
	//REMOVE ALL CAMPS
	Campground.remove({}, function(err) {
		if(err) {
			console.log(err);
		}
		console.log("REMOVED CAMPS");
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
