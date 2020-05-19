// CRUD with mongoDB

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'the-mixtape'

MongoClient.connect(connectionURL, { useUnifiedTopology: true },
    (error, client) => {
        if(error){
           return console.log('Unable to connect to database')
        }

        const db = client.db(databaseName)

        // db.collection('users').findOne({ name: 'Andrew', age: '29' }, (error, user) => {
        //     if(error){
        //         return console.log('Unable to fetch')
        //     }

        //     console.log(user)
        // })

        // db.collection('users').find({ age: '29' }).toArray((error, users) => {
        //     if (error) {
        //         return console.log('Unable to fetch')
        //     }
        //     console.log(users)
        // })

        // db.collection('users').find({ age: '29' }).count((error, count) => {
        //     if (error) {
        //         return console.log('Unable to fetch')
        //     }
        //     console.log(count)
        // })

        db.collection('users').updateOne({ _id: new ObjectId('5ec06dfb6b27d45924bfa5a6')},
        {
            $set: {
                name: 'Mike'
            }
        }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})