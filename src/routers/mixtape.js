const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Mixtape = require('../models/mixtape')


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

router.get('/mixtapes/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const mixtape = await Mixtape.findById(_id)
        res.send(mixtape)
    } catch (e) {
        res.status(500).send()
    }
})



router.patch('/mixtapes/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'color', 'backgroundColor', 'private', 'collaborative']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates.' })
    }

    try {
        const mixtape = await Mixtape.findById(req.params.id)
        
        updates.forEach((update) => mixtape[update] = req.body[update])
        
        await mixtape.save()
        // const mixtape = await Mixtape.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!mixtape) {
            return res.status(404).send()
        }
        res.send(mixtape)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/mixtapes/:id', async (req, res) => {
    try {
        const mixtape = await Mixtape.findByIdAndDelete(req.params.id)
        if (!mixtape) {
            return res.status(404).send()
        }
        res.send(mixtape)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router