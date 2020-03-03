const express = require('express');
const router = express.Router()
const HousingPost = require('../models/HousingPosts')
const ForSalePosts = require('../models/ForSalePosts')
const AllPosts = require('../models/AllPosts')
const Jobs = require('../models/Jobs')
const GarageSale = require('../models/GarageSale')
const Free = require('../models/Free')
const Classes = require('../models/Classes')
const Events = require('../models/Events')
const Volunteers = require('../models/Volunteers')
const LostAndFound = require('../models/LostAndFound')
const Services = require('../models/Services')
const validateData = require('../validateForms/validateData')
const validateFilters = require('../validateForms/validateFilters')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const keys = require('../config/keys')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const AmazonS3URI = require('amazon-s3-uri')
mongoose.set('useFindAndModify', false);
const passport = require('passport')

aws.config.update({
    secretAccessKey: keys.secretAccessKey,
    accessKeyId: keys.accessKeyId,
    region: 'ap-southeast-2'
})
const s3 = new aws.S3();


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif') {
        cb(null, true)
    }
    else {
        cb(new Error('Invalid Type'), false)
    }
}

const size = (req, file, cb) => {
    if (file.size < 5000000) {
        cb(null, true)
    }
    else {
        cb(new Error('Max File Size 5 MB'), false)
    }
}


