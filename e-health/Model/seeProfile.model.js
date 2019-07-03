const mongoose = require('mongoose');

const Doctorprf = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    specialist: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('seeprofiles', Doctorprf);