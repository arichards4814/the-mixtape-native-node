const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Mixtape = require('../models/mixtape')
const User = require('../models/user')


//on /mixtapes post will create a new Mixtape
router.post('/mixtapes', auth, async (req, res) => {

    const mixtape = new Mixtape({
        ...req.body,
        owner: req.user._id
    })

    try {
        await mixtape.save()
        res.status(201).send(mixtape)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/mixtapes', async (req, res) => {
    try {
        const mixtapes = await Mixtape.find({})

        res.send(mixtapes)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/mymixtapes', auth, async (req, res) => {
    let match = {}

    if(req.query.collaborative){
        match = {
            collaborative:  req.query.collaborative === 'true'
        }
    }

    try {
        await req.user.populate({
            path: 'mixtapes',
            match
        }).execPopulate()
        res.send(req.user.mixtapes)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/mixtapes/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const mixtape = await Mixtape.findById(_id)
        res.send(mixtape)
    } catch (e) {
        res.status(500).send()
    }
})



router.patch('/mixtapes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'color', 'backgroundColor', 'private', 'collaborative']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates.' })
    }

    const _id = req.params.id
    try {
        const mixtape = await Mixtape.findOne({ _id, owner: req.user._id })

        if (!mixtape) {
            return res.status(404).send()
        }

        updates.forEach((update) => mixtape[update] = req.body[update])
        
        await mixtape.save()

        res.send(mixtape)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/mixtapes/:id', auth,  async (req, res) => {
    
    try {
        const mixtape = await Mixtape.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!mixtape) {
            return res.status(404).send()
        }
        res.send(mixtape)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router