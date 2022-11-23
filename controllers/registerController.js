import db from '../models/db.js';
import user from '../models/userSchema.js';

const registerController = {
    getRegister: function(req, res){
        res.render('register')
    },

    newUser: async function(req, res){

        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        } 

        
        db.createUser(user, newUser, function(result){
            if(result){
                res.redirect('/login');
            }
        })
    }
}

export default registerController;