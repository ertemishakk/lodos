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
    location: {
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
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = ForSalePosts = mongoose.model('forSaleModel', PostSchema);