const upload = multer({
    fileFilter: fileFilter,
    size: size,
    storage: multerS3({
        s3: s3,
        bucket: 'lodos',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})




router.post('/updatepost', passport.authenticate('jwt', { session: false }), upload.array('image', 6), (req, res) => {

    let collection;

    if (req.body.category === "forsale") {
        collection = 'forSaleModel'
    }
    if (req.body.category === "housing") {
        collection = 'housingModel'
    }

    if (req.body.category === "volunteers") {
        collection = 'volunteersModel'
    }
    if (req.body.category === "services") {
        collection = 'servicesModel'
    }
    if (req.body.category === "events") {
        collection = 'eventsModel'
    }
    if (req.body.category === "classes") {
        collection = 'classesModel'
    }
    if (req.body.category === "free") {
        collection = 'freeModel'
    }
    if (req.body.category === "garagesale") {
        collection = 'garageSaleModel'
    }

    if (req.body.category === "jobs") {
        collection = 'jobsModel'
    }
    if (req.body.category === "lostandfound") {
        collection = 'lostandfoundModel'
    }
    const { errors, isValid } = validateData(req.body)
    const fileArray = req.files;

    if (!isValid) {
        for (let i = 0; i < fileArray.length; i++) {
            s3.deleteObjects({
                Bucket: 'lodos',
                Delete: {
                    Objects: [{
                        Key: fileArray[i].key
                    }]
                }

            }, function (err, data) {
                if (err) console.log(err + 'error 2');
                else console.log(data + 'data');
            })
        }
        return res.status(400).json(errors)
    }

    const listoflinks = [];

    if (fileArray.length !== 0) {

        for (let i = 0; i < fileArray.length; i++) {
            const link = fileArray[i].location
            listoflinks.push(link)
        }
    }


    const updateData = {}

    if (req.body.odometer) {
        updateData.odometer = req.body.odometer
    }
    if (req.body.model) {
        updateData.model = req.body.model
    }
    if (req.body.make) {
        updateData.make = req.body.make
    }
    if (req.body.title) {
        updateData.title = req.body.title
    }
    if (req.body.price) {
        updateData.price = req.body.price
    }
    if (req.body.category) {
        updateData.category = req.body.category
    }
    if (req.body.subcategory) {
        updateData.subcategory = req.body.subcategory
    }
    if (req.body.condition) {
        updateData.condition = req.body.condition
    }
    if (req.body.language) {
        updateData.language = req.body.language
    }
    if (req.body.email) {
        updateData.email = req.body.email
    }
    if (req.body.phonenumber) {
        updateData.phonenumber = req.body.phonenumber
    }
    if (req.body.description) {
        updateData.description = req.body.description
    }
    if (req.body.salary) {
        updateData.salary = req.body.salary
    }
    if (req.body.company) {
        updateData.company = req.body.company
    }
    if (req.body.when) {
        updateData.when = req.body.value
    }

    mongoose.model(collection).findOneAndUpdate({ _id: req.body.postid }, {
        $set: updateData,
        $push: { links: listoflinks }
    }, { useFindAndModify: false })
        .then((oldpost) => {
            mongoose.model(collection).findById(req.body.postid)
                .then(updatedpost => {

                    AllPosts.updateOne(
                        {
                            // "user": ObjectId(req.query.userid),
                            'posts': {
                                $elemMatch: { postid: req.body.postid }
                            }
                        },
                        {
                            $set: {

                                'posts.$.postid': updatedpost._id,
                                'posts.$.title': updatedpost.title,
                                'posts.$.category': updatedpost.category,
                                'posts.$.subcategory': updatedpost.subcategory,

                            }
                        })
                        .then(() => {
                            res.json('success')
                        })
                        .catch(err => console.log(err))
                }).catch(err => res.status(401).json(err))
        }).catch(err => res.status(401).json(err))



})



router.delete('/deletephotos', passport.authenticate('jwt', { session: false }), (req, res) => {
    let collection;

    if (req.query.category === "forsale") {
        collection = 'forSaleModel'
    }
    if (req.query.category === "housing") {
        collection = 'housingModel'
    }

    if (req.query.category === "volunteers") {
        collection = 'volunteersModel'
    }
    if (req.query.category === "services") {
        collection = 'servicesModel'
    }
    if (req.query.category === "events") {
        collection = 'eventsModel'
    }
    if (req.query.category === "classes") {
        collection = 'classesModel'
    }
    if (req.query.category === "free") {
        collection = 'freeModel'
    }
    if (req.query.category === "garagesale") {
        collection = 'garageSaleModel'
    }

    if (req.query.category === "jobs") {
        collection = 'jobsModel'
    }
    if (req.query.category === "lostandfound") {
        collection = 'lostandfoundModel'
    }

    mongoose.model(collection)
        .updateOne(
            { '_id': req.query.postid },
            { $pull: { links: req.query.link } }
        )
        .then(() => {
            const { bucket, key } = AmazonS3URI(req.query.link)
            s3.deleteObjects({
                Bucket: bucket,
                Delete: {
                    Objects: [{
                        Key: key
                    }]
                }

            }, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            })
        })
        .then(() => res.json('Photo deleted'))
        .catch(err => {
            res.status(404).json(err)

        })


})




router.delete("/deletepost", passport.authenticate('jwt', { session: false }), (req, res) => {

    console.log('delete post called automaticlay')

    let collection;

    if (req.query.category === "forsale") {
        collection = 'forSaleModel'
    }
    if (req.query.category === "housing") {
        collection = 'housingModel'
    }

    if (req.query.category === "volunteers") {
        collection = 'volunteersModel'
    }
    if (req.query.category === "services") {
        collection = 'servicesModel'
    }
    if (req.query.category === "events") {
        collection = 'eventsModel'
    }
    if (req.query.category === "classes") {
        collection = 'classesModel'
    }
    if (req.query.category === "free") {
        collection = 'freeModel'
    }
    if (req.query.category === "garagesale") {
        collection = 'garageSaleModel'
    }

    if (req.query.category === "jobs") {
        collection = 'jobsModel'
    }
    if (req.query.category === "lostandfound") {
        collection = 'lostandfoundModel'
    }

    mongoose.model(collection).findOneAndDelete({ _id: req.query.postid })
        .then(post => {
            if (post.links && post.links.length > 0) {
                for (i = 0; i < post.links.length; i++) {
                    const uri = post.links[i]
                    const { bucket, key } = AmazonS3URI(uri)

                    s3.deleteObjects({
                        Bucket: bucket,
                        Delete: {
                            Objects: [{
                                Key: key
                            }]
                        }

                    }, function (err, data) {
                        if (err) console.log(err);
                        else console.log(data);
                    })
                }
            }
            AllPosts.updateOne(
                { "user": req.query.userid },
                { "$pull": { "posts": { "postid": req.query.postid } } })
                .then(() => {
                    AllPosts.aggregate([
                        { "$match": { "user": ObjectId(req.query.userid) } },
                        { "$unwind": "$posts" },
                        { "$sort": { "posts.date": -1 } }
                    ]).then(posts => {
                        // console.log(posts)
                        res.json(posts);
                    })
                        .catch(err => {

                            res.status(404).json(err)
                        }

                        )
                }).catch(err => console.log(err))


        }
        )
        .catch(err => console.log(err))

})




router.get('/profileposts/:userid', passport.authenticate('jwt', { session: false }), (req, res) => {

    AllPosts.aggregate(
        [

            { $match: { user: ObjectId(req.params.userid) } },
            { $unwind: '$posts' },
            { $sort: { 'posts.date': -1 } }

        ]
    )
        .then(posts => {
            // console.log(posts)
            res.json(posts)
        })
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))


})



