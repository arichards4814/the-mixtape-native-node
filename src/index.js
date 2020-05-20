const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Mixtape = require('./models/mixtape')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
//auto parse req to json

app.post('/users', (req, res) => {

    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    })
    .catch((error) => {
        res.status(400).send(error)
    })
})


app.post('/mixtapes', (req, res) => {
    const mixtape = new Mixtape(req.body)
    mixtape.save().then(() => {
        res.send(mixtape)
    })
        .catch((error) => {
            res.status(400).send(error)
        })
})











app.listen(port, () => {
    console.log("Server is up on port " + port)
})

