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
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    }
    ,
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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
    often: {
        type: String,
        required: true
    },
    links: [{ type: String }],
    name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = HousingPost = mongoose.model('housingModel', PostSchema);