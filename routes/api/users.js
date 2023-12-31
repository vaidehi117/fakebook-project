const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

// require these for file uploads!
const multer = require('multer');
const upload = multer()

/*---------- Public Routes ----------*/
//Http request
//POST /api/users/signup

//We get 'photo' in upload single from the key name
//On the formdata that contains the file
//In this case, this line of code in signupPage
//formData.append('photo', selectedFile);
router.post("/signup", upload.single('photo'), usersCtrl.signup);
router.post("/login", usersCtrl.login);

//This is params for the api request coming from the react side
router.get('/:username', usersCtrl.profile);


module.exports = router;
