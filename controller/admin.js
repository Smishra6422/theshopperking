const Product = require('../model/product')
const Categories = require('../model/categories')
const adminLogin = require('../model/login')
const Image = require('../model/images')
const Keyword = require('../model/keyword')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const sanitizeHTML = require('sanitize-html')
const path = require('path')

const ITEMS_PER_PAGE = 10;

const deleteOfferImage = (fileName) => {
    const filePath = path.join('public', 'assets', fileName)
    fs.unlink(filePath, (err) => {
        
    })
}

exports.addProduct = async (req, res, next) => {
    const suggestionLists = await Keyword.find()
    const totalItemCount = []
    
    res.render('addProduct',{
        suggestionLists,
        isAdmin : req.session.isAdmin,
        totalItemCount,
        title : 'Add Product'
    })
}

exports.postAddProduct = (req, res, next) => {

    const { productUrl, 
            categoriesDomain, 
            productDomain, 
            trending, 
            imageUrl,
            imageUrl2,
            imageUrl3, 
            productType,
            categoriesName,
            originalName, 
            description, 
            currentPrice, 
            originalPrice, 
            offPercent, 
            brandName, 
            searchKeywordFirst, 
            searchKeywordSecond, 
            searchKeywordThird, 
            searchKeywordFour,
            fixProductImage 
        } = req.body

    const product = new Product({
        productUrl : sanitizeHTML(productUrl, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        categoriesDomain : sanitizeHTML(categoriesDomain, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        productDomain : sanitizeHTML(productDomain, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        trending : sanitizeHTML(trending, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        imageUrl : sanitizeHTML(imageUrl, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        imageUrl2 : sanitizeHTML(imageUrl2, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        imageUrl3 : sanitizeHTML(imageUrl3, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        productType : sanitizeHTML(productType, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        categoriesName : sanitizeHTML(categoriesName, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        originalName : sanitizeHTML(originalName, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        description : sanitizeHTML(description, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        currentPrice : sanitizeHTML(currentPrice, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        originalPrice : sanitizeHTML(originalPrice, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        offPercent : sanitizeHTML(offPercent, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        brandName : sanitizeHTML(brandName, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        searchKeywordFirst : sanitizeHTML(searchKeywordFirst, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        searchKeywordSecond : sanitizeHTML(searchKeywordSecond, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        searchKeywordThird : sanitizeHTML(searchKeywordThird, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        searchKeywordFour : sanitizeHTML(searchKeywordFour, {
                            allowedTags: [],
                            allowedAttributes: {}
                            }),
        fixProductImage : sanitizeHTML(fixProductImage, {
                            allowedTags: [],
                            allowedAttributes: {}
                            })
        
    })

    product.save()
            .then(result => {
                res.redirect('/')
            })
            .catch(err => console.log(err))

}

exports.addCategories = async (req, res, next) => {
    const suggestionLists = await Keyword.find()
    const totalItemCount = []

    res.render('addCategories',{
        suggestionLists,
        isAdmin : req.session.isAdmin,
        totalItemCount,
        title : 'Add Categories'
    })
}

exports.postAddCategories = (req, res, next) => {
    const { categoriesDomain, imageUrl, categoriesName, offPercent, originalName, fixProductImage } = req.body

    const categories = new Categories({
        categoriesDomain : sanitizeHTML(categoriesDomain, {
                            allowedTags: [],
                            allowedAttributes: {}
                            }),
        imageUrl : sanitizeHTML(imageUrl, {
                    allowedTags: [],
                    allowedAttributes: {}
                    }),
        categoriesName : sanitizeHTML(categoriesName, {
                            allowedTags: [],
                            allowedAttributes: {}
                            }),
        offPercent : sanitizeHTML(offPercent, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        originalName : sanitizeHTML(originalName, {
                        allowedTags: [],
                        allowedAttributes: {}
                        }),
        fixProductImage : sanitizeHTML(fixProductImage, {
                        allowedTags: [],
                        allowedAttributes: {}
                        })
    })

    categories.save()
              .then(result => {
                  
                  res.redirect('/')
              })
              .catch(err => console.log(err))
}


exports.getAdminCategories = async (req, res, next) => {

    let page = +req.query.page || 1;
    const URI = "adminCategories";
    const itemSearch = req.query.categories || req.query.itemSearch

    const suggestionLists = await Keyword.find()

    const totalItems = await Categories.find({ categoriesDomain : itemSearch }).countDocuments()

    const totalProducts = await Categories.find({ categoriesDomain: itemSearch })
                                       .skip((page - 1) * ITEMS_PER_PAGE)
                                       .limit(ITEMS_PER_PAGE)
    
    res.render('getAdminCategories', {
                categories : totalProducts,
                hasPreviousPage : page > 1,
                currentPage : page,
                prevPage : page - 1,
                nextPage : page + 1,
                hasNextPage : ( page * ITEMS_PER_PAGE ) < totalItems,
                URI : URI,
                itemSearch : itemSearch,
                isAdmin : req.session.isAdmin,
                totalItems : totalItems,
                totalItemCount : ( totalItems - ((page - 1) * ITEMS_PER_PAGE) ),
                suggestionLists : suggestionLists,
                title : 'Admin Categories'
            })

        
    
}

exports.getAdminProduct = async (req, res, next) => {

    let page = +req.query.page || 1;
    const URI = "adminProduct";
    const itemSearch = req.query.product || req.query.itemSearch

    const suggestionLists = await Keyword.find()

    const totalItems = await Product.find( { $or: [ { categoriesName : itemSearch }, { productDomain : itemSearch } ] }).countDocuments()

    const totalProducts = await Product.find( { $or: [ { categoriesName : itemSearch }, { productDomain : itemSearch } ] })
                                       .skip((page - 1) * ITEMS_PER_PAGE)
                                       .limit(ITEMS_PER_PAGE)
    
    res.render('getAdminProduct', {
                products : totalProducts,
                hasPreviousPage : page > 1,
                currentPage : page,
                prevPage : page - 1,
                nextPage : page + 1,
                hasNextPage : ( page * ITEMS_PER_PAGE ) < totalItems,
                URI : URI,
                itemSearch : itemSearch,
                isAdmin : req.session.isAdmin,
                totalItems : totalItems,
                totalItemCount : ( totalItems - ((page - 1) * ITEMS_PER_PAGE) ),
                suggestionLists : suggestionLists,
                title : 'Admin Product'
            })

    
}

exports.editProduct = async (req, res, next) => {
    const suggestionLists = await Keyword.find()
    const totalItemCount = []
    
    Product.findById( req.query.productId )
           .then(product => {
               
               res.render('editProduct', {
                   product : product,
                   suggestionLists,
                   isAdmin : req.session.isAdmin,
                   totalItemCount,
                   title : 'Edit Product'
               })
           })
              
    
}

exports.postEditProduct = (req, res, next) => {
    const { productUrl, 
        categoriesDomain, 
        productDomain, 
        trending, 
        imageUrl,
        imageUrl2,
        imageUrl3,
        productType, 
        categoriesName,
        originalName, 
        description, 
        currentPrice, 
        originalPrice, 
        offPercent, 
        brandName, 
        searchKeywordFirst, 
        searchKeywordSecond, 
        searchKeywordThird, 
        searchKeywordFour,
        fixProductImage, 
        productId
    } = req.body

    Product.findById(productId)
           .then(product => {
               product.productUrl =  sanitizeHTML(productUrl, {
                                     allowedTags: [],
                                     allowedAttributes: {}
                                     }),
               product.categoriesDomain = sanitizeHTML(categoriesDomain, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.productDomain = sanitizeHTML(productDomain, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.trending = sanitizeHTML(trending, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.imageUrl = sanitizeHTML(imageUrl, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        })
                                        ,
               product.imageUrl2 = sanitizeHTML(imageUrl2, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
                product.imageUrl3 = sanitizeHTML(imageUrl3, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.productType = sanitizeHTML(productType, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.categoriesName = sanitizeHTML(categoriesName, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.originalName = sanitizeHTML(originalName, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.description = sanitizeHTML(description, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.currentPrice = sanitizeHTML(currentPrice, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.originalPrice = sanitizeHTML(originalPrice, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.offPercent = sanitizeHTML(offPercent, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.brandName = sanitizeHTML(brandName, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.searchKeywordFirst = sanitizeHTML(searchKeywordFirst, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.searchKeywordSecond = sanitizeHTML(searchKeywordSecond, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.searchKeywordThird = sanitizeHTML(searchKeywordThird, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.searchKeywordFour = sanitizeHTML(searchKeywordFour, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        }),
               product.fixProductImage = sanitizeHTML(fixProductImage, {
                                        allowedTags: [],
                                        allowedAttributes: {}
                                        })
            
               return product.save()
           })
           .then(result => {
               
               res.redirect('/')
           })
              
    
}

exports.postDeleteProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.body.productId)
           .then(product => {
               res.redirect('/')
           })
              
    
}

exports.addOfferImages = async (req, res, next) => {
    const suggestionLists = await Keyword.find()
    const totalItemCount = []
    
    res.render('addOfferImages',{
        suggestionLists,
        isAdmin : req.session.isAdmin,
        totalItemCount,
        title : 'Add Offer Image'
    })
}

exports.postAddOfferImages = async (req, res, next) => {
    
    
    if(!req.file) {
        res.redirect('/')
    } else {
        const imagePath = req.file.filename
        const addImage = new Image({
            image : imagePath
        }) 
        const saveImage = await addImage.save()
        res.redirect('/')
    }
    
}

exports.getOfferImages = async (req, res, next) => {
    const suggestionLists = await Keyword.find()
    const totalItemCount = []
   
    
    const images = await Image.find()
    res.render('getOfferImages', {
        images,
        suggestionLists,
        isAdmin : req.session.isAdmin,
        totalItemCount,
        title : 'Offer Images'
    })
}

exports.editOfferImage = async (req, res, next) => {
    const suggestionLists = await Keyword.find()
    const totalItemCount = []
    
    const productId = req.query.productId
    res.render('editOfferImage', {
            productId,
            suggestionLists,
            isAdmin : req.session.isAdmin,
            totalItemCount,
            title : 'Edit Offer Image'
        
    })
}

exports.postEditOfferImage = async (req, res, next) => {
    const productId = req.body.productId
    const image = await Image.findById(productId)
    if(!req.file) {
        res.redirect('/')
    } else {
        deleteOfferImage(image.image)
        const imagePath = req.file.filename
        image.image = imagePath 
        const saveImage = await image.save()
        res.redirect('/')
    }
}

exports.postDeleteOfferImage = async (req, res, next) => {
    const productId = req.body.productId
    const image = await Image.findByIdAndDelete(productId)
    deleteOfferImage(image.image)
    res.redirect('/')
    
}

exports.addKeyword = (req, res, next) => {
    res.render('addKeyword',{
        title : 'Add Keyword'
    })
}

exports.postAddKeyword = async (req, res, next) => {
    const keyword = req.body.keyword
    const addKeyword = new Keyword({
        keyword : sanitizeHTML(keyword, {
            allowedTags: [],
            allowedAttributes: {}
            })
    })
    const savedKeyword = await addKeyword.save() 
    res.redirect('/')
    
}


exports.adminLogin = async (req, res, next) => {
    const suggestionLists = await Keyword.find()
    const totalItemCount = []
    res.render('adminLogin',{
        suggestionLists,
        isAdmin : req.session.isAdmin,
        totalItemCount,
        title : 'Admin Login'
    })
}


















// exports.postAdminLogin = (req, res, next) => {
//     const { email, password } = req.body

//     const newAdmin = new adminLogin({
//         email,
//         password
//     })
    
//     bcrypt.genSalt(10, (err, salt) => 
//         bcrypt.hash(newAdmin.password, salt, (err, hashPassword) => {
//             newAdmin.password = hashPassword
//             newAdmin.save()
//                     .then(result => {
//                         res.redirect("/")
//                     })
//         })
//     )

// }



exports.adminLogout = (req, res, next) => {
    req.logout();
    req.session.isAdmin = null
    res.redirect('/')
}