const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({

    image:String,
    title:String,
    slug:String,
    category:String,
    date:String
})

module.exports = mongoose.model("blogmanagers",blogSchema)