router.get('/forsalestates', (req, res) => {

    ForSalePosts.distinct('state')
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch states'))
})

router.get('/forsaletowns/:stateinfo', (req, res) => {
    ForSalePosts.distinct('town', { 'state': req.params.stateinfo })
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch cities'))
})

router.get('/housingstates', (req, res) => {

    HousingPost.distinct('state')
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch states'))
})

router.get('/housingtowns/:stateinfo', (req, res) => {
    HousingPost.distinct('town', { 'state': req.params.stateinfo })
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch cities'))
})

router.get('/jobsstates', (req, res) => {

    Jobs.distinct('state')
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch states'))
})

router.get('/jobstowns/:stateinfo', (req, res) => {
    Jobs.distinct('town', { 'state': req.params.stateinfo })
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch cities'))
})

router.get('/garagesalestates', (req, res) => {

    GarageSale.distinct('state')
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch states'))
})

router.get('/garagesaletowns/:stateinfo', (req, res) => {
    GarageSale.distinct('town', { 'state': req.params.stateinfo })
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch cities'))
})

router.get('/freestates', (req, res) => {

    Free.distinct('state')
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch states'))
})

router.get('/freetowns/:stateinfo', (req, res) => {
    Free.distinct('town', { 'state': req.params.stateinfo })
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch cities'))
})
router.get('/eventsstates', (req, res) => {

    Events.distinct('state')
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch states'))
})

router.get('/eventstowns/:stateinfo', (req, res) => {
    Events.distinct('town', { 'state': req.params.stateinfo })
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch cities'))
})

router.get('/volunteersstates', (req, res) => {

    Volunteers.distinct('state')
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch states'))
})

router.get('/volunteerstowns/:stateinfo', (req, res) => {
    Volunteers.distinct('town', { 'state': req.params.stateinfo })
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch cities'))
})

router.get('/classesstates', (req, res) => {

    Classes.distinct('state')
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch states'))
})

router.get('/classestowns/:stateinfo', (req, res) => {
    Classes.distinct('town', { 'state': req.params.stateinfo })
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch cities'))
})

router.get('/lostandfoundstates', (req, res) => {

    LostAndFound.distinct('state')
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch states'))
})

router.get('/lostandfoundtowns/:stateinfo', (req, res) => {
    LostAndFound.distinct('town', { 'state': req.params.stateinfo })
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch cities'))
})
router.get('/servicesstates', (req, res) => {

    Services.distinct('state')
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch states'))
})

