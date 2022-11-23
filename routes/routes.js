import { Router } from "express";

import controller from "../controllers/controller.js";
import profList from "../controllers/profListController.js";
import profPage from "../controllers/profPageController.js";
import profReview from "../controllers/profReviewsController.js";
import home from "../controllers/homeController.js";
import registerCont from "../controllers/registerController.js";
import loginCont from "../controllers/loginController.js";


const router = Router();

//from controller.js
router.get('/register', controller.getIndex);

//from registerController.js
router.get('/register', registerCont.getRegister);

//from loginController.js
router.get('/login', loginCont.getLogin);

//from homeController.js
router.get('/', home.collegeList);

//from profListController.js
router.get('/profList/:collegeCode', profList.profList);

//from profPageController.js
router.get('/profPage/:profID', profPage.load);
router.post('/updateLikes', profPage.updateLikes);
router.post('/saveReview', profPage.saveReview);

//from profReviewsController
router.get('/profReviews/:profID/:course', profReview.load);
router.post('/updateLikes', profReview.updateLikes);

export default router;