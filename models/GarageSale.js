const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GarageSaleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    links: [{ type: String }],
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
    }
    ,
    category: {
        type: String,
        required: true
    },
    when: {
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
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = GarageSale = mongoose.model('garageSaleModel', GarageSaleSchema);