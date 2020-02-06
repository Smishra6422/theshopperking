exports.isAdmin = (req, res, next) => {

        if(req.isAuthenticated()) {
            return next()
            
        }
        
        res.redirect('/adminLogin')
    }
