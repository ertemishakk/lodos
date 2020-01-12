const express = require('express');
const router = express.Router()
const HousingPost = require('../models/HousingPosts')
const ForSalePosts = require('../models/ForSalePosts')
const AllPosts = require('../models/AllPosts')
const validateForSalePosts = require('../validateForms/validateforsaleposts')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const keys = require('../config/keys')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

aws.config.update({
    secretAccessKey: keys.secretAccessKey,
    accessKeyId: keys.accessKeyId,
    region: 'us-east-2'
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
        key: function (req, res, cb) {
            cb(null, Date.now().toString())
        }
    })
})



// const multiple = upload.array('image', 4)

// router.post('/image-upload', (req, res) => {

//     multiple(req, res, function (err) {

//         const fileArray = req.files;


//         const listoflinks = [];

//         for (let i = 0; i < fileArray.length; i++) {
//             const link = fileArray[i].location
//             listoflinks.push(link)
//         }


//         return res.json({ 'imageUrls': listoflinks })
//     })


// })




router.post('/housing', (req, res) => {
    // const user = User.findById(req.body.postedby)

    // console.log(req.body)

    const newHousingPost = new HousingPost({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        name: req.body.postedby,
        userid: req.body.userid,
        email: req.body.email,
        phonenumber: req.body.email,
        postcode: req.body.postcode,
        language: req.body.language,
        price: req.body.price,
        user: req.body.userid,
        category: req.body.category

    })

    newHousingPost.save()
        .then(post => {
            // console.log(post.userid)
            AllPosts.updateOne({ user: post.userid },
                { $push: { posts: { postid: post._id, title: post.title, category: post.category } } }, (err) =>
                res.json(post))



            //     AllPosts.updateOne({ _id: post.userid }, { $push: { housingposts: post._id } }, (err) =>
            //         res.json(post))
            //     res.json(post)
            // })

        }).catch(err => console.log('housing api bug'))

})


router.post('/forsale', (req, res) => {

    const multiple = upload.array('image', 6)
    console.log(req.body)
    multiple(req, res, function (err) {

        console.log(req.body)
        const { errors, isValid } = validateForSalePosts(req.body)
        const fileArray = req.files;

        if (err) {
            console.log(err)
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
        console.log(req.body)

        const newForSalePost = new ForSalePosts({
            title: req.body.title,
            description: req.body.description,
            name: req.body.postedby,
            price: req.body.price,
            make: req.body.make,
            model: req.body.model,
            language: req.body.language,
            condition: req.body.condition,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            town: req.body.town,
            city: req.body.city,
            state: req.body.state,
            user: req.body.userid,
            category: req.body.category,
            odometer: req.body.odometer

        })

        if (fileArray.length === 0) {
            errors.image = 'No image is attached'
            return res.status(400).json(errors)
        }

        const listoflinks = [];

        for (let i = 0; i < fileArray.length; i++) {

            const link = fileArray[i].location
            console.log(fileArray[i].key)
            listoflinks.push(link)
        }

        for (var i = 0; i < listoflinks.length; i++) {
            newForSalePost.links.push(listoflinks[i])
        }

        newForSalePost.save().then(post => {

            AllPosts.updateOne({ user: post.user },
                { $push: { posts: { postid: post._id, title: post.title, category: post.category } } }, (err) =>
                res.json(post))
        }).catch(err => console.log(err))
    })
})


// router.get('/forsaleposts/:postid', (req, res) => {
//     ForSalePosts.findOne({ _id: req.params.postid })
//         .then(post => res.json(post))
//         .catch(err => res.status(400).json({ nopostfound: `Cant fetch forsale post with id : ${req.params.postid}` }))
// })



router.get('/profileposts/:userid', (req, res) => {


    // AllPosts.findOne({ user: req.params.userid })
    // console.log(mongoose.Types.ObjectId(req.params.userid)),


    AllPosts.aggregate(
        [

            { $match: { user: ObjectId(req.params.userid) } },
            { $unwind: '$posts' },
            { $sort: { 'posts.date': -1 } }

        ]
    )
        .then(posts => {
            // console.log(posts),
            res.json(posts)
        })
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))


})


router.get('/housing', (req, res) => {
    HousingPost.find().sort({ date: -1 }).then(housingposts => res.json(housingposts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})


router.get('/forsale', (req, res) => {
    ForSalePosts.find().sort({ date: -1 }).then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})

router.get('/forsaleascending', (req, res) => {
    ForSalePosts.find().sort({ price: 1 }).then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})

router.get('/forsaledescending', (req, res) => {
    ForSalePosts.find().sort({ price: -1 }).then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'There is no posts' }))
})


module.exports = router