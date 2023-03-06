const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("categorymanagers", categorySchema);