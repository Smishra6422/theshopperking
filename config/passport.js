const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const adminLogin = require("../model/login");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      adminLogin
        .findOne({ email: email })
        .then((admin) => {
          //   console.log(admin)
          if (!admin) {
            return done(null, false);
          }

          bcrypt.compare(password, admin.password, (err, isMatch) => {
            // if(err) {
            //     throw err
            // }

            if (isMatch) {
              return done(null, admin);
            } else {
              return done(null, false);
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((admin, done) => {
    done(null, admin.id);
  });
  passport.deserializeUser((id, done) => {
    adminLogin.findById(id, (err, admin) => {
      done(err, admin);
    });
  });
};
