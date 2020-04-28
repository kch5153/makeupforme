const express = require('express');
const router = express.Router()
const expressip = require('express-ip');
//import data models
const Profile = require("../models/profile");
const Look = require("../models/look");
const Product = require("../products.json");

router.use(expressip().getIpInfoMiddleware);
const ipstack = require('ipstack')

router.get("/create/:id", (req, res) => {
  
  var brands = Product
    .map(({brand}) => brand)
    .filter((brand, i, arr) => arr.lastIndexOf(brand) === i);

  res.render("createProfile",{
    cu: "Create",
    userId: req.params.id,
    brands: brands,
    products: Product,
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
   product3: "Select Product",
    vURL: "",
    vEmail: "",
   vtag1: "",
   vtag2: "",
   vtag3: "", 
   vtag4: "", 
   vtag5: "",
   vUserName: "",
   vName:"",
   vPassword:"",
   vBio: ""
  });
});

router.post("/createProfile/:id", (req, res) => {
  var myData = new Profile(req.body);
  
  myData.userId = req.params.id;
  
  var city;
  var state;
  
  const ipInfo = req.ipInfo.ip.substring(0,13);
  ipstack(ipInfo,process.env.KEY,(err, response) => {
      city = response.city
      state = response.region_code
      console.log(city);
      console.log(state);
  
  myData.city = city;
  myData.state = state;
    myData.following.push(myData._id);
  
  
    myData.email = req.body.email
  myData.tags = [
    req.body.tag1,
    req.body.tag2,
    req.body.tag3,
    req.body.tag4,
    req.body.tag5
  ];
  myData.drawer = [
    req.body.product1,
    req.body.product2,
    req.body.product3,
  ];
  
  console.log(myData);
  console.log(ipInfo);
  
 myData.save()
    .then(item => {
      res.status(400).redirect("/myProfile")

  })
    .catch(err => {
       res.status(400).send("unable to save to database");
});
});
});

module.exports = router;