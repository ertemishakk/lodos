const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VerificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    verificationCode: {
        type: String
    }
})

module.exports = Verify = mongoose.model('verify', VerificationSchema)