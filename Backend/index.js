const express = require('express');
const app = express();
let bodyParser = require('body-parser')
require('dotenv').config()
const multer = require('multer')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: true }))

const cors = require("cors");
require("./db/config")


const Category = require('./db/category');
const category = require('./db/category');
const Blog = require("./db/blog")


app.use(express.json());

app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image'); // Set field name for file upload

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
}




//post api

// app.post('/add-category', async (req, res) => {
//     const { category } = req.body;
//     const newCategory = new Category({ category, createdAt: Date.now() });
//     const result = await newCategory.save();
//     res.send(result);
// });

app.post('/add-category', async (req, res) => {
    const { category } = req.body;
    if (!category) {
        return res.status(422).send({ message: "Please fill category." });
    }
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

//get one item api

app.get("/list-category/:id", async(req,res)=>{

    let categorylist = await category.findOne({_id: req.params.id})
    if(categorylist){
        res.send(categorylist)

    }else{
        res.send({"categorylist":"NO Record found"})
    }

})




//edit api

app.post("/update-category/:_id", async (req, res) => {

    console.log(req.params ,"edit item")
         let data = await Category.updateOne(
       req.params,         {
             $set: req.body
         }
   );    
   res.send(data)

    
 })





//blog api start



//post api

// app.post("/add-blog", upload, async (req, res) => {
//     const {title, slug, category, date } = req.body;
//     const newBlog = new Blog({
//         title, slug, category, date, createdAt: Date.now()
//     });

//     if (req.file) {
//         newBlog.image = req.file.filename;
//     }
    
//     let result = await newBlog.save()
//     res.send(result)
// })

app.post("/add-blog", upload, async (req, res) => {
    try {
      const { title, slug, category, date } = req.body;
      const newBlog = new Blog({
        title,
        slug,
        category,
        date,
        createdAt: Date.now(),
      });
  
      if (req.file) {
        newBlog.image = req.file.filename;
      }
  
      let result = await newBlog.save();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while saving the blog post.");
    }
  });

//get api

app.get("/get-blog", async (req, res) => {

    let bloglist = await Blog.find().sort({createdAt: -1})
    res.send(bloglist)
})

//delete api

app.delete("/delete-blog/:_id", async (req, res) => {

    let bloglist = await Blog.deleteOne(req.params)
    res.send(bloglist)

})

app.listen(5000);