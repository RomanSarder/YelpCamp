var express        = require('express'),
	app            = express(),
	bodyParser     = require('body-parser'),
	mongoose       = require('mongoose'),
	passport       = require('passport'),
	LocalStrategy  = require('passport-local'),
	User           = require('./models/user'),
	Campground 	   = require('./models/campground'),
	Comment        = require('./models/comment'),
	flash          = require('connect-flash'),
	methodOverride = require('method-override'),
	seedDB         = require('./seeds');

//method-override should be above routes
app.use(methodOverride('_method'));
//Requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")

//connect mongo and configure express
mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.use(flash());
// seedDB();

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

//Passing req.user to all templates
app.use(function(req,res,next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function() {
	console.log("YelpCamp server started");
});