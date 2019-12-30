const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const validateRegisterInput = require('../validateForms/register')
const validateLoginInput = require('../validateForms/login')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')


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
                    city: req.body.city
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })


            }
        })


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

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            city: user.city,
                            email: user.email,
                            date: user.date
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