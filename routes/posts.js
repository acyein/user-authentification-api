const router = require('express').Router();

const postsController = require('../controllers/posts');

// api/posts...
router.get('/', postsController.getPosts);

module.exports = router;