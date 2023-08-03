const express = require('express');
const router = express.Router();
const postCtrl = require('../../controllers/posts');

//Require these for file uploads!
const multer = require('multer');
const upload = multer()

/*----------Public Routes----------*/
//api/posts
router.post('/', postCtrl.create);
router.get('/', postCtrl.index);

module.exports = router;