router.get('/servicestowns/:stateinfo', (req, res) => {
    Services.distinct('town', { 'state': req.params.stateinfo })
        .then(states => res.json(states))
        .catch(err => res.status(404).json('Cant fetch cities'))
})
router.get('/forsale', (req, res) => {

    const { errors } = validateFilters(req.query)
    let filters = {}
    let sort = {}

    if (!errors.state) {
        filters.state = req.query.state
    }
    if (!errors.city) {
        filters.town = req.query.city
    }

    if (!errors.subcategory) {
        filters.subcategory = req.query.subcategory
    }

    if (!errors.make) {
        filters.make = req.query.make
    }
    if (!errors.minprice && !errors.minpricenumber) {
        filters.price = { ...filters.price, $gt: req.query.minprice }
    }
    if (!errors.maxprice && !errors.maxpricenumber) {
        filters.price = { ...filters.price, $lt: req.query.maxprice }
    }

    if (!errors.minkm && !errors.minkmnumber) {
        filters.odometer = { ...filters.odometer, r$gt: req.query.minkm }
    }

    if (!errors.maxkm && !errors.maxkmnumber) {
        filters.odometer = { ...filters.odometer, $lt: req.query.maxkm }
    }

    if (!errors.minyear && !errors.minyearnumber) {
        filters.model = { ...filters.model, $gt: req.query.minyear }
    }

    if (!errors.maxyear && !errors.maxyearnumber) {
        filters.model = { ...filters.model, $lt: req.query.maxyear }
    }
    if (!req.query.sortby || req.query.sortby === 'newest') {
        sort.date = -1
    }

    if (req.query.sortby === 'pricelow') {
        sort.price = 1
    }
    if (req.query.sortby === 'pricehigh') {
        sort.price = -1
    }
    if (req.query.sortby === 'minkm') {
        sort.odometer = 1
    }
    if (req.query.sortby === 'maxkm') {
        sort.odometer = -1
    }
    if (req.query.sortby === 'minyear') {
        sort.model = 1
    }
    if (req.query.sortby === 'maxyear') {
        sort.model = -1
    }

    ForSalePosts.find(filters)
        .skip(req.query.page * 12)
        .limit(12)
        .sort(sort).
        then(posts => res.json(posts)).
        catch(err => res.status(404).json('not working'))

})


router.get('/forsale/:postid', (req, res) => {
    ForSalePosts.findById(ObjectId(req.params.postid))
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})
router.get('/housing/:postid', (req, res) => {
    HousingPost.findById(ObjectId(req.params.postid))
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})
router.get('/jobs/:postid', (req, res) => {
    Jobs.findById(ObjectId(req.params.postid))
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})

router.get('/garagesale/:postid', (req, res) => {
    GarageSale.findById(ObjectId(req.params.postid))
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})
router.get('/free/:postid', (req, res) => {
    Free.findById(ObjectId(req.params.postid))
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})
router.get('/volunteers/:postid', (req, res) => {
    Volunteers.findById(ObjectId(req.params.postid))
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})
router.get('/events/:postid', (req, res) => {
    Events.findById(ObjectId(req.params.postid))
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})
router.get('/classes/:postid', (req, res) => {
    Classes.findById(ObjectId(req.params.postid))
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})
router.get('/lostandfound/:postid', (req, res) => {
    LostAndFound.findById(ObjectId(req.params.postid))
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})

router.get('/services/:postid', (req, res) => {
    Services.findById(ObjectId(req.params.postid))
        .then(post => {
            res.json(post)
        })
        .catch(err => res.status(404).json(err))
})
router.get('/housing', (req, res) => {
    const { errors } = validateFilters(req.query)
    let filters = {}
    let sort = {}

    if (!errors.state) {
        filters.state = req.query.state
    }
    if (!errors.city) {
        filters.town = req.query.city
    }

    if (!errors.subcategory) {
        filters.subcategory = req.query.subcategory
    }
    if (!req.query.sortby || req.query.sortby === 'newest') {
        sort.date = -1
    }

    if (req.query.sortby === 'pricelow') {
        sort.price = 1
    }
    if (req.query.sortby === 'pricehigh') {
        sort.price = -1
    }

    if (!errors.minprice && !errors.minpricenumber) {
        filters.price = { ...filters.price, $gt: req.query.minprice }
    }
    if (!errors.maxprice && !errors.maxpricenumber) {
        filters.price = { ...filters.price, $lt: req.query.maxprice }
    }
    if (req.query.often) {
        filters.often = req.query.often
    }

    HousingPost.find(filters).skip(req.query.page * 12)
        .limit(12)
        .sort(sort).
        then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})

