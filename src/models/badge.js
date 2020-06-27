const mongoose = require('mongoose')
const validator = require('validator')

const Badge = mongoose.model('Badge', {
    name: {
        type: String,
        required: true,
        maxlength: [20, "Cannot have more than 20 characters."],
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: [260, "Cannot have more than 260 characters."],
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Badge