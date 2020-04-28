// Data Model for profiles/users with passowrds hashed 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
        email:       {type: String},
        password:    {type: String},
        isAdmin:     {type: Boolean },
        // role:   { type: String, enum: ['admin', 'restricted'], required: true },   
});


module.exports = mongoose.model('user', userSchema);

// var user = [
//   {username: 'superadmin', email: 'superadmin@gmail.com', password: 'superadmin', role: 'admin'}
// ]
