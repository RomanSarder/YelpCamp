var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
	res.render('landing');
});

app.get('/campgrounds', function(req,res) {
	var camps = [
		{name: "Salmon Creek", image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
		{name: "Granite Hill", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
		{name: "Mountain Goat's rest", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"}

	]
	res.render('campgrounds', {camps: camps});
});

app.listen(3000, function() {
	console.log("YelpCamp server started");
});