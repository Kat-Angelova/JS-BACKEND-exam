const Post = require('../models/Post.js');

exports.create = (postData) => Post.create(postData);

exports.getAllPosts = () => Post.find().lean();

exports.getOne = (postId) => Post.findById(postId).populate('votes');

exports.upVote = async (postId) => {
    const filter = { _id: postId };
    const update = { $inc: { rating: +1 }};
    let result = await Post.updateOne(filter, update, { runValidators: true});

    return result;
};

exports.downVote = async (postId) => {
    const filter = { _id: postId };
    const update = { $inc: { rating: -1 }};
    let result = await Post.updateOne(filter, update, { runValidators: true});

    return result;
};

exports.deletePost = (postId) => Post.findByIdAndDelete(postId);

exports.editOne = (postId, postData) => Post.findByIdAndUpdate(postId, postData);
