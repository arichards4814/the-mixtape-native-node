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

    //     db.collection('users').updateOne({ _id: new ObjectId('5ec06dfb6b27d45924bfa5a6')},
    //     {
    //         $inc: {
    //             age: 1
    //         }
    //     }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

        // db.collection('tasks').updateMany({ completed: false} ,
        // {
        //     $set: {
        //         completed: true
        //     }
        // }).then(result => console.log(result))
        //     .catch((error) => { console.log(error)})

        // db.collection('tasks').deleteOne({ _id: ObjectId("5ec0726c2dff9f5a18010959")})
        //     .then(response => console.log(response))
        //         .catch(error => console.log(error))

        db.collection('tasks').deleteMany({ age: 27 })
            .then(response => console.log(response))
            .catch(error => console.log(error))   


// const me = new User({ username: "Billy123", email: "mike@com.com", password: "password"})
// me.save()
//     .then((resp) => console.log(me))
//         .catch((error) => console.log(error))


// const mt = new Mixtape({title: "The Lit", description: "test", color: "red", 
// backgroundColor: "blue", private: false, collaborative: false})
// mt.save()
//     .then((resp) => console.log(mt))
//         .catch((error) => console.log(error))

            
            
        //updateOne
        //updateMany
        //deleteOne
        //deleteMany
        //find
        //findOne

})