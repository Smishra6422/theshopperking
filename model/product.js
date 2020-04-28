const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    productUrl : {
        type: String,
        required : true,
        trim : true,
        lowercase : true
    },
    categoriesDomain : {
        type: String,
        required : true,
        trim : true,
        lowercase : true
    },
    productDomain : {
        type: String,
        trim : true,
        lowercase : true
    },
    trending : {
        type: String,
        trim : true,
        lowercase : true
    },
    imageUrl : {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    imageUrl2 : {
        type: String,
        trim: true,
        lowercase: true

    },
    imageUrl3 : {
        type: String,
        trim: true,
        lowercase: true

    },
    productType : {
        type: String,
        trim: true,
        lowercase: true

    },
    categoriesName : {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    originalName : {
        type: String,
        required: true,
        trim: true,

    },
    description : {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    currentPrice : {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    originalPrice : {
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
    brandName : {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    searchKeywordFirst : {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    searchKeywordSecond : {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    searchKeywordThird : {
        type: String,
        trim: true,
        lowercase: true

    },
    searchKeywordFour : {
        type: String,
        trim: true,
        lowercase: true

    },
    fixProductImage : {
        type: String,
        trim: true

    }
    
})


module.exports = mongoose.model('product', productSchema)