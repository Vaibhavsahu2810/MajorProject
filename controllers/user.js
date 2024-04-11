const User = require("../models/user.js");
const passport = require("passport");

module.exports.signup = async (req,res) =>{
    try{
        let {email,username,password} = req.body;
    const newUser =new User({email,username});
    const registeredUser = await User.register(newUser,password);  //creating a promise which will 
    req.login(registeredUser,(err) =>{
        if(err){
        return next(err);
        }
        req.flash("success","Welcome to Tripz");                          //return the user object once it is created or an error if any
    res.redirect("/listings");  
    }
    );
     //redirect to listings page if user is created successfully else it will show error on sign up
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.login = async (req,res)=>{
    req.flash("success","Welcome to Tripz !!!");
    let redirectTo = res.locals.redirectTo || "/listings";
    res.redirect(redirectTo);
};

module.exports.logout = (req,res,next) =>{
    req.logout((err) =>{
         if(err){
            next(err);
         }
         req.flash("success","You  are logged out successfully");
         res.redirect("/listings");
    })
};