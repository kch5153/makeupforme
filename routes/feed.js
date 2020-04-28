// Route handlers
const express = require('express');
const router = express.Router()
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

//import data models
const Look = require("../models/look");
const Profile = require("../models/profile");
const Product = require('../products.json');

router.get("/", ensureLoggedIn("/login"), function(req, res) {
  
  if(!req.user) {
    
  }else {
    
    Profile.findOne({userId: req.user._id}, function(err, profile) {
      if(!profile){
        
      } else {
        Look.find({profileId: { $in : profile.following}}, function(err, looklist){
          
          // error handling
          if(err){
            res.status(404).send
          }

          // sort looks so most recently posted looks are first
            looklist.sort(function(a,b) {
              const dtA = new Date(a['dateTime']);
              const dtB = new Date(b['dateTime']);
              return ( dtB.getTime() - dtA.getTime() );
            });
          // render feed
            res.status(200).render("feed", {looks: looklist, userId: req.user._id}); 
          
        });
      }
    });
    
  }
});

router.get("/:uId", function(req, res){
  
  // find profile with :id
  Profile.findOne({userId:req.params.uId}, function (err, profile) {
    
    let feedLooks = [];
    
    if(!profile) {
      res.status(404).send("404 Error: Page Not Found");
      return;
    }
    
    // find all looks with userId's listed in following
    Look.find( {userId: { $in : profile.following }}, 
      function(err, looklist) {
      
      // need to put error handling 
      if(err) {
        res.status(404).send()
      }
      // sort looks so most recently posted looks are first
        looklist.sort(function(a,b) {
          const dtA = new Date(a['dateTime']);
          const dtB = new Date(b['dateTime']);
          return ( dtB.getTime() - dtA.getTime() );
        });
      // render feed
        res.status(200).render("feed",{looks: looklist, userId: req.params.uId, profileId: profile._id}); 
      });  
  });
});

// profile search from feed
router.get("/search", function(req,res) {

  const query = require('url').parse(req.url, true).query;
  console.log(query.profilename);

  Profile.findOne({userName: query.profilename}, function(err, profile) {
    
    if(!profile) {
      res.status(404).send("404 Error: Page Not sdgf")
    } 
    res.status(200).render("search",{profile: profile[0], userId: req.params.id});
  });
});


module.exports = router;