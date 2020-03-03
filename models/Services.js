const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ServicesSchema = new Schema({
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
    name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Services = mongoose.model('servicesModel', ServicesSchema);