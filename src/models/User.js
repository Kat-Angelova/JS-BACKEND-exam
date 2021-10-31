const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants.js');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [3, 'First name should be at least e characters!'],
        match: [/^[a-zA-Z][a-zA-Z ]{0,}$/, 'The name should contains only english letters!']
    },
    lastName: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'Last name should be at least 4 characters!'],
        match: [/^[a-zA-Z][a-zA-Z ]{0,}$/, 'The name should contains only english letters!']
    },
    email: {
        type: String,
        required: [true, 'All fields are required!'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'This email should contains only latin letters and it is in the wrong format!']
    },
    password: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'Password must be at least 4 characters long.'],
    },
    myPosts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Post',
        } 
    ]

});

// userSchema.virtual('fullName').
//     get(function(){
//         return `${this.firstName} ${this.lastName}`;
//     }).
//     set(function(value) {
//         const firstName = value.substring(0, value.indexOf(' '));
//         const lastName = value.substring(value.indexOf(' ') + 1);

//         this.set({ firstName, lastName });
//     });

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            return next();
        })

});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);

});

userSchema.method('getMyPosts', function() {
    return this.myPosts;
});


const User = mongoose.model('User', userSchema);


module.exports = User;