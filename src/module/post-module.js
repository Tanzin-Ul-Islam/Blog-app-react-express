const users = require('../model/users');
const posts = require('../model/posts');

class PostModule {

    getAll = async () => {
        let data = await posts.find().populate({ path: 'authorId', select: ['name', 'userName', 'profilePic'] });
        if (data)
            return data;
    }
    getById = async (id) => {
        let data = await posts.findOne({ _id: id }).populate({ path: 'authorId', select: ['name', 'userName', 'profilePic'] });
        if(data){
            return data;
        }
    }
    getByAuthorId = async (id) => {
        let data = await posts.find({ authorId: id }).populate({ path: 'authorId', select: ['name', 'userName', 'profilePic'] });
        if (data)
            return data;
    }
    createPost = async (data) => {
        // const newPost = await posts.create({
        //     title: data.title,
        //     description: data.description,
        //     image: data.image,
        //     category: data.category,
        //     authorId: data.authorId,
        // });
        const post = new posts(data);
        let response = await post.save();
        if (response.id) {
            let result = posts.findOne({ _id: response.id });
            return result;
        }
    }
    
}

module.exports = new PostModule;