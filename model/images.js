const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imageSchema = new Schema({
    image : {
        type : String,
        required : true,
        trim : true
    }
})

module.exports = mongoose.model('image', imageSchema)