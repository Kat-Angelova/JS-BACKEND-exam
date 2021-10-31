const express = require('express');

const postsService = require('../services/postsService.js');
const authService = require('../services/authService.js');

const { getErrorMessage } = require('../config/errorHandler.js');
const { isAuthenticated } = require('../middlewares/authMiddleware.js');
const { isOwner, isNotOwner } = require('../middlewares/guards.js');

const router = express.Router();

//get all posts

const getAllPosts = async (req, res) => {
    const posts = await postsService.getAllPosts();

    res.render('posts/all-posts', { posts });
};

//create
const renderCreatePost = (req, res) => {
    res.render('posts/create');
};

const postCreatePost = async (req, res) => {
    try {
        await postsService.create({ ...req.body, creator: req.user._id });
        
        res.redirect('/posts/all-posts');
    } catch (error) {
        res.render('posts/create', { error: getErrorMessage(error)})
    }

};

//details

const getDetails = async (req, res) => {
    let post = await postsService.getOne(req.params.postId);
    let postData = await post.toObject();

    const isCreator = postData.creator == req.user?._id;
    const votes = post.getVotes();
    const isRating = post.rating > 0;

    const isVotedByMe = post.votes.some(x => x._id == req.user?._id);

    res.render('posts/details', { ...postData, isCreator, votes, isRating, isVotedByMe})
};

//up-vote

const getUpVote = async (req, res) => {
    let post = await postsService.getOne(req.params.postId);

    post.votes.push(req.user._id);
    postsService.upVote(req.params.postId);

    await post.save();
    res.redirect(`/posts/details/${req.params.postId}`);
};

const getDownVote = async (req, res) => {
    let post = await postsService.getOne(req.params.postId);

    post.votes.push(req.user._id);
    postsService.downVote(req.params.postId);

    await post.save();
    res.redirect(`/posts/details/${req.params.postId}`);
};

//delete
const deletePost = async (req, res) => {
    await postsService.deletePost(req.params.postId);

    res.redirect('/posts/all-posts');
};

//edit
const renderEditPost = async (req, res) => {
    let post = await postsService.getOne(req.params.postId);

    res.render('posts/edit', { ...post.toObject()});
};

const postEditPost = async (req, res) => {
    await postsService.editOne(req.params.postId, req.body);

    res.redirect(`/posts/details/${req.params.postId}`);
};

//my-posts

const myPostsPage = async (req, res) => {
    let user = await authService.getMyProfile(req.user._id);

    res.render('posts/my-posts', { ... user });

};


router.get('/all-posts', getAllPosts);

router.get('/create', isAuthenticated, renderCreatePost);
router.post('/create', isAuthenticated,  postCreatePost);

router.get('/details/:postId', getDetails);

router.get('/up-vote/:postId', isNotOwner, getUpVote);
router.get('/down-vote/:postId', isNotOwner, getDownVote);

router.get('/delete/:postId', isOwner, deletePost);

router.get('/edit/:postId', isOwner, renderEditPost);
router.post('/edit/:postId', isOwner, postEditPost);

router.get('/my-posts', isAuthenticated, myPostsPage);

module.exports = router;