router.get('/jobs', (req, res) => {
    const { errors } = validateFilters(req.query)
    let filters = {}

    if (!errors.state) {
        filters.state = req.query.state
    }
    if (!errors.city) {
        filters.town = req.query.city
    }

    if (!errors.subcategory) {
        if (req.query.subcategory !== 'all') {
            filters.subcategory = req.query.subcategory
        }
    }
    if (!errors.minprice && !errors.minpricenumber) {
        filters.salary = { ...filters.salary, $gt: req.query.minprice }
    }
    if (!errors.maxprice && !errors.maxpricenumber) {
        filters.salary = { ...filters.salary, $lt: req.query.maxprice }
    }
    Jobs.find(filters).skip(req.query.page * 12)
        .limit(12)
        .sort({ date: -1 }).
        then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})
router.get('/services', (req, res) => {
    const { errors } = validateFilters(req.query)
    let filters = {}

    if (!errors.state) {
        filters.state = req.query.state
    }
    if (!errors.city) {
        filters.town = req.query.city
    }

    if (!errors.subcategory) {
        if (req.query.subcategory !== 'all') {
            filters.subcategory = req.query.subcategory
        }
    }

    Services.find(filters).skip(req.query.page * 12)
        .limit(12)
        .sort({ date: -1 }).
        then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})

router.get('/garagesale', (req, res) => {
    const { errors } = validateFilters(req.query)
    let filters = {}

    if (!errors.state) {
        filters.state = req.query.state
    }
    if (!errors.city) {
        filters.town = req.query.city
    }

    GarageSale.find(filters).skip(req.query.page * 12)
        .limit(12)
        .sort({ date: -1 }).
        then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})

router.get('/free', (req, res) => {
    const { errors } = validateFilters(req.query)
    let filters = {}

    if (!errors.state) {
        filters.state = req.query.state
    }
    if (!errors.city) {
        filters.town = req.query.city
    }

    Free.find(filters).skip(req.query.page * 12)
        .limit(12)
        .sort({ date: -1 }).
        then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})
router.get('/volunteers', (req, res) => {
    const { errors } = validateFilters(req.query)
    let filters = {}

    if (!errors.state) {
        filters.state = req.query.state
    }
    if (!errors.city) {
        filters.town = req.query.city
    }

    Volunteers.find(filters).skip(req.query.page * 12)
        .limit(12)
        .sort({ date: -1 }).
        then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})

router.get('/classes', (req, res) => {
    const { errors } = validateFilters(req.query)
    let filters = {}

    if (!errors.state) {
        filters.state = req.query.state
    }
    if (!errors.city) {
        filters.town = req.query.city
    }

    Classes.find(filters).skip(req.query.page * 12)
        .limit(12)
        .sort({ date: -1 }).
        then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})
router.get('/events', (req, res) => {
    const { errors } = validateFilters(req.query)
    let filters = {}

    if (!errors.state) {
        filters.state = req.query.state
    }
    if (!errors.city) {
        filters.town = req.query.city
    }

    Events.find(filters).skip(req.query.page * 12)
        .limit(12)
        .sort({ date: -1 }).
        then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})
router.get('/lostandfound', (req, res) => {
    const { errors } = validateFilters(req.query)
    let filters = {}

    if (!errors.state) {
        filters.state = req.query.state
    }
    if (!errors.city) {
        filters.town = req.query.city
    }

    LostAndFound.find(filters).skip(req.query.page * 12)
        .limit(12)
        .sort({ date: -1 }).
        then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})

