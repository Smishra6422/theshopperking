const express = require('express')

const route = express.Router()

const shopController = require('../controller/shop')

route.get('/', shopController.indexPage)

route.get('/getCategories', shopController.getCategoriesPage)

route.get('/getproduct', shopController.getUserProductList)

route.get('/searchProduct', shopController.searchProductList)

route.get('/offerTermCondition', shopController.offerTermCondition)

route.get('/termCondition', shopController.termCondition)



module.exports = route