const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel') 
const app = express()
app.use(express.json())

// access storage file 
app.use(express.static('./storage'))

// file system
const fs = require('fs')

// handle image and store 
const {multer, storage} =require('./middleware/multerConfig')
const upload = multer({storage : storage})

// database connection here 
connectToDatabase()

// create Apis 
// home page api
app.get("/", (req,res)=>{
    res.json({
        message: "Home page is open"
    })
})

// about page api
app.get("/about",(re,res)=>{
    res.json({
        message: "About Page is open"
    })
})

// create post api
app.post("/blog",upload.single('image'),async(req,res)=>{
    const {title,subtitle,description} = req.body
    const filename = req.file.filename
    if(!title || !subtitle || !description){
        return res.status(404).json({
           message : "Please Provide title,subtitle,description"
        })
    }
    await Blog.create({
         Title : title,
         SubTitle: subtitle,
         Description: description,
         Image: filename
    })
    
    res.status(200).json({
        message: "Blog Created Successfully"
    })
}) 

// blogs details API
app.get('/blog',async(req,res)=>{
    const blogs =await Blog.find()
    res.json({
        message: "Blogs Details",
        data : blogs

    })
}) 

// read single blog API
app.get('/blog/:id',async(req,res)=>{
    const id = req.params.id
    const singleBlog =await Blog.findById(id)
    if(!singleBlog){
        return res.status(400).json({
            message : "No Data Found"
        })
    }
    res.json({
        message: "single blog details",
        data : singleBlog
    })
})

// Delete Blog API
app.delete('/blog/:id',async (req,res)=>{
    const id =req.params.id
    const data = await Blog.findById(id)
    const filename = data.Image
    fs.unlink('storage/'+filename,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("File Deleted Successfully")
        }
    })
    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message : "Blog Deteted Successfully"
    })
})

// edit blog api 
// app.patch('/post/:id',(req,res)=>{
//     const id = req.params.id
//     res.json({
//         message : "Blog Updated Successfully"
//     })
// })




// set port number 
const port = 3000
app.listen(port, ()=>{
    console.log("project has start on localhost:"+port)
})