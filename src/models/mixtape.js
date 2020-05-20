const mongoose = require('mongoose')
const validator = require('validator')

const Mixtape = mongoose.model('Mixtape', {
    title: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    backgroundColor: {
        type: String
    },
    private: {
        type: Boolean
    },
    collaborative: {
        type: Boolean
    }
})


module.exports = User