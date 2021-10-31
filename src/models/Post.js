const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [6, 'Title should be at least 6 characters!']
    },
    keyword: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [6, 'Keyword should be at least 6 characters!']
    },
    location: {
        type: String,
        required: [true, 'All fields are required!'],
        maxlength: [10, 'Location should be maximum 10 characters long!']
    },
    date: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [10, 'Date should be exactly 10 characters long!'],
        maxlength: [10, 'Date should be exactly 10 characters long!'],
        match: [/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/, 'Wrong data format!']
    },
    imageUrl: {
        type: String,
        required: [true, 'All fields are required!'],
        match: [/^https?:\/\/.+/, 'Image URL is not in the valid format!']
    },
    description: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [8, 'The description should be a minimum of 8 characters long']
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    votes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    rating: {
        type: Number,
        default: 0,
    }


});

postSchema.method('getVotes', function() {
    return this.votes.map(user => user.email).join(', ')
})

const Post = mongoose.model('Post', postSchema);


module.exports = Post;