//import passportMiddle from "../configs/passport.js";
import passport from "passport";

const loginController = {
    getLogin: function(req, res){
        res.render('login')
    },

    userAuthenticate: function(req, res, next){
        console.log("passport authenticating")
        passport.authenticate("local", /*function(err, user, info)*/ {
            // console.log("in authentication");
            // console.log(err);
            // console.log(user);
            // console.log(info);
            successRedirect: "/home",
            failureRedirect: "/settings",
            failureFlash: true
        })(req, res, next);
    }
};

export default loginController;