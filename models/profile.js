// Data Model for profiles
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const now = new Date();

const ProfileSchema = new Schema(
  {
    image: {type: String},
    name: {type: String},
    userName: {type: String},
    email: {type: String},
    userId : {type : String},
    tags: {type: []},
    drawer: {type: []},
    bio: {type: String},
    following: {type: []},
    looks: {type: []},
    city: {type: String},
    state: {type: String}
  }
);

// Export model
module.exports = mongoose.model("profile", ProfileSchema);