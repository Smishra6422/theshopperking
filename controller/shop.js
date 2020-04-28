const Product = require('../model/product')
const Categories = require('../model/categories')
const Keyword = require('../model/keyword')
const Images = require('../model/images')
const Offer = require('../model/offerTermCondition')

const ITEMS_PER_PAGE = 10;

exports.indexPage = async (req, res, next) => {
    let page = +req.query.page || 1;
    const URI = "";
    const itemSearch = req.query.itemSearch || 'yes'

    const suggestionLists = await Keyword.find()

    const offerImage = await Images.find()

    const totalItems = await Product.find({trending: itemSearch }).countDocuments()

    const totalProducts = await Product.find({ trending: itemSearch })
                                       .skip((page - 1) * ITEMS_PER_PAGE)
                                       .limit(ITEMS_PER_PAGE)
    
    res.render('index', {
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
                offerImage : offerImage,
                title : 'Home Page'
            })
            
}

exports.getCategoriesPage = async (req, res, next) => {

    let page = +req.query.page || 1;
    const URI = "getCategories";
    const itemSearch = req.query.categories || req.query.itemSearch

    const suggestionLists = await Keyword.find()

    const totalItems = await Categories.find({ categoriesDomain: itemSearch }).countDocuments()

    const totalProducts = await Categories.find({ categoriesDomain: itemSearch })
                                       .skip((page - 1) * ITEMS_PER_PAGE)
                                       .limit(ITEMS_PER_PAGE)
  
           
           res.render('getUserCategoriesList', {
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
            title : 'Categories'
        })
}

exports.getUserProductList =  async (req, res, next) => {

    let page = +req.query.page || 1;
    const URI = "getproduct";
    const itemSearch = req.query.product || req.query.itemSearch

    const suggestionLists = await Keyword.find()

    const totalItems = await Product.find({ $or: [ { productDomain : itemSearch }, { categoriesName : itemSearch } ] }).countDocuments()

    const totalProducts = await Product.find({ $or: [ { productDomain : itemSearch }, { categoriesName : itemSearch } ] })
                                       .skip((page - 1) * ITEMS_PER_PAGE)
                                       .limit(ITEMS_PER_PAGE)
  
           
           res.render('getUserProductList', {
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
            title : 'Products'
        })
}

exports.searchProductList =  async (req, res, next) => {

    let page = +req.query.page || 1;
    const URI = "searchProduct";
    var itemSearch = req.query.searchItem || req.query.itemSearch
    var itemSearch1 = itemSearch.split(" ")
  

    const suggestionLists = await Keyword.find()

    var totalItems
    var totalProducts
    if(itemSearch1.length==1) {
         totalItems = await Product.find({ $or: [ { categoriesDomain : { $regex: "^"+itemSearch1[0], $options: 'i' }  },
                                                       { productDomain : { $regex: itemSearch1[0], $options: 'i' } },
                                                       { categoriesName : { $regex: itemSearch1[0], $options: 'i' } },
                                                       { originalName : { $regex: "^"+itemSearch1[0], $options: 'i' } },
                                                       { brandName : { $regex: "^"+itemSearch1[0], $options: 'i' } } ] }).countDocuments()
    
         totalProducts = await Product.find({ $or: [ { categoriesDomain : { $regex: "^"+itemSearch1[0], $options: 'i' }  },
                                                          { productDomain : { $regex: itemSearch1[0], $options: 'i' } },
                                                          { categoriesName : { $regex: itemSearch1[0], $options: 'i' } },
                                                          { originalName : { $regex: "^"+itemSearch1[0], $options: 'i' } },
                                                          { brandName : { $regex: "^"+itemSearch1[0], $options: 'i' } } ] })
                                                          .skip((page - 1) * ITEMS_PER_PAGE)
                                                          .limit(ITEMS_PER_PAGE)
     if( totalItems <= 0 ) {
        totalItems = await Product.find({ $or: [ { searchKeywordFirst : { $regex: itemSearch, $options: 'i' }  },
                                                       { searchKeywordSecond : { $regex: itemSearch, $options: 'i' } },
                                                       { searchKeywordThird : { $regex: itemSearch, $options: 'i' } },
                                                       { searchKeywordFour : { $regex: itemSearch, $options: 'i' } } ] }).countDocuments()
    
         totalProducts = await Product.find({ $or: [ { searchKeywordFirst : { $regex: itemSearch, $options: 'i' }  },
                                                        { searchKeywordSecond : { $regex: itemSearch, $options: 'i' } },
                                                        { searchKeywordThird : { $regex: itemSearch, $options: 'i' } },
                                                        { searchKeywordFour : { $regex: itemSearch, $options: 'i' } } ] })
                                                          .skip((page - 1) * ITEMS_PER_PAGE)
                                                          .limit(ITEMS_PER_PAGE)
        }

    } else {
        totalItems = await Product.find({ $or: [ { searchKeywordFirst : { $regex: itemSearch, $options: 'i' }  },
                                                       { searchKeywordSecond : { $regex: itemSearch, $options: 'i' } },
                                                       { searchKeywordThird : { $regex: itemSearch, $options: 'i' } },
                                                       { searchKeywordFour : { $regex: itemSearch, $options: 'i' } } ] }).countDocuments()
    
         totalProducts = await Product.find({ $or: [ { searchKeywordFirst : { $regex: itemSearch, $options: 'i' }  },
                                                        { searchKeywordSecond : { $regex: itemSearch, $options: 'i' } },
                                                        { searchKeywordThird : { $regex: itemSearch, $options: 'i' } },
                                                        { searchKeywordFour : { $regex: itemSearch, $options: 'i' } } ] })
                                                          .skip((page - 1) * ITEMS_PER_PAGE)
                                                          .limit(ITEMS_PER_PAGE)

    }
    
  
        
           res.render('searchProductList', {
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
            title : 'Search Result'
        })
}

exports.noPage = async (req, res, next) => {
    

    const suggestionLists = await Keyword.find()

    

    const totalItemCount = []

    const totalProducts = []
    
    res.render('404page', {
                products : totalProducts,
                isAdmin : req.session.isAdmin,
                totalItemCount : totalItemCount,
                suggestionLists : suggestionLists,
                title : '404 Page'
                
            })
            
}

exports.offerTermCondition = async (req,res,next) => {
    const suggestionLists = await Keyword.find()
    const offer = await Offer.find()
    const totalItemCount = []

    res.render('offerTermCondition', {
        suggestionLists,
        totalItemCount,
        offer,
        isAdmin : req.session.isAdmin,
        title : 'Offer Term Condition'
    })
}

exports.termCondition = async (req,res,next) => {
    const suggestionLists = await Keyword.find()

    const totalItemCount = []

    res.render('termCondition', {
        suggestionLists,
        totalItemCount,
        isAdmin : req.session.isAdmin,
        title : 'Term Condition'
    })
}