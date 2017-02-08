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
	Campground.findById(req.params.id).populate('comments').exec(function(err, found) {
		if(err) {
			console.log(err);
		} else {
			console.log(found);
			res.render('show', {camp: found});
		}
	});
});

app.listen(3000, function() {
	console.log("YelpCamp server started");
});