const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.')
            }
        },
        default: 0
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "Password must be more than 6 Characters."],
        maxlength: [12, "Password must be less than 12 Characters."],
        validate(value) {
            if (value === 'password') {
                throw new Error('Password cannot be password.')
            }
        }
    }
})

//must use a standard function for this
//binding plays an important part
userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        //will be true when user is created and on update
        user.password = await bcrypt.hash(user.password, 8)
    }

    next() //next must be called to end the function
})

const User = mongoose.model('User', userSchema)

module.exports = User