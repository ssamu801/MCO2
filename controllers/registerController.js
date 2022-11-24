import db from '../models/db.js';
import User from '../models/userSchema.js';
import bcrypt from "bcrypt";

import mongoose from "mongoose";

const registerController = {
    getRegister: function(req, res){
        res.render('register')
    },

    newUser: async function(req, res){

        //const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User( {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }); 

        // bcrypt.genSalt(10, (error, saltpass) =>{
        //     bcrypt.hash(password, saltpass, (error, hashedPassword) =>{
        //         if(error){
        //             throw error;
        //         }else{
        //             newUser.password = hash;
        //             newUser.save().then(user =>{
        //                 console.log("User Registered");
        //                 req.flash("success_msg", "User Registered");
        //                 res.redirect('/login');
        //             }).catch(err => {
        //                 console.log(err)
        //             })
        //         }
        //     })
        // })

        newUser.save( function(err){
            if(err){
                console.log(err)
            }else{
                console.log("User Registered");
                req.flash("success_msg", "User Registered");
                res.redirect('/login');
            }
        })

        
        // db.createUser(User, newUser, function(result){
        //     if(result){

        //         newUser.save( function(err) {
        //             if(err){
        //                 console.log(err);
        //             }
        //             else{
        //                 console.log("User Registered");
        //                 req.flash("success_msg", "User Registered");
        //                 res.redirect('/login');
        //             }
        //         })
                
        //     }
        // })
    },

    findUser: function(req, res){
        db.findOne(User, {email: req.query.email}, {}, (result) =>{
            if(result){
                res.send(true);
            }
            else{
                res.send(false);
            }
        })
    }
}

export default registerController;