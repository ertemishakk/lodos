const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AllPostsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    posts: [{
        postid: {
            type: String
        },
        title: {
            type: String
        },
        category: {
            type: String
        },
        subcategory: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]

})


module.exports = AllPosts = mongoose.model('allposts', AllPostsSchema)