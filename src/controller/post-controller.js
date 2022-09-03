const posts = require('../model/posts');
const PostModule = require('../module/post-module')
class Post {
    getAllPost = async (req, res) => {
        let category = req.query && req.query.category != 'null' ? req.query.category : null;
        const result = await PostModule.getAll(category);
        if (result) {
            res.status(200).send({ msg: "Blog fetched successfully!", data: result });
        } else {
            res.status(400).send({ msg: "Could not fetch data!" });
        }
    }
    getById = async (req, res) => {
        let id = req.params.id;
        const result = await PostModule.getById(id);
        if (result) {
            res.status(200).send({ msg: "Blog fetched successfully!", data: result });
        } else {
            res.status(400).send({ msg: "Could not fetch data!" });
        }
    }
    getByAuthorId = async (req, res) => {
        let userCredential = res.locals.userInfo;
        let authorId = userCredential.id;
        //console.log(authorId);
        const result = await PostModule.getByAuthorId(authorId);
        if (result) {
            res.status(200).send({ msg: "Blog fetched successfully!", data: result });
        } else {
            res.status(400).send({ msg: "Could not fetch data!" });
        }
    }
    createPost = async (req, res) => {
        let title = req.body.title;
        let titleCount = await posts.countDocuments({ title });
        if (titleCount == 0) {
            let image = null;
            if (Object.values(req.files).length > 0) {
                image = req.files.image[0].filename;
            } else {
                image = req.body.image
            }
            req.body.image = image;
            let userCredential = res.locals.userInfo;
            req.body.authorId = userCredential.id;
            const result = await PostModule.createPost(req.body);
            if (result) {
                res.status(201).send({ msg: "Blog created successfully.", data: result });
            } else {
                res.status(400).send({ msg: "Something went wrong! Could not create blog. Please try again." });
            }
        } else {
            res.status(400).send({ msg: "Title can not be duplicate." });
        }

    }

    updatePost = async (req, res) => {
        let image = null;
        if (Object.values(req.files).length > 0) {
            image = req.files.image[0].filename;
        } else {
            image = req.body.image
        }
        req.body.image = image;
        let postId = req.params.id;
        let result = await PostModule.updatePost(req.body, postId);
        if (result) {
            res.status(200).send({ msg: "Post update successfully!!", data: result });
        } else {
            res.status(400).send({ msg: "Could not update Post!!" });

        }
    }
    deletePost = async (req, res) => {
        let postId = req.params.id;
        let result = await PostModule.deletePost(postId);
        if (result) {
            res.status(200).send({ msg: "Post Deleted successfully!!" });
        } else {
            res.status(400).send({ msg: "Could not delete Post!" });

        }
    }
}


module.exports = new Post;