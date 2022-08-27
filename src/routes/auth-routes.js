const AuthController = require('../controller/auth-controller');
const router = require('express').Router();

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signin);

module.exports = router;