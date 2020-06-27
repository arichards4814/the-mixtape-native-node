const mongoose = require('mongoose')
const validator = require('validator')

const Mixtape = mongoose.model('Mixtape', {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: [260, "Cannot have more than 260 characters."],
        trim: true
    },
    color: {
        type: String
    },
    backgroundColor: {
        type: String
    },
    private: {
        type: Boolean,
        default: false
    },
    collaborative: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})


module.exports = Mixtape