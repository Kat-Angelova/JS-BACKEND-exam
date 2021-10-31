const express = require('express');

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const postsController = require('./controllers/postsController.js');


const router = express.Router();

router.use(homeController);
router.use('/auth', authController);
router.use('/posts', postsController);

router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;