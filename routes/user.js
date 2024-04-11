const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
router.get("/signup" ,(req,res) =>{
    res.render("users/signup.ejs");
})


router.post("/signup",userController.signup);

router.get("/login" , (req,res) =>{
    res.render("users/login.ejs");
})

router.post("/login",saveRedirectUrl, passport.authenticate("local",{failureRedirect : "/login",failureFlash : true}),userController.login);

module.exports = router;

router.get("/logout",userController.logout);


// app.get("/demouser" , async (req,res) =>{
//     let newUser = new User({
//         username:"Demouser",
//         email:"demo@gmail.com",
//     });
//     let registered = await User.register(newUser, "Demo123") ;
//     res.send(registered);
// });