router.post('/forsale', passport.authenticate('jwt', { session: false }), (req, res) => {

    const multiple = upload.array('image', 6)

    multiple(req, res, function (err) {

        const { errors, isValid } = validateData(req.body)

        const fileArray = req.files;


        if (err) {
            errors.image = 'File Upload Error'
            return res.status(400).json(errors)
        }



        if (!isValid) {
            for (let i = 0; i < fileArray.length; i++) {
                s3.deleteObjects({
                    Bucket: 'lodos',
                    Delete: {
                        Objects: [{
                            Key: fileArray[i].key
                        }]
                    }

                }, function (err, data) {
                    if (err) console.log(err);
                    else console.log(data);
                })
            }
            return res.status(400).json(errors)
        }


        const newForSalePost = new ForSalePosts({
            title: req.body.title,
            description: req.body.description,
            name: req.body.postedby,
            price: req.body.price,
            make: req.body.make,
            model: req.body.model,
            condition: req.body.condition,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            town: req.body.town,
            city: req.body.city,
            state: req.body.state,
            user: req.body.userid,
            category: req.body.category,
            odometer: req.body.odometer,
            subcategory: req.body.subcategory

        })

        if (fileArray.length !== 0) {
            const listoflinks = [];

            for (let i = 0; i < fileArray.length; i++) {

                const link = fileArray[i].location
                listoflinks.push(link)
            }

            for (var i = 0; i < listoflinks.length; i++) {
                newForSalePost.links.push(listoflinks[i])
            }
        }



        newForSalePost.save().then(post => {

            AllPosts.updateOne({ user: post.user },
                {
                    $push: {
                        posts: {
                            postid: post._id,
                            title: post.title,
                            category: post.category,
                            subcategory: post.subcategory,
                        }
                    }
                }, (err) =>
                res.json(post))
        }).catch(err => console.log(err))
    })
})

router.post('/housing', passport.authenticate('jwt', { session: false }), upload.array('image', 6), (req, res) => {

    const { errors, isValid } = validateData(req.body)

    if (!isValid) {
        for (let i = 0; i < req.files.length; i++) {
            s3.deleteObjects({
                Bucket: 'lodos',
                Delete: {
                    Objects: [{
                        Key: req.files[i].key
                    }]
                }

            }, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            })
        }
        console.log(errors)
        return res.status(400).json(errors)
    }


    const newHousingPost = new HousingPost({
        title: req.body.title,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        often: req.body.often,
        description: req.body.description,
        user: req.body.userid,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        price: req.body.price,
        category: req.body.category,
        subcategory: req.body.subcategory,
        name: req.body.postedby,

    })
    const listoflinks = [];
    if (req.files.length !== 0) {
        for (let i = 0; i < req.files.length; i++) {
            const link = req.files[i].location
            listoflinks.push(link)
        }
        for (var i = 0; i < listoflinks.length; i++) {
            newHousingPost.links.push(listoflinks[i])
        }
    }


    newHousingPost.save().then(post => {

        AllPosts.updateOne({ user: post.user },
            {
                $push: {
                    posts: {
                        postid: post._id,
                        title: post.title,
                        category: post.category,
                        subcategory: post.subcategory,
                    }
                }
            }, (err) =>
            res.json(post))
    }).catch(err => console.log(err))

})


router.post('/jobs', passport.authenticate('jwt', { session: false }), upload.none(), (req, res) => {

    const { errors, isValid } = validateData(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }


    const newJobs = new Jobs({
        title: req.body.title,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        salary: req.body.salary,
        description: req.body.description,
        user: req.body.userid,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        company: req.body.company,
        category: req.body.category,
        subcategory: req.body.subcategory,
        name: req.body.postedby,

    })

    newJobs.save().then(post => {

        AllPosts.updateOne({ user: post.user },
            {
                $push: {
                    posts: {
                        postid: post._id,
                        title: post.title,
                        category: post.category,
                        subcategory: post.subcategory,
                    }
                }
            }, (err) =>
            res.json(post))
    }).catch(err => console.log(err))

})

router.post('/garagesale', passport.authenticate('jwt', { session: false }), upload.array('image', 6), (req, res) => {

    const { errors, isValid } = validateData(req.body)

    if (!isValid) {
        for (let i = 0; i < req.files.length; i++) {
            s3.deleteObjects({
                Bucket: 'lodos',
                Delete: {
                    Objects: [{
                        Key: req.files[i].key
                    }]
                }

            }, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            })
        }
        console.log(errors)
        return res.status(400).json(errors)
    }

    const newGarageSale = new GarageSale({
        title: req.body.title,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        when: req.body.value,
        description: req.body.description,
        user: req.body.userid,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        category: req.body.category,
        name: req.body.postedby,

    })

    const listoflinks = [];
    if (req.files.length !== 0) {
        for (let i = 0; i < req.files.length; i++) {
            const link = req.files[i].location
            listoflinks.push(link)
        }
        for (var i = 0; i < listoflinks.length; i++) {
            newGarageSale.links.push(listoflinks[i])
        }
    }

    newGarageSale.save().then(post => {

        AllPosts.updateOne({ user: post.user },
            {
                $push: {
                    posts: {
                        postid: post._id,
                        title: post.title,
                        category: post.category,
                    }
                }
            }, (err) =>
            res.json(post))
    }).catch(err => console.log(err))

})


