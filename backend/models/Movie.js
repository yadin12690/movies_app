const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Movie = new Schema({
    name: {
        type: String
    },
    rating: {
        type: Number
    },
    pageUrl: {
        type: String
    },
    likes: {
        type: Boolean,
        default: 'false'
    }
}, {
    collection: 'movies',
    timestamps:true
})

module.exports = mongoose.model('Movie', Movie)