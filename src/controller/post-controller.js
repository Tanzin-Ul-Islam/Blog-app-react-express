const posts = require('../model/posts');
const PostModule = require('../module/post-module')
class Post {
    getAllPost = async (req, res) => {
        const result = await PostModule.getAll();
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
            res.status(400).send("Something went wrong! Could not create blog. Please try again.");
        }
    }
}


module.exports = new Post;