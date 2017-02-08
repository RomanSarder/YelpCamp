var express    = require('express'),
	app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Campground = require('./models/campground');
    seedDB     = require('./seeds');

seedDB();
mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Campground.create({
// 	name: "Granite Hill",
// 	image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
// 	description: "Thit is a huge granite hill, no bathrooms. No water, Beautiful granite!"
// }, function(err,camp) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(camp);
// 	}
// });

app.get('/', function(req,res) {
	res.render('landing');
});

app.get('/campgrounds', function(req,res) {
	Campground.find({}, function(err,camps) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', {camps: camps});
		}
	}); 
});

app.get('/campgrounds/new', function(req,res) {
	res.render('new');
});

app.post('/campgrounds', function(req,res) {
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

app.get('/campgrounds/:id', function(req,res) {
	Campground.findById(req.params.id, function(err, found) {
		if(err) {
			console.log(err);
		} else {
			res.render('show', {camp: found});
		}
	});
});

app.listen(3000, function() {
	console.log("YelpCamp server started");
});