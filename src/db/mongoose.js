const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/the-mixtape-api', { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    username: {
        type: String
    },
    age: {
        type: Number
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

// const me = new User({username: "drewski", age: 12})
// me.save()
//     .then((resp) => console.log(me))
//         .catch((error) => console.log(error))


// const mt = new Mixtape({title: "The Lit", description: "test", color: "red", 
// backgroundColor: "blue", private: false, collaborative: false})
// mt.save()
//     .then((resp) => console.log(mt))
//         .catch((error) => console.log(error))
