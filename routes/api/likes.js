const express = require('express');
const router = express.Router();
const likesCtrl = require('../../controllers/likes')

router.post('/posts/:id/likes', likesCtrl.create)
router.delete('/likes/:id', likesCtrl.deleteLike)

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const commentsCtrl = require('../controllers/comments');

// router.post('/posts/:id/comments', commentsCtrl.create);

// module.exports = router;