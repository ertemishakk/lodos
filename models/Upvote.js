const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UpvoteModel = new Schema({
    questionid: {
        type: Schema.Types.ObjectId,
        ref: 'questionsModel'
    }
    ,
    votes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }]
})

module.exports = Upvote = mongoose.model('upvotes', UpvoteModel)