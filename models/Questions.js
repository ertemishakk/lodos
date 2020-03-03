const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    // description: {
    //     type: String
    // },

    voteCount: {
        type: Number
    }
    , views: [{
        user: { type: Schema.Types.ObjectId }
    }],
    answers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        name: { type: String },
        text: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        upvotes: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }],
        downvotes: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }],
        answerVoteCount: {
            type: Number
        }

    }],
    upvotes: {

        type: Schema.Types.ObjectId,
        ref: 'upvotes'

    },
    downvotes: {
        type: Schema.Types.ObjectId,
        ref: 'downvotes'

    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Question = mongoose.model('questionsModel', QuestionsSchema)