router.post('/free', passport.authenticate('jwt', { session: false }), upload.array('image', 6), (req, res) => {

    const { errors, isValid } = validateData(req.body)

    if (!isValid) {
        for (let i = 0; i < req.files.length; i++) {
            s3.deleteObjects({
                Bucket: 'lodos',
                Delete: {
                    Objects: [{
                        Key: req.files[i].key
                    }]
                }

            }, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            })
        }
        console.log(errors)
        return res.status(400).json(errors)
    }

    const newFree = new Free({
        title: req.body.title,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        description: req.body.description,
        user: req.body.userid,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        category: req.body.category,
        name: req.body.postedby,

    })

    const listoflinks = [];
    if (req.files.length !== 0) {
        for (let i = 0; i < req.files.length; i++) {
            const link = req.files[i].location
            listoflinks.push(link)
        }
        for (var i = 0; i < listoflinks.length; i++) {
            newFree.links.push(listoflinks[i])
        }
    }

    newFree.save().then(post => {

        AllPosts.updateOne({ user: post.user },
            {
                $push: {
                    posts: {
                        postid: post._id,
                        title: post.title,
                        category: post.category,
                    }
                }
            }, (err) =>
            res.json(post))
    }).catch(err => console.log(err))

})

router.post('/classes', passport.authenticate('jwt', { session: false }), upload.array('image', 6), (req, res) => {

    const { errors, isValid } = validateData(req.body)

    if (!isValid) {
        for (let i = 0; i < req.files.length; i++) {
            s3.deleteObjects({
                Bucket: 'lodos',
                Delete: {
                    Objects: [{
                        Key: req.files[i].key
                    }]
                }

            }, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            })
        }
        console.log(errors)
        return res.status(400).json(errors)
    }

    const newClasses = new Classes({
        title: req.body.title,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        description: req.body.description,
        user: req.body.userid,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        category: req.body.category,
        name: req.body.postedby,

    })

    const listoflinks = [];
    if (req.files.length !== 0) {
        for (let i = 0; i < req.files.length; i++) {
            const link = req.files[i].location
            listoflinks.push(link)
        }
        for (var i = 0; i < listoflinks.length; i++) {
            newClasses.links.push(listoflinks[i])
        }
    }

    newClasses.save().then(post => {

        AllPosts.updateOne({ user: post.user },
            {
                $push: {
                    posts: {
                        postid: post._id,
                        title: post.title,
                        category: post.category,
                    }
                }
            }, (err) =>
            res.json(post))
    }).catch(err => console.log(err))

})

router.post('/lostandfound', passport.authenticate('jwt', { session: false }), upload.array('image', 6), (req, res) => {

    const { errors, isValid } = validateData(req.body)

    if (!isValid) {
        for (let i = 0; i < req.files.length; i++) {
            s3.deleteObjects({
                Bucket: 'lodos',
                Delete: {
                    Objects: [{
                        Key: req.files[i].key
                    }]
                }

            }, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            })
        }
        console.log(errors)
        return res.status(400).json(errors)
    }

    const newLostandFound = new LostAndFound({
        title: req.body.title,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        description: req.body.description,
        user: req.body.userid,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        category: req.body.category,
        name: req.body.postedby,

    })

    const listoflinks = [];
    if (req.files.length !== 0) {
        for (let i = 0; i < req.files.length; i++) {
            const link = req.files[i].location
            listoflinks.push(link)
        }
        for (var i = 0; i < listoflinks.length; i++) {
            newLostandFound.links.push(listoflinks[i])
        }
    }

    newLostandFound.save().then(post => {

        AllPosts.updateOne({ user: post.user },
            {
                $push: {
                    posts: {
                        postid: post._id,
                        title: post.title,
                        category: post.category,
                    }
                }
            }, (err) =>
            res.json(post))
    }).catch(err => console.log(err))

})

