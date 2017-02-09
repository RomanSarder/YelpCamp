var express        = require('express'),
	app            = express(),
	bodyParser     = require('body-parser'),
	mongoose       = require('mongoose'),
	passport       = require('passport'),
	LocalStrategy  = require('passport-local'),
	User           = require('./models/user'),
	Campground 	   = require('./models/campground'),
	Comment        = require('./models/comment'),
	seedDB         = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
seedDB();

//Passport configuration
app.use(require('express-session')({
	secret: "Some secret phrase",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

// AUTH ROUTES
//============
app.get('/register', function(req,res) {
	res.render('register');
});

app.post('/register', function(req,res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user) {
		if(err) {
			console.log(err);
			return res.render('register')
		}
		passport.authenticate('local')(req,res,function() {
			res.redirect('/campgrounds');
		});
	});
});

//LOGIN ROUTES
app.get('/login', function(req,res) {
	res.render('login')
});

app.post('/login', passport.authenticate('local', 
	{
		successRedirect: "/campgrounds",
		failureRedirect: '/login'
	}), function(req,res) {
});



app.listen(3000, function() {
	console.log("YelpCamp server started");
});