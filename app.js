if(process.env.NODE_ENV != "production"){

    require('dotenv').config();
}


const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const dbUrl = process.env.ATLASDB_URL;

const flash = require("connect-flash");
const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto:{
        secret : process.env.SECRET,
    },
    touchAfter : 24*3600,
});
store.on("error", function(e){
    console.log("Session Store Error", e);
});


const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized : true, 
    cookie:{
        expires : Date.now()+ 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new  LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()) ;

// view engine setup

app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

const review = require("./models/review.js");
main().then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/", (req,res) =>{
    res.redirect("/listings");
});


app.use("/listings",listingRouter);

app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//mongoose setup

app.all( "*" , (req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
    });

app.use((err,req,res,next) => {
    let {status = 500,message = "Something went wrong"} = err;
    res.render("listings/error.ejs",{err});
});

app.listen(8080, () => {
    console.log(`Server is running on port http://localhost:8080` );
  });