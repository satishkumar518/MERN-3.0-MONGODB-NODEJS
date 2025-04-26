const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
app.use(express.json())

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
app.post("/blog",async(req,res)=>{
    const {title,subtitle,description,image} = req.body
    await Blog.create({
         Title : title,
         SubTitle: subtitle,
         Description: description,
         Image: image
    })
    
    res.status(200).json({
        message: "Blog Api Hit Successfully"
    })
}) 



// set port number 
const port = 3000
app.listen(port, ()=>{
    console.log("project has start on localhost:"+port)
})