const express = require('express');
const profPage = require('../controllers/profPageController');
const router = express.Router();
router.get('/profPage/:profID', profPage.load);
router.post('/updateLikes', profPage.updateLikes);
router.post('/saveReview', profPage.saveReview);
module.exports = router;
