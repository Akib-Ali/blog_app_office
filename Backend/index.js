const express = require('express');
const app = express();
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

const cors = require("cors");
require("./db/config")


const Category = require('./db/category');
const category = require('./db/category');

app.use(express.json());

app.use(cors());


app.post('/add-category', async (req, res) => {

    let category = new Category(req.body)
    let result = await category.save()
    res.send(result)
});


//get api

app.get('/list-category', async(req,res)=>{

    let categorylist = await category.find()
    res.send(categorylist)

})

//delete api

app.delete("/delete/:_id", async(req,res)=>{
   // console.log(req.params)
    let categorylist = await category.deleteOne(req.params)
    res.send(categorylist)
})


app.listen(5000);