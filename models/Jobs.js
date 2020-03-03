const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JobsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
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
    salary: {
        type: Number,
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
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Jobs = mongoose.model('jobsModel', JobsSchema);