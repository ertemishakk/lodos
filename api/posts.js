const express = require('express');
const router = express.Router()
const HousingPost = require('../models/HousingPosts')
const ForSalePosts = require('../models/ForSalePosts')
const User = require('../models/User')
const mongoose = require('mongoose')


router.get('/test', (req, res) => res.json({ msg: 'posts route works' }))

router.post('/housing', (req, res) => {
    // const user = User.findById(req.body.postedby)

    const newHousingPost = new HousingPost({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        name: req.body.postedby

    })
    newHousingPost.save().then(post => res.json(post))
        .catch(err => console.log('bug'))
})

router.post('/forsale', (req, res) => {
    // const user = User.findById(req.body.postedby)

    const newForSalePost = new ForSalePosts({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        name: req.body.postedby,
        price: req.body.price

    })
    newForSalePost.save().then(post => res.json(post))
        .catch(err => console.log('bug'))
})




router.get('/housing', (req, res) => {
    HousingPost.find().sort({ date: -1 }).then(housingposts => res.json(housingposts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})


router.get('/forsale', (req, res) => {
    ForSalePosts.find().sort({ date: -1 }).then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})
module.exports = router