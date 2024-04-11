const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validatereview, isLoggedIn, isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

router.post("/",isLoggedIn,validatereview,wrapAsync(reviewController.newReview));

router.delete("/:reviewId" ,isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));


module.exports = router;