const express = require('express');
const {profPage} = require('../controller/profPageController');
const router = express.Router();
router.get('/profPage/:profID', profPage);
module.exports = router;