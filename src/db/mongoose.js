const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/the-mixtape-api', { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be a positive number.')
            }
        },
        default: 0
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if (!validator.isEmail(value)){
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
        validate(value){
            if(value === 'password'){
                throw new Error('Password cannot be password.')
            }
        }
    }
})

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

const me = new User({ username: "Billy123", email: "mike@com.com", password: "password"})
me.save()
    .then((resp) => console.log(me))
        .catch((error) => console.log(error))


// const mt = new Mixtape({title: "The Lit", description: "test", color: "red", 
// backgroundColor: "blue", private: false, collaborative: false})
// mt.save()
//     .then((resp) => console.log(mt))
//         .catch((error) => console.log(error))
