const express = require('express');
const app = express();
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

const cors = require("cors");
require("./db/config")


const Category = require('./db/category');
const category = require('./db/category');

app.use(express.json());

app.use(cors());


//post api

app.post('/add-category', async (req, res) => {
    const { category } = req.body;
    const newCategory = new Category({ category, createdAt: Date.now() });
    const result = await newCategory.save();
    res.send(result);
});


//get api

app.get('/list-category', async (req, res) => {
    let categorylist = await category.find().sort({ createdAt: -1 });
    res.send(categorylist);
})

//delete api

app.delete("/delete/:_id", async (req, res) => {
    // console.log(req.params)
    let categorylist = await category.deleteOne(req.params)
    res.send(categorylist)
})

//edit api

app.put("/update-category/:_id",async(req,res)=>{

    //console.log(req.params ,"edit item")
    let data = await Category.updateOne(
        req.params,
        {
            $set: req.body
        }
        );
    res.send(data)
})


app.listen(5000);