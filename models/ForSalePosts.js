const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // userid: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    make: {
        type: String,
        // required: true
    },
    model: {
        type: Number,
        // required: true
    },
    odometer: {
        type: Number,
        // required: true
    },
    condition: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    links: [{ type: String }],
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = ForSalePosts = mongoose.model('forSaleModel', PostSchema);