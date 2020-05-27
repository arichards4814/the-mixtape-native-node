const express = require('express')
require('./db/mongoose.js')
const User = require('./models/user')
const Mixtape = require('./models/mixtape')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
//auto parse req to json


//on /users post will create a new user
app.post('/users', async (req, res) => {

    try {
        const user = await User(req.body)
        if (!user) {
            return res.status(404).send()
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404)
        }
        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
})

//on /mixtapes post will create a new Mixtape
app.post('/mixtapes', async (req, res) => {
    
    try{
        const mixtape = await Mixtape(req.body)
        if(!mixtape){
            return res.status(404).send()
        }
        res.send(mixtape)
    } catch(e){
        res.status(400).send()
    }
})


app.get('/mixtapes', async (req, res) => {
    try{
        const mixtapes = await Mixtape.find({})
        
        res.send(mixtapes)
    } catch(e){
        res.status(500).send()
    }
})

app.get('/mixtapes/:id', async (req, res) => {
    const _id = req.params.id 

    try{
        const mixtape = await Mixtape.findById(_id)
        res.send(mixtape)
    } catch (e){
        res.status(500).send()
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates.'})
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


app.listen(port, () => {
    console.log("Server is up on port " + port)
})

