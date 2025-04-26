const mongoose = require('mongoose')

async function connectToDatabase(){
   await mongoose.connect('mongodb+srv://MernProject:MernProject@cluster0.iamk2ku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("Database connected Successfully!")
}

module.exports = connectToDatabase