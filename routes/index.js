// Route handlers
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const expressip = require("express-ip");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");

//import data models
const Look = require("../models/look");
const Product = require("../products.json");
const User = require("../models/users");
const Profile = require("../models/profile");

router.use(expressip().getIpInfoMiddleware);

const ipstack = require("ipstack");

router.get("/", function(req, res) {
  const ipInfo = req.ipInfo.ip.substring(0, 13);

  res.status(200).render("home", {});
});

router.get("/signup", function(req, res) {
  res.render("signup", {});
});

//Post to sign up
router.post("/signup", function(req, res) {
  var myData = new User(req.body);

  console.log(myData);

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(myData.password, salt, function(err, hash) {
      if (err) {
        console.log(err);
      } else {
        myData.password = hash;
        myData
          .save()
          .then(item => {
            res.status(400).redirect("/profile/create/" + myData._id);
          })
          .catch(err => {
            res.status(400).send("unable to save to database");
          });
      }
    });
  });
});

router.get("/login", function(req, res) {
  res.status(200).render("login");
});

router.get("/adminLogin", function(req, res) {
  res.status(200).render("adminLogin");
});

router.post(
  "/adminLogin",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/admin",
    failureRedirect: "/adminLogin"
  }),
  (req, res) => {
    if (req.user) {
      res.status(200).redirect("/admin");
    } else {
      res.status(401).redirect("/");
    }
  }
);

router.post(
  "/login",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/myProfile",
    failureRedirect: "/login"
  }),
  (req, res) => {
    if (req.user) {
      
      res.status(200).redirect("/feed/" + req.user._id);
    } else {
      res.status(401).redirect("/");
    }
  }
);

router.get("/admin", requiresAdmin, function(req, res) {
  Profile.find({}, function(req, userlist) {
    res.status(200).render("admin", {
      users: userlist,
      name: "admin"
    });
  });
});

router.post(
  "/",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/admin",
    failureRedirect: "/login"
  }),
  (req, res) => {
    if (req.user) {
      console.log("logged in!", req.user);
      res.status(200).redirect("/admin/" + req.user._id);
    } else {
      res.status(401).redirect("/");
    }
  }
);

function requiresAdmin(req, res, next) {
  // get the users from session storage
  let sess = req.session;
  let isAdmin = false;

  // if the user is in the mongodb admin schema, then allow them access to the page.
  if (req.user.isAdmin) {
    console.log("user is admin! sending them to the admin page");
    next();
  } else {
    res.status(401).send("You do not have access to this page.");
  }
  // req.session.user = 'username' in when user has successfully logged in.
}

// logout
router.get("/logout", function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).redirect("/");
      }
    });
  }
});

//view profile to then have option to delete looks (big brother af)
router.get("/viewprofile/:username", function(req, res) {
   Profile.findOne({ userName: req.params.username }, function(err, profile) {

     Look.find({profileName: req.params.username} , function(err, looklist) {
        if(!profile) {
          res.status(404).send("404 Error: Page Not Found");
          return;
        } else {
           
        res.status(200).render("adminProfileView", { profile: profile, looks: looklist });
        }
     })
   })
})



//Deleting profile INCLUDING looks
router.post("/delete_user/:email/:username", function(req, res) {
  //delete user
  User.findOne({ email: req.params.email }, function(err, user) {
    user.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(req.params.user + " removed user");
        res.status(200);
      }
    });
  });
  
  //delete profile
  Profile.findOne({ userName: req.params.username }, function(err, item) {
    item.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(req.params.item + " removed profile");
        res.status(200); //dont send anything here, will prevent redirection back to admin portal 
      }
    });
  });
  //delete their associated looks
  const query = { "profileName": req.params.username };
  Look.deleteMany(query)
  .then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
  .catch(err => console.error(`Delete failed with error: ${err}`))
});


//DELETE look from database after clicking "delete", then return to profile
router.post("/adminDeleteLook/:pId/:lId/:username", function(req, res){
   Look.findById(req.params.lId, function (err, look) {
     Profile.findById(req.params.pId, function(err, profile){
      if(!look){
        res.status(404).send("404 Error: Page Not Found");
        return;
      }
    look.remove(function(err){
        if(err){
          res.status(500).send(err);
        }
        else{
          res.status(200)
        }
    });
    });
  });
});


module.exports = router;
