const express = require('express')
const passport = require('passport')
const Authenticate = require('../config/auth')

const route = express.Router()

// const product = require('../model/product')

const adminController = require('../controller/admin')

route.get('/addProduct', Authenticate.isAdmin, adminController.addProduct )

route.post('/addProduct', Authenticate.isAdmin, adminController.postAddProduct )

route.get('/addCategories', Authenticate.isAdmin, adminController.addCategories )

route.post('/addCategories', Authenticate.isAdmin, adminController.postAddCategories )

route.get('/adminCategories', Authenticate.isAdmin, adminController.getAdminCategories )

route.get('/adminProduct', Authenticate.isAdmin, adminController.getAdminProduct )

route.get('/editProduct', Authenticate.isAdmin, adminController.editProduct )

route.post('/editProduct', Authenticate.isAdmin, adminController.postEditProduct )

route.post('/deleteProduct', Authenticate.isAdmin, adminController.postDeleteProduct )

route.get('/adminLogin', adminController.adminLogin )

route.get('/addOfferImages', Authenticate.isAdmin, adminController.addOfferImages )

route.post('/addOfferImages', Authenticate.isAdmin, adminController.postAddOfferImages )

route.get('/getOfferImages', Authenticate.isAdmin, adminController.getOfferImages )

route.get('/editOfferImage', Authenticate.isAdmin, adminController.editOfferImage)

route.post('/editOfferImage', Authenticate.isAdmin, adminController.postEditOfferImage)

route.post('/deleteOfferImage', Authenticate.isAdmin, adminController.postDeleteOfferImage)

route.get('/addKeyword', Authenticate.isAdmin, adminController.addKeyword)

route.post('/addKeyword', Authenticate.isAdmin, adminController.postAddKeyword)


route.post('/adminLogin', passport.authenticate('local', { failureRedirect: '/adminLogin' }),
function(req, res) {
    // console.log(req.user)
    req.session.isAdmin = 'theShopperKing'
    res.redirect('/');
})

// route.post('/adminLogin', adminController.postAdminLogin)

route.get('/adminLogout', adminController.adminLogout)



module.exports = route