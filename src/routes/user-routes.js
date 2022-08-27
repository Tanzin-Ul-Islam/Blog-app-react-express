const UserController = require('../controller/user-controller');
const { AuthGuard } = require('../middleware/auth-guard');
const MulterHelper = require('../helper/multer-helper');
const router = require('express').Router();

let uploadFiles = MulterHelper('user').fields([{ name: 'image', maxCount: 3 }]);

router.get('/profile', AuthGuard, UserController.getUserData);
router.put('/profile', AuthGuard, uploadFiles, UserController.updateProfile);



module.exports = router;