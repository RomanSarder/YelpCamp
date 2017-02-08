var express    = require('express'),
app            = express(),
bodyParser     = require('body-parser'),
mongoose       = require('mongoose'),
Campground 	   = require('./models/campground'),
Comment        = require('./models/comment'),
seedDB         = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
seedDB();



app.get('/', function(req,res) {
	res.render('landing');
});

app.get('/campgrounds', function(req,res) {
	Campground.find({}, function(err,camps) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', {camps: camps});
		}
	}); 
});

app.get('/campgrounds/new', function(req,res) {
	res.render('campgrounds/new');
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
			res.render('campgrounds/show', {camp: found});
		}
	});
});

app.get('/campgrounds/:id/comments/new', function(req,res) {
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
		} else {
			res.render('comments/new', {campground: campground});
		}
	});
});

app.post('/campgrounds/:id/comments', function(req,res) {
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
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});



app.listen(3000, function() {
	console.log("YelpCamp server started");
});