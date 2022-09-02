const PostContrller = require('../controller/post-controller');
const posts = require('../model/posts');
const users = require('../model/users');
const MulterHelper = require('../helper/multer-helper');
const { AuthGuard } = require('../middleware/auth-guard');
const router = require('express').Router();
let uploadFiles = MulterHelper('blog').fields([{ name: 'image', maxCount: 3 }]);

router.get('/', PostContrller.getAllPost);
router.get('/users-blog', AuthGuard, PostContrller.getByAuthorId);
router.get('/:id', AuthGuard, PostContrller.getById);
router.post('/', AuthGuard, uploadFiles, PostContrller.createPost);
router.put('/:id', AuthGuard, uploadFiles, PostContrller.updatePost);
router.delete('/:id', AuthGuard, PostContrller.deletePost);

module.exports = router;