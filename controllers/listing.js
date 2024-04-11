const Listing = require("../models/listing.js");

module.exports.index = async(req,res) =>{
    const allList = await Listing.find({});
    res.render("listings/index.ejs",{allList});

};
module.exports.newListing= (req,res) =>{
    res.render("listings/new.ejs");
};

module.exports.showlist = async(req,res) =>{
    let {id} = req.params; 
    const item = await Listing.findById(id).populate({path : "reviews",populate:{path:"author"},}).populate("owner");
    if(!item){
        req.flash("error","listing does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{item});
};

module.exports.indexAfterNew = async(req,res) =>{
    
    let listing = req.body.listing;
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(listing);
    newlisting.owner=req.user._id;
    newlisting.image = {url,filename};
    await newlisting.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
};

module.exports.editListing = async (req,res) => {
    let {id} = req.params;
    const item = await Listing.findById(id);
    res.render("listings/edit.ejs",{item});
};

module.exports.EditChanges = async (req,res) =>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing}); 
    if(typeof req.file != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }

    req.flash("success","listing updated");
    res.redirect(`/listings/${id}`);    
};

module.exports.deleteList = async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted");
    res.redirect('/listings');
};