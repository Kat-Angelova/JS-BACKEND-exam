const postsService = require('../services/postsService.js');

exports.isOwner = async function(req, res, next) {
    let post = await postsService.getOne(req.params.postId);

    if(post.creator == req.user._id) {
        next()
    } else {
        res.redirect(`/posts/details/${req.params.postId}`);
    }
};

exports.isNotOwner = async function(req, res, next) {
    let post = await postsService.getOne(req.params.postId);
   
    if(post.creator != req.user._id) {
        next();
    } else {
        res.redirect(`/posts/details/${req.params.postId}`);
    }
};