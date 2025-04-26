const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    Title:{
        type: String
         
    },
    SubTitle:{
        type: String
    }, 
    Description:{
        type: Text
    },
    Image:{
        type: String
    }

})

const Blog = mongoose.model('Blog',blogSchema)
module.exports = Blog