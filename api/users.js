const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const validateRegisterInput = require('../validateForms/register')
const validateLoginInput = require('../validateForms/login')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const AllPosts = require('../models/AllPosts')
const Verify = require('../models/Verify')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const sgMail = require('@sendgrid/mail');


router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' })
            }
            else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {

                                const allposts = new AllPosts({
                                    user: user._id
                                })

                                allposts.save()
                                    .then(() => {


                                        var code = ''

                                        for (let i = 0; i < 16; i++) {
                                            var random = Math.floor(Math.random() * 10)
                                            code = code + random

                                        }


                                        const verify = new Verify({
                                            user: user._id,
                                            verificationCode: code
                                        })

                                        verify.save()
                                            .then((newVerify) => {

                                                sgMail.setApiKey(keys.sendGridAPI)

                                                const link = `http://localhost:3000/verifyaccount/${newVerify.verificationCode}`

                                                const msg = {
                                                    to: user.email,
                                                    from: 'ertemishakk@gmail.com',
                                                    subject: `Welcome to Lodos. Please verify your email.`,
                                                    // text: "You're almost there.Click the link below to confirm your email and finish creating your Lodos account. " + link
                                                    templateId: 'd-4936e16b55f9459fb7275af684c63cd5',
                                                    dynamic_template_data: {
                                                        name: user.name,
                                                        verifyLink: link
                                                    }
                                                }

                                                sgMail.send(msg);
                                                res.json({ success: 'Registration successfull' })

                                            })
                                            .catch(err => console.log(err))
                                    }).catch(err => console.log(err))



                            })
                            .catch(err => console.log(err))
                    })
                })



            }
        })


})

router.post('/verifyaccount/:verificationCode', (req, res) => {

    Verify.findOne({ verificationCode: req.params.verificationCode })
        .then(verify => {
            if (verify) {
                User.updateOne({ _id: ObjectId(verify.user) }, { isActive: true })
                    .then(() => {
                        res.json(`Your email has been verified`)
                    }).then(
                        verify.remove()
                    )
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))

})


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { isValid, errors } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(400).json(errors)
            }

            if (!user.isActive) {
                errors.verify = 'Please verify your account'
                return res.status(400).json(errors)
            }


            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            date: user.date,
                            isAdmin: user.isAdmin
                        }

                        jwt.sign(payload, keys.secret, { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,

                                })
                            })
                    }

                    else {
                        errors.password = 'Password Incorrect'
                        return res.status(400).json(errors)
                    }
                })



        })
})


module.exports = router;