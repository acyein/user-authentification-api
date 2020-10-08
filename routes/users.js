const router = require('express').Router();

const verify = require('../middleware/verifyToken');

const usersController = require('../controllers/users');

// api/...
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

router.get('/users/my-profile', verify, usersController.getMyProfile);
router.get('/users/:id', verify, usersController.getOthersProfile);

module.exports = router;