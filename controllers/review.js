const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.newReview = async (req,res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save() ;
    req.flash("success","New review created");
    res.redirect("/listings/"+req.params.id);
}

module.exports.deleteReview = async (req,res) =>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
};