router.post('/volunteers', passport.authenticate('jwt', { session: false }), upload.array('image', 6), (req, res) => {

    const { errors, isValid } = validateData(req.body)

    if (!isValid) {
        for (let i = 0; i < req.files.length; i++) {
            s3.deleteObjects({
                Bucket: 'lodos',
                Delete: {
                    Objects: [{
                        Key: req.files[i].key
                    }]
                }

            }, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            })
        }
        console.log(errors)
        return res.status(400).json(errors)
    }

    const newVolunteers = new Volunteers({
        title: req.body.title,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        description: req.body.description,
        user: req.body.userid,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        category: req.body.category,
        name: req.body.postedby,

    })

    const listoflinks = [];
    if (req.files.length !== 0) {
        for (let i = 0; i < req.files.length; i++) {
            const link = req.files[i].location
            listoflinks.push(link)
        }
        for (var i = 0; i < listoflinks.length; i++) {
            newVolunteers.links.push(listoflinks[i])
        }
    }

    newVolunteers.save().then(post => {

        AllPosts.updateOne({ user: post.user },
            {
                $push: {
                    posts: {
                        postid: post._id,
                        title: post.title,
                        category: post.category,
                    }
                }
            }, (err) =>
            res.json(post))
    }).catch(err => console.log(err))

})
router.post('/events', passport.authenticate('jwt', { session: false }), upload.array('image', 6), (req, res) => {

    const { errors, isValid } = validateData(req.body)

    if (!isValid) {
        for (let i = 0; i < req.files.length; i++) {
            s3.deleteObjects({
                Bucket: 'lodos',
                Delete: {
                    Objects: [{
                        Key: req.files[i].key
                    }]
                }

            }, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            })
        }
        console.log(errors)
        return res.status(400).json(errors)
    }

    const newEvents = new Events({
        title: req.body.title,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        description: req.body.description,
        user: req.body.userid,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        category: req.body.category,
        name: req.body.postedby,

    })

    const listoflinks = [];
    if (req.files.length !== 0) {
        for (let i = 0; i < req.files.length; i++) {
            const link = req.files[i].location
            listoflinks.push(link)
        }
        for (var i = 0; i < listoflinks.length; i++) {
            newEvents.links.push(listoflinks[i])
        }
    }

    newEvents.save().then(post => {

        AllPosts.updateOne({ user: post.user },
            {
                $push: {
                    posts: {
                        postid: post._id,
                        title: post.title,
                        category: post.category,

                    }
                }
            }, (err) =>
            res.json(post))
    }).catch(err => console.log(err))

})


router.post('/services', passport.authenticate('jwt', { session: false }), upload.array('image', 6), (req, res) => {

    const { errors, isValid } = validateData(req.body)

    if (!isValid) {
        for (let i = 0; i < req.files.length; i++) {
            s3.deleteObjects({
                Bucket: 'lodos',
                Delete: {
                    Objects: [{
                        Key: req.files[i].key
                    }]
                }

            }, function (err, data) {
                if (err) console.log(err);
                else console.log(data);
            })
        }
        console.log(errors)
        return res.status(400).json(errors)
    }


    const newServices = new Services({
        title: req.body.title,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        description: req.body.description,
        user: req.body.userid,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        category: req.body.category,
        subcategory: req.body.subcategory,
        name: req.body.postedby,

    })
    const listoflinks = [];
    if (req.files.length !== 0) {
        for (let i = 0; i < req.files.length; i++) {
            const link = req.files[i].location
            listoflinks.push(link)
        }
        for (var i = 0; i < listoflinks.length; i++) {
            newServices.links.push(listoflinks[i])
        }
    }


    newServices.save().then(post => {

        AllPosts.updateOne({ user: post.user },
            {
                $push: {
                    posts: {
                        postid: post._id,
                        title: post.title,
                        category: post.category,
                        subcategory: post.subcategory,
                    }
                }
            }, (err) =>
            res.json(post))
    }).catch(err => console.log(err))

})

module.exports = router


