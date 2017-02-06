var express    = require('express'),
	app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose')


mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});
var Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', function(req,res) {
	res.render('landing');
});

app.get('/campgrounds', function(req,res) {
	Campground.find({}, function(err,camps) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds', {camps: camps});
		}
	}); 
});

app.get('/campgrounds/new', function(req,res) {
	res.render('new');
});

app.post('/campgrounds', function(req,res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCamp = {name: name, image:image};
	Campground.create(newCamp, function(err,newCamp) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

app.listen(3000, function() {
	console.log("YelpCamp server started");
});