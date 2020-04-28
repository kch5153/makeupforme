// Route handlers
const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
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

// this route should only be available to logged-in users
// and they should only get to see their own profile, so we don't need
// this route parameterized
router.get("/", ensureLoggedIn("/login"), (req, res) => {
  if (!req.user) {
    console.log("No User");
    res.status(404).redirect('/login');
  }
  else {
    
    Profile.findOne({userId: req.user._id}, function(err, profile) {
        
        if (!profile) {
          res.status(404).redirect("/profile/create/"+ req.user._id)
        }else{
          Profile.find({}, function(err, allprofiles) {
          Look.find({profileId: profile._id} , function(err, looklist) {
            if(!profile) {
              res.status(404).send("404 Error: Page Not Found");
              return;
            } else {

              res.status(200).render("myProfile",
              {
                allprofiles: allprofiles,
                tags:profile.tags,
                following:profile.following,
                name: profile.name,
                pId: profile._id,
                uId: profile.userId,
                looks: looklist,
                image: profile.image,
                city: profile.city,
                state: profile.state,
                bio: profile.bio,
                isAdmin: req.user.isAdmin || false,
              });
            }
          });
          });
        }
  });
  };
}); 
 /*
router.get("/:uId/:pId", function(req, res){
  
  Profile.findById(req.params.pId, function (err, profile) {
    Look.find({profileId: req.params.pId}, function (err, looklist) {
      if(!profile){
        res.status(404).send("404 Error: Page Not Found");
        return;
      }else{
                  res.status(200).render("myProfile", 
                                 
                  {name:profile.name,
                   pId: profile._id,
                   uId: profile.userId,
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
*/

//delete all looks and profile 
router.post("/delete/:id", function(req, res){
  Look.find({profileId: req.params.id}, function(err, looklist){
   Profile.findById(req.params.id, function (err, profile) {
     if(!profile){
        res.status(404).send("404 Error: Page Not Found");
        return;
      }
   
    
    let databaseError = "";
    for(var l of looklist){
      l.remove(function(err){
        if(err){
          databaseError += err;
        }
      });
    };
     
    profile.remove(function(err){
        if(err){
          databaseError += err
        }
    });
     
     
     if (databaseError.length) {
       res.status(500).send(databaseError);
     }
     else {
       res.status(204).redirect("/");
     }
     
     
  });
  
});
});
  
module.exports = router;

