const express = require('express');
const profReview = require('../controllers/profReviewsController');
const router = express.Router();
router.get('/profReviews/:profID/:course', profReview.load);
router.post('/updateLikes', profReview.updateLikes);
module.exports = router;