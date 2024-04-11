const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require( "../schema.js" );
const Listing = require("../models/listing.js");
const {isLoggedIn,validatelisting} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../CloudConfig.js");
const upload = multer({ storage});
//index route
router.get("/" ,wrapAsync(listingController.index));
//show route
//new should always be upper then /id so that  it will match the new first and not the id route
router.get("/new",isLoggedIn,listingController.newListing);  //shows a form to make new list 

router.get("/:id" , wrapAsync(listingController.showlist));
//create route
router.post("/",isLoggedIn,upload.single('listing[image]'),validatelisting, wrapAsync(listingController.indexAfterNew));

//update route
router.get("/:id/edit" ,isLoggedIn,isOwner, wrapAsync(listingController.editListing));

router.patch("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validatelisting, wrapAsync(listingController.EditChanges));
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteList));

module.exports = router;