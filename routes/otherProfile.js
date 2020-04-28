// Route handlers
const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require("body-parser");
const expressip = require('express-ip');

// ensure logged in checks to see if user is logged in
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.use(expressip().getIpInfoMiddleware);

//import data models
const Look = require("../models/look");
const Profile = require("../models/profile");
const Product = require("../products.json")

// user with :uId is viewing profile with :pId
router.get("/:pId", function(req, res){
  
  // find profile with :pId
  Profile.findById(req.params.pId, function (err, profile) {
    Look.find({profileId: req.params.pId}, function (err, looklist) {
      if(!profile){
        res.status(404).send("404 Error: Page Not Found");
        return;
      }else{
                  res.status(200).render("otherProfile", 
                                 
                  {name:profile.name,
                   pId: profile._id,
                   uId: req.params.uId,
                   looks: looklist,
                   image:profile.image,
                   city: profile.city,
                   state: profile.state,
                   bio: profile.bio
                  });
      };
    });
  });
});

// user with :uId follows profile with :pid
router.post("/:pId", ensureLoggedIn("/login"), function(req, res) {
  const userid = req.user._id;
  const profileid = mongoose.Types.ObjectId(req.params.pId);
  console.log(userid);
  Profile.findOne({userId: userid}, function(err, profile) {
    
    // check if user with userId follows profile with profileId
    const isInArray = profile.following.some(function (p) {
      return p.equals(profileid);
    });
    
    if(isInArray) {
     // user already follows profile
     console.log("you already follow this profile");
    }
    else {
      // add profile to list of following and save
      profile.following.push(profileid);
      profile.save()
    }
    res.redirect("/otherProfile/"+profileid)
    
  });
});

module.exports = router;
