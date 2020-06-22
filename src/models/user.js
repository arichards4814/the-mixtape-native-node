const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "Password must be more than 6 Characters."],
        // maxlength: [12, "Password must be less than 12 Characters."],
        validate(value) {
            if (value === 'password') {
                throw new Error('Password cannot be password.')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function () {
    const user = this 
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//create method for instance of user
//must be normal function
userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'thisismynewcourse') // convert the objectID to a string
    
    user.tokens = user.tokens.concat({ token })
    
    user.save() // he has this as an await. but it only works for me when we're not awaiting.
    return token
}

//a static is a class method
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    console.log("User Found")
    return user
}


//must use a standard function for this
//binding plays an important part
//hash the plaintext password before saving
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