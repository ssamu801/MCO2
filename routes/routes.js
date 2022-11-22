import { Router } from "express";

import controller from "../controllers/controller.js";
import profListController from "../controllers/profListController.js";
import profPage from "../controllers/profPageController.js";
import profReview from "../controllers/profReviewsController.js";

const router = Router();

//from controller.js
router.get('/', controller.getIndex);

//from profListController.js
router.get('/profList', profListController.profList);

//from profPageController.js
router.get('/profPage/:profID', profPage.load);
router.post('/updateLikes', profPage.updateLikes);
router.post('/saveReview', profPage.saveReview);

//from profReviewsController
router.get('/profReviews/:profID/:course', profReview.load);
router.post('/updateLikes', profReview.updateLikes);

export default router;