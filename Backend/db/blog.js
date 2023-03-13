const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({

    image:String,
    // image:{
    //     type:String,
    //     required:true
    //  },
     title:{
        type:String,
        required:true
     },
     slug:{
        type:String,
        required:true
     },
     category:{
        type:String,
        required:true
     },
     date:{
        type:String,
        required:true
     },

    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("blogmanagers",blogSchema)