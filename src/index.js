const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Mixtape = require('./models/mixtape')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
//auto parse req to json


//on /users post will create a new Mixtape
app.post('/users', (req, res) => {

    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    })
    .catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404)
            //user not found
        }

        res.send(user)
        //status will be 200
    }).catch((e)=> {
        //internal server error
            res.status(500).send()
    })

})

//on /mixtapes post will create a new Mixtape
app.post('/mixtapes', (req, res) => {
    const mixtape = new Mixtape(req.body)
    mixtape.save().then(() => {
        res.status(201).send(mixtape)
    })
        .catch((error) => {
            res.status(400).send(error)
        })
})


app.get('/mixtapes', (req, res) => {
    Mixtape.find({}).then((mixtapes) => {
        res.status(200).send(mixtapes)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/mixtapes/:id', (req, res) => {
    const _id = req.params.id

    Mixtape.findById(_id).then((mixtape) => {
        if (!mixtape) {
            return res.status(404)
            //user not found
        }

        res.send(mixtape)
        //status will be 200
    }).catch((e) => {
        //internal server error
        res.status(500).send()
    })

})


app.listen(port, () => {
    console.log("Server is up on port " + port)
})

