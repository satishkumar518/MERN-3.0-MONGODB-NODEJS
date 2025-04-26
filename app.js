const express = require('express')
const connectToDatabase = require('./database')
const app = express()

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



// set port number 
const port = 3000
app.listen(port, ()=>{
    console.log("project has start on localhost:"+port)
})