const jwt = require('../utils/jwt.js');
const User = require('../models/User.js');
const { TOKEN_SECRET } = require('../constants.js');

exports.login = async ({ email, password }) => {
    let user = await User.findOne({ email: email });

    if(!user) {
        throw new Error('Invalid email or password');
    }

    let isValid = await user.validatePassword(password);

    if(!isValid) {
        throw new Error('Invalid email or password');
    } 

    let payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }

    let token = await jwt.sign(payload, TOKEN_SECRET, { expiresIn: '5h'});
    
    return token;
};

exports.register = async (userData) => User.create(userData);

exports.getMyProfile = (userId) => User.findById(userId).populate('myPosts');