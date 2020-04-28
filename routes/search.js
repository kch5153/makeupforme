// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Look = require("../models/look");
const Profile = require("../models/profile");
const Product = require('../products.json');


// profile search from feed
router.get("/", function(req,res) {

  const query = require('url').parse(req.url, true).query;
  console.log(query.profilename)
  
  Profile.find({userName: query.profilename}, function(err, profile) {
    
    if(!profile[0]) {
      res.status(404).redirect("/feed")
    } else {
      console.log(profile)
      res.status(200).render("search",{profile: profile[0]});
    }
  });
});


module.exports = router;