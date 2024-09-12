const mongoose = require('mongoose');

const users = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    
    price : {
        type : Number,
        required : true,
    },
    
    use : {
        type : String,
        required : true,
    },
    
    description : {
        type : String,
        required : true,
    },
    
    image : {
        type : String,
        required : true,
    },
    
    
});

module.exports = mongoose.model("users", users);