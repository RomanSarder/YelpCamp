var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var camps = [
		{name: "Salmon Creek", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
		{name: "Granite Hill", image:"https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
		{name: "Mountain Goat's rest", image:"https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg"}

	]

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res) {
	res.render('landing');
});

app.get('/campgrounds', function(req,res) {
	res.render('campgrounds', {camps: camps});
});

app.get('/campgrounds/new', function(req,res) {
	res.render('new');
});

app.post('/campgrounds', function(req,res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCamp = {name: name, image:image};
	camps.push(newCamp);
	res.redirect('/campgrounds');
});

app.listen(3000, function() {
	console.log("YelpCamp server started");
});