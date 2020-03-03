const express = require('express')
const router = express.Router()
const Question = require('../models/Questions')
const Upvote = require('../models/Upvote')
const AllPosts = require('../models/AllPosts')
const Downvote = require('../models/Downvote')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const passport = require('passport')

router.get('/getquestions', (req, res) => {
    const filter = {}
    if (req.query.query) {
        filter.title = {
            $regex: req.query.query
        }
    }
    Question.find(filter)
        .skip(req.query.page * 12)
        .limit(12)
        .populate('user')
        .populate('upvotes')
        .populate('downvotes')
        .sort({ date: -1 })
        .then(questions => {
            res.json(questions)
        })
        .catch(err => console.log(err))
})


router.delete('/deletequestion/:questionid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Question.findByIdAndDelete(req.params.questionid)
        .then(question => {
            Upvote.findOne({
                _id: ObjectId(question.upvote)
            }).remove()

            Downvote.findOne({
                _id: ObjectId(question.downvote)
            }).remove()
        })
        .catch(err => console.log(err))
})

router.get('/getSpecificQuestion/:questionid', (req, res) => {


    Question.findById(req.params.questionid)
        .populate('user', '-password')
        .populate('upvotes')
        .populate('downvotes')
        .then(post => {

            res.json(post)
        })
        .catch(err => res.json(err))
})



router.get('/getProfileQuestions/:userid', passport.authenticate('jwt', { session: false }), (req, res) => {


    Question.find({ user: ObjectId(req.params.userid) })
        .populate('user', '-password')
        .populate('upvotes')
        .populate('downvotes')
        .sort({ date: -1 })
        .then(posts => {
            res.json(posts)
        })
        .catch(err => res.json(err))
})


router.get('/getpopularquestions/:questionid', (req, res) => {

    const threeDaysAgo = new Date(Date.now() - (3 * 24 * 60 * 60 * 100))
    if (req.params.questionid !== 'undefined') {
        Question.aggregate([
            {
                $match: {
                    date: { $lte: threeDaysAgo },
                    voteCount: { $gt: 0 },
                    _id: { $ne: ObjectId(req.params.questionid) }
                }
            },
            { $sample: { size: 5 } },
            { $sort: { voteCount: -1 } },
            { $lookup: { from: 'upvotes', localField: 'upvotes', foreignField: '_id', as: 'upvotes' } },
            { $lookup: { from: 'downvotes', localField: 'downvotes', foreignField: '_id', as: 'downvotes' } }


        ])
            .then(posts => {
                res.json(posts)
                // console.log(posts)
            })
            .catch(err => res.json(err))
    }
    else {
        Question.aggregate([
            {
                $match: {
                    date: { $lte: threeDaysAgo },
                    voteCount: { $gt: 0 },

                }
            },
            { $sample: { size: 5 } },
            { $sort: { voteCount: -1 } },
            { $lookup: { from: 'upvotes', localField: 'upvotes', foreignField: '_id', as: 'upvotes' } },
            { $lookup: { from: 'downvotes', localField: 'downvotes', foreignField: '_id', as: 'downvotes' } }


        ])
            .then(posts => {
                res.json(posts)
                // console.log(posts)
            })
            .catch(err => res.json(err))
    }






})

router.get('/getrandomposts', (req, res) => {
    AllPosts.aggregate([
        { $sample: { size: 5 } },
        { $unwind: '$posts' },
        { $sort: { 'posts.date': 1 } },
        { $group: { _id: '$_id', post: { $first: '$posts' } } },

        // { $project: { '_id': 0 } } To remove the post ids
    ])
        .then(posts => {
            res.json(posts)
        })
        .catch(err => res.json(err))

})



router.post('/postquestions', passport.authenticate('jwt', { session: false }), (req, res) => {

    const newQuestion = new Question({
        user: req.body.user,
        title: req.body.title,
        voteCount: 0,

    })

    newQuestion.save()
        .then(question => {
            const newUpvote = new Upvote({
                questionid: question._id
            })
            newUpvote.save()
                .then(upvote => {

                    Question.updateOne({ _id: question._id }, { upvotes: upvote._id })
                        .then(() => {

                            const newDownvote = new Downvote({
                                questionid: question._id
                            })

                            newDownvote.save()
                                .then(downvote => {
                                    Question.updateOne({ _id: question._id }, { downvotes: downvote._id })
                                        .then(() => {
                                            res.json(question)


                                        }).catch(err => console.log(err))
                                })
                        })
                })

        })

})

