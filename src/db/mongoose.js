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

const me = new User({username: "drewski", age: 12})
me.save()
    .then((resp) => console.log(me))
        .catch((error) => console.log(error))


