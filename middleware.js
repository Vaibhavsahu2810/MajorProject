const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

const ExpressError = require("./utils/ExpressError.js");
const {ReviewSchema} = require( "./schema.js" );
const {listingSchema} = require( "./schema.js" );  // import the schema from schema.
module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create listing!");
        return res.redirect("/login");
    };
    next();
}

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectTo = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner =  async (req,res,next) =>{
    let {id} = req.params;
    let listing =await Listing.findById(id);
    if(!listing.owner._id.equals(req.user._id)){
        req.flash("error", "You do not have permission to perform that action.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validatelisting = (req,res,next) => {
    let result = listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    }
    else{
    next();
    }
}


module.exports.validatereview = (req,res,next) => {
    let result = ReviewSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    }
    else{
    next();
    }
}

module.exports.isAuthor =  async (req,res,next) =>{
    let {id,reviewId} = req.params;
    let review =await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash("error", "You do not have permission to perform that action.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
