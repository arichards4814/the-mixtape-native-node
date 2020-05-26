const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/the-mixtape-api', { 
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

//     ,
// useCreateIndex: true,
//     useFindAndModify: false