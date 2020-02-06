const mongoose = require('mongoose')

const Schema = mongoose.Schema

const keywordSchema = new Schema({
    keyword : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    }
})

module.exports = mongoose.model('keyword', keywordSchema)