router.post('/updateViews', (req, res) => {
    Question.updateOne(
        {
            _id: req.body.questionid,
            'views.user': { $ne: ObjectId(req.body.loggedinuser) }
        },
        { $push: { views: { user: ObjectId(req.body.loggedinuser) } } })
        .catch(err => console.log(err))

})



module.exports = (io) => {

    io.on('connection', (socket) => {
        console.log(` with userid : ${socket.id}`)

        socket.on('answerUpVoteClicked', (data) => {
            if (data.userid) {

                Question.aggregate([
                    { $match: { _id: ObjectId(data.questionid) } },
                    { $unwind: '$answers' },
                    { $match: { 'answers._id': ObjectId(data.answerid) } },
                    { $group: { _id: '$_id', 'answer': { $push: '$answers' } } }

                ])
                    .then((answer) => {

                        if (answer[0].answer[0].upvotes.filter(vote => vote.toString() === data.userid).length === 0) {

                            if (answer[0].answer[0].downvotes.filter(vote => vote.toString() === data.userid).length > 0) {
                                Question.updateOne({ _id: ObjectId(data.questionid), 'answers._id': ObjectId(data.answerid) },
                                    {
                                        $push: { 'answers.$.upvotes': ObjectId(data.userid) },
                                        $pull: { 'answers.$.downvotes': ObjectId(data.userid) },
                                        $inc: { 'answers.$.answerVoteCount': 2 }
                                    }

                                )
                                    .then(() => {
                                        console.log('increment 2')
                                        Question.aggregate([
                                            { $match: { _id: ObjectId(data.questionid) } },
                                            { $unwind: '$answers' },
                                            { $sort: { 'answers.answerVoteCount': -1, 'answers.date': 1 } },
                                            { $group: { _id: '$_id', 'answers': { $push: '$answers' } } }
                                        ])
                                            .then(updatedAnswers => io.emit('answerUpVoteUpdated', { updatedAnswers }))
                                            .catch(err => console.log(err))
                                    })
                                    .catch(err => console.log(err))
                            }
                            else {
                                Question.updateOne({ _id: ObjectId(data.questionid), 'answers._id': ObjectId(data.answerid) },
                                    {
                                        $push: { 'answers.$.upvotes': ObjectId(data.userid) },
                                        $inc: { 'answers.$.answerVoteCount': 1 }
                                    }

                                )
                                    .then(() => {
                                        console.log('increment 1')
                                        Question.aggregate([
                                            { $match: { _id: ObjectId(data.questionid) } },
                                            { $unwind: '$answers' },
                                            { $sort: { 'answers.answerVoteCount': -1, 'answers.date': 1 } },
                                            { $group: { _id: '$_id', 'answers': { $push: '$answers' } } }
                                        ])
                                            .then(updatedAnswers => io.emit('answerUpVoteUpdated', { updatedAnswers }))
                                            .catch(err => console.log(err))
                                    })
                                    .catch(err => console.log(err))
                            }


                        }
                        else if (answer[0].answer[0].upvotes.filter(vote => vote.toString() === data.userid).length === 1) {
                            Question.updateOne({ _id: ObjectId(data.questionid), 'answers._id': ObjectId(data.answerid) },
                                {
                                    $pull: { 'answers.$.upvotes': ObjectId(data.userid) },
                                    $inc: { 'answers.$.answerVoteCount': -1 }
                                }

                            )
                                .then(() => {
                                    console.log('decrement 1 already upvoted')

                                    Question.aggregate([
                                        { $match: { _id: ObjectId(data.questionid) } },
                                        { $unwind: '$answers' },
                                        { $sort: { 'answers.answerVoteCount': -1, 'answers.date': 1 } },
                                        { $group: { _id: '$_id', 'answers': { $push: '$answers' } } }
                                    ])
                                        .then(updatedAnswers => io.emit('answerUpVoteUpdated', { updatedAnswers }))
                                        .catch(err => console.log(err))


                                })
                                .catch(err => console.log(err))

                        }



                    })
                    .catch(err => console.log(err))
            }

        })

        socket.on('answerDownVoteClicked', (data) => {

            if (data.userid) {
                Question.aggregate([
                    { $match: { _id: ObjectId(data.questionid) } },
                    { $unwind: '$answers' },
                    { $match: { 'answers._id': ObjectId(data.answerid) } },
                    { $group: { _id: '$_id', 'answer': { $push: '$answers' } } }

                ])
                    .then(answer => {

                        if (answer[0].answer[0].downvotes.filter(vote => vote.toString() === data.userid).length === 0) {

                            if (answer[0].answer[0].upvotes.filter(vote => vote.toString() === data.userid).length > 0) {
                                Question.updateOne({ _id: ObjectId(data.questionid), 'answers._id': ObjectId(data.answerid) },
                                    {
                                        $pull: { 'answers.$.upvotes': ObjectId(data.userid) },
                                        $push: { 'answers.$.downvotes': ObjectId(data.userid) },
                                        $inc: { 'answers.$.answerVoteCount': -2 }
                                    }

                                )
                                    .then(() => {
                                        console.log('decrement 2')
                                        Question.aggregate([
                                            { $match: { _id: ObjectId(data.questionid) } },
                                            { $unwind: '$answers' },
                                            { $sort: { 'answers.answerVoteCount': -1, 'answers.date': 1 } },
                                            { $group: { _id: '$_id', 'answers': { $push: '$answers' } } }
                                        ])
                                            .then(updatedAnswers => io.emit('answerDownVoteUpdated', { updatedAnswers }))
                                            .catch(err => console.log(err))
                                    })
                                    .catch(err => console.log(err))

                            }
                            else {
                                Question.updateOne({ _id: ObjectId(data.questionid), 'answers._id': ObjectId(data.answerid) },
                                    {
                                        $push: { 'answers.$.downvotes': ObjectId(data.userid) },
                                        $inc: { 'answers.$.answerVoteCount': -1 }
                                    }

                                )
                                    .then(() => {
                                        console.log('decrement 1')
                                        Question.aggregate([
                                            { $match: { _id: ObjectId(data.questionid) } },
                                            { $unwind: '$answers' },
                                            { $sort: { 'answers.answerVoteCount': -1, 'answers.date': 1 } },
                                            { $group: { _id: '$_id', 'answers': { $push: '$answers' } } }
                                        ])
                                            .then(updatedAnswers => io.emit('answerDownVoteUpdated', { updatedAnswers }))
                                            .catch(err => console.log(err))
                                    })
                                    .catch(err => console.log(err))
                            }

                        }

                        else if (answer[0].answer[0].downvotes.filter(vote => vote.toString() === data.userid).length === 1) {
                            Question.updateOne({ _id: ObjectId(data.questionid), 'answers._id': ObjectId(data.answerid) },
                                {
                                    $pull: { 'answers.$.downvotes': ObjectId(data.userid) },
                                    $inc: { 'answers.$.answerVoteCount': 1 }
                                }

                            )
                                .then(() => {
                                    console.log('increment 1 already downvoted')
                                    Question.aggregate([
                                        { $match: { _id: ObjectId(data.questionid) } },
                                        { $unwind: '$answers' },
                                        { $sort: { 'answers.answerVoteCount': -1, 'answers.date': 1 } },
                                        { $group: { _id: '$_id', 'answers': { $push: '$answers' } } }
                                    ])
                                        .then(updatedAnswers => io.emit('answerDownVoteUpdated', { updatedAnswers }))
                                        .catch(err => console.log(err))
                                })
                                .catch(err => console.log(err))

                        }


                    })
                    .catch(err => console.log(err))
            }


        })

        socket.on('getquestion', (data) => {
            Question.findById(data.questionid)
                .populate('upvotes')
                .populate('downvotes')
                .then(post => io.emit('setquestion', { post }))
                .catch(err => console.log(err))
        })

        socket.on('postanswer', (data) => {
            Question.updateOne({ _id: ObjectId(data.questionid) },
                {
                    $push: { answers: { user: ObjectId(data.userid), text: data.answer, name: data.name, answerVoteCount: 0 }, $sort: { date: -1 } }
                },
                { useFindAndModify: false })
                .then(() => {

                    Question.aggregate([
                        { $match: { _id: ObjectId(data.questionid) } },
                        { $unwind: '$answers' },
                        { $sort: { 'answers.answerVoteCount': -1, 'answers.date': 1 } },
                        { $group: { _id: '$_id', 'answers': { $push: '$answers' } } }
                    ])
                        .then(answer => io.emit('updateanswerlist', { answer }))
                        .catch(err => console.log(err))
                })
                .catch(err => res.json(err))
        })

        socket.on('getanswers', (data) => {
            Question.aggregate([
                { $match: { _id: ObjectId(data.questionid) } },
                { $unwind: '$answers' },
                { $sort: { 'answers.answerVoteCount': -1, 'answers.date': 1 } },
                { $group: { _id: '$_id', 'answers': { $push: '$answers' } } }
            ])
                .then(answer => socket.emit('setanswers', { answer }))
                .catch(err => console.log(err))
        })

        socket.on('downvote', (downvote) => {
            if (downvote.userid) {
                Downvote.findOne({ questionid: downvote.questionid })
                    .then(oneVote => {
                        if (oneVote.votes.filter(vote => vote.user.toString() === downvote.userid).length === 1) {
                            Question.updateOne({ _id: downvote.questionid },
                                {
                                    $inc: { voteCount: 1 },

                                })
                                .then(() => {
                                    Downvote.updateOne({
                                        questionid: downvote.questionid,
                                    },
                                        {
                                            $pull: {
                                                votes: { user: ObjectId(downvote.userid) }
                                            }
                                        })
                                        .then(() => {
                                            console.log('increment by 1 d')
                                            Downvote.findOne({ questionid: downvote.questionid })
                                                .populate('questionid')
                                                .then(downvotedquestion => io.emit('downvoteupdate', (downvotedquestion)))
                                                .catch(err => console.log(err))
                                        })
                                        .catch(err => console.log(err))

                                }
                                )
                                .catch(err => console.log(err))
                        }

                        else if (oneVote.votes.filter(vote => vote.user.toString() === downvote.userid).length === 0) {
                            Downvote.findOneAndUpdate({
                                questionid: downvote.questionid,
                                'votes.user': { $ne: ObjectId(downvote.userid) }
                            },
                                {
                                    $push: {
                                        votes: { user: ObjectId(downvote.userid) }
                                    }
                                },
                                { useFindAndModify: false }
                            )
                                .then(oldownvote => {
                                    Upvote.findOne({ questionid: downvote.questionid })
                                        .then(upvote => {
                                            if (upvote.votes.filter(vote => vote.user.toString() === downvote.userid).length > 0) {
                                                Upvote.updateOne({
                                                    questionid: downvote.questionid,
                                                },
                                                    {
                                                        $pull: {
                                                            votes: { user: ObjectId(downvote.userid) }
                                                        }
                                                    })
                                                    .then(() => {
                                                        Question.updateOne({ _id: downvote.questionid },
                                                            {
                                                                $inc: { voteCount: -2 },

                                                            })
                                                            .then(() => {
                                                                console.log('decrement by -2 e')
                                                                Downvote.findOne({ questionid: downvote.questionid })
                                                                    .populate('questionid')
                                                                    .then(downvotedquestion => io.emit('downvoteupdate', (downvotedquestion)))
                                                                    .catch(err => console.log(err))
                                                            }
                                                            ).catch(err => console.log(err))

                                                    })
                                                    .catch(err => console.log(err))
                                            }
                                            else {
                                                Question.updateOne({ _id: downvote.questionid, },
                                                    {

                                                        $inc: { voteCount: -1 },


                                                    })
                                                    .then(() => {
                                                        console.log('decrement by -1 f')
                                                        Downvote.findOne({ questionid: downvote.questionid })
                                                            .populate('questionid')
                                                            .then(downvotedquestion => io.emit('downvoteupdate', (downvotedquestion)))
                                                            .catch(err => console.log(err))
                                                    }
                                                    )
                                                    .catch(err => console.log(err))
                                            }
                                        })
                                        .catch(err => console.log(err))

                                })
                                .catch(err => console.log(err))

                        }

                    })
                    .catch(err => console.log(err))
            }

        })

        socket.on('upvote', (upvote) => {

            if (upvote.userid) {
                Upvote.findOne({ questionid: upvote.questionid })
                    .then(oneVote => {

                        if (oneVote.votes.filter(vote => vote.user.toString() === upvote.userid).length === 1) {

                            Question.updateOne({ _id: upvote.questionid },
                                { $inc: { voteCount: -1 } },
                            )
                                .then(() => {

                                    Upvote.updateOne({
                                        questionid: upvote.questionid,
                                    },
                                        {
                                            $pull: {
                                                votes: { user: ObjectId(upvote.userid) }
                                            }
                                        })
                                        .then(() => {
                                            console.log('decrement by -1  a')
                                            Upvote.findOne({ questionid: upvote.questionid })
                                                .populate('questionid')
                                                .then(upvotedquestion => {
                                                    io.emit('upvoteupdate', { upvotedquestion })
                                                })
                                                .catch(err => console.log(err))

                                        })
                                        .catch(err => console.log(err))
                                }
                                )
                                .catch(err => console.log(err))
                        }

                        else if (oneVote.votes.filter(vote => vote.user.toString() === upvote.userid).length === 0) {

                            Upvote.findOneAndUpdate({
                                questionid: upvote.questionid,
                                'votes.user': { $ne: ObjectId(upvote.userid) }
                            },
                                {
                                    $push: {
                                        votes: { user: ObjectId(upvote.userid) }
                                    }
                                },
                                { useFindAndModify: false }
                            )
                                .then(oldupvote => {
                                    Downvote.findOne({ questionid: upvote.questionid })
                                        .then(downvote => {
                                            if (downvote.votes.filter(vote => vote.user.toString() === upvote.userid).length > 0) {


                                                Downvote.updateOne({
                                                    questionid: upvote.questionid,
                                                },
                                                    {
                                                        $pull: {
                                                            votes: { user: ObjectId(upvote.userid) }
                                                        }
                                                    })
                                                    .then(() => {
                                                        Question.updateOne({ _id: upvote.questionid },
                                                            {
                                                                $inc: { voteCount: 2 },

                                                            })
                                                            .then(() => {
                                                                console.log('increment by 2 b')
                                                                Upvote.findOne({ questionid: upvote.questionid })
                                                                    .populate('questionid')
                                                                    .then(upvotedquestion => {

                                                                        io.emit('upvoteupdate', { upvotedquestion })
                                                                    })
                                                                    .catch(err => console.log(err))



                                                            }
                                                            )
                                                            .catch(err => console.log(err))
                                                    })
                                                    .catch(err => console.log(err))


                                            }
                                            else {
                                                Question.updateOne({
                                                    _id: upvote.questionid

                                                },
                                                    {

                                                        $inc: { voteCount: 1 }


                                                    })
                                                    .then(() => {
                                                        console.log('increment by 1 c')
                                                        Upvote.findOne({ questionid: upvote.questionid })
                                                            .populate('questionid')
                                                            .then(upvotedquestion => {
                                                                io.emit('upvoteupdate', { upvotedquestion })
                                                            })
                                                            .catch(err => console.log(err))

                                                    }
                                                    )
                                                    .catch(err => console.log(err))
                                            }
                                        })
                                        .catch(err => console.log(err))

                                })
                        }

                    })
                    .catch(err => console.log(err))
            }



        })

        socket.on('deleteAnswer', (data) => {
            // console.log(data.answerid)
            Question.findOneAndUpdate({ _id: data.questionid },
                {
                    $pull: {
                        answers: { _id: ObjectId(data.answerid) }
                    }
                },
                { new: true, useFindAndModify: false })
                .then(question => {
                    io.emit('updatedQuestion', { question })
                })
        })

        socket.on('disconnect', () => {
            console.log('disconnected')
        })


    })

    return router
}