const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');

//Require these for file uploads!
const multer = require('multer');
const upload = multer()

/*---------- Public Routes ----------*/
// /api/posts 
router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index)

module.exports = router;