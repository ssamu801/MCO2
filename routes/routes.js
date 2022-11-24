import { Router } from "express";
//import flash from "connect-flash";

import authenticateUser from "../configs/authenticateUser.js";

import controller from "../controllers/controller.js";
import profList from "../controllers/profListController.js";
import profPage from "../controllers/profPageController.js";
import profReview from "../controllers/profReviewsController.js";

import home from "../controllers/homeController.js";
import registerCont from "../controllers/registerController.js";
import loginCont from "../controllers/loginController.js";

import College from "../models/collegesSchema.js";


const router = Router();

//from controller.js
router.get('/', controller.getIndex);

//from registerController.js
router.get('/register', registerCont.getRegister);
router.post('/register', registerCont.newUser);
router.get('/register', registerCont.findUser);

//from loginController.js
router.get('/login', loginCont.getLogin);
router.post('/login', loginCont.userAuthenticate);

//from homeController.js
//router.get('/home', authenticateUser.ensureAuthentication, home.collegeList);
router.get('/home', function(req, res){
    res.render('home');
})

//from profListController.js
router.get('/profList/:collegeCode', profList.profList);

//from profPageController.js
router.get('/profPage/:profID', profPage.load);
router.post('/updateLikes', profPage.updateLikes);
router.post('/saveReview', profPage.saveReview);

//from profReviewsController
router.get('/profReviews/:profID/:course', profReview.load);
router.post('/updateLikes', profReview.updateLikes);

router.get('/logout', function(req, res){
    req.logout();
    req.flash("success_msg", "Successfully logged out");
    res.redirect('/login')
})

//Settings
router.get('/settings', function(req, res){
    res.render('settings')
})

export default router;