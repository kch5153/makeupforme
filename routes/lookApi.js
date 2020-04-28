// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Look = require("../models/look");
const Profile = require("../models/profile");
const Product = require('../products.json');

//READ page to create look. 
router.get("/create/:uId/:pId", (req, res) => {

var brands = Product
    .map(({brand}) => brand)
    .filter((brand, i, arr) => arr.lastIndexOf(brand) === i);

var types = Product
    .map(({product_type}) => product_type)
    .filter((product_type, i, arr) => arr.lastIndexOf(product_type) === i);
  
 res.render("createLook", {
   cu: "Create",
   pId: req.params.pId,
   uId: req.params.uId,
   lId: "",
   name: "placeholder",
   image: "placeholder",
   brands: brands,
   types: types,
   products: Product,
   vURL: "",
   vtag1: "",
   vtag2: "",
   vtag3: "", 
   vtag4: "", 
   vtag5: "",
   vbrand1: "",
   brand1: "Select Brand",
   vproduct1: "",
   product1: "Select Product",
   vbrand2: "",
   brand2: "Select Brand",
   vproduct2: "",
   product2: "Select Product",
   vbrand3: "",
   brand3: "Select Brand",
   vproduct3: "",
   product3: "Select Product"
    
 });
  
});

//CREATE look to database after clicking submit button
router.post("/create/:uId/:pId", (req, res) => {
  
  Profile.findById(req.params.pId, (err, profile) =>{
  
  var myData = new Look(req.body);
  
  myData.profileId = req.params.pId;
  
  myData.profileName = profile.userName;
  
  myData.tags = [
    req.body.tag1,
    req.body.tag2,
    req.body.tag3,
    req.body.tag4,
    req.body.tag5
  ];
  
  myData.products = [
    req.body.product1,
    req.body.product2,
    req.body.product3,
  ];

  console.log(myData);
  console.log(profile);
    
    myData.save()
    .then(item => {
      res.status(400).redirect("/myProfile/")

  })
    .catch(err => {
       res.status(500).send("unable to save to database");
});
    
  });
  
});


//DELETE look from database after clicking "delete", then return to profile
router.post("/delete/:pId/:lId", function(req, res){
   Look.findById(req.params.lId, function (err, look) {
     if(err) {
       res.status(500).send()
     }
     if(!look){
        res.status(404).send("404 Error: Page Not Found");
        return;
      }
     Profile.findById(req.params.pId, function(err, profile){
      
    look.remove(function(err){
        if(err){
          res.status(500).send(err);
        }
        else{
          res.status(204).redirect("/myProfile/");
        }
    });
    });
  });
});

//Read the page where you update a look.
router.get("/update/:pId/:lId", function (req,res){
  Look.findById(req.params.lId, function (err, look) {
     Profile.findById(req.params.pId, function(err, profile){
       
var pArr = look.products;
var currBs = []
var currPs = []
var currBVs = []
var currPVs = []
       
for(var p of pArr){
  if(p !== ""){
  currBs.push(JSON.parse(p).brand);
  currPs.push(JSON.parse(p).name);
  currBVs.push(JSON.parse(p).brand);
  currPVs.push(p);
}else{
  currBs.push("Select Brand")
  currPs.push("Select Product")
  currBVs.push("")
  currPVs.push("")
}
};
  
       console.log(currPVs)
var userId = req.params.pId;
  
var brands = Product
    .map(({brand}) => brand)
    .filter((brand, i, arr) => arr.lastIndexOf(brand) === i);

var types = Product
    .map(({product_type}) => product_type)
    .filter((product_type, i, arr) => arr.lastIndexOf(product_type) === i);
  
 res.status(200).render("createLook", {
   cu: "Update",
   uId: profile.userId,
   pId: userId,
   lId: "/"+req.params.lId,
   name: "placeholder",
   image: "placeholder",
   brands: brands,
   types: types,
   products: Product,
   vURL: look.image,
   vtag1: look.tags[0],
   vtag2: look.tags[1],
   vtag3: look.tags[2],
   vtag4: look.tags[3], 
   vtag5: look.tags[4],
   vbrand1: currBVs[0],
   brand1: currBs[0],
   vproduct1: currPVs[0],
   product1: currPs[0],
   vbrand2: currBVs[1],
   brand2: currBs[1],
   vproduct2: currPVs[1],
   product2: currPs[1],
   vbrand3: currBVs[2],
   brand3: currBs[2],
   vproduct3: currPVs[2],
   product3: currPs[2],

});
});
});
});

router.post("/update/:uId/:pId/:lId", (req, res) => {

  Look.findByIdAndUpdate(req.params.lId, {
  
    
    image: req.body.image,
    tags: [
            req.body.tag1,
      req.body.tag2,
      req.body.tag3,
      req.body.tag4,
      req.body.tag5,
                         ],
    products: [
            req.body.product1,
            req.body.product2,
            req.body.product3
    ]
  }, {new : true}, function(err, profile) {
  
    if(!err){
      res.status(200).redirect("/myProfile/")
    } else {
      res.status(500).send(err)
    }

});
});

  
module.exports = router;