const express = require('express');
const {profList} = require('../controllers/profListController');
const router = express.Router();
router.get('/profList', profList);
module.exports = router;
