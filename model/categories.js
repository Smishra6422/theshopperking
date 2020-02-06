const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categoriesSchema = new Schema({

    categoriesDomain : {
        type: String,
        required : true,
        trim : true,
        lowercase : true
    },
    imageUrl : {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    categoriesName : {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    offPercent : {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    originalName : {
        type: String,
        required: true,
        trim: true

    }
    
})


module.exports = mongoose.model('categories', categoriesSchema)