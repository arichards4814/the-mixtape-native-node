const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')


//signup
router.post('/users', async (req, res) => {
    try {
        const user = await User(req.body)
        const token = await user.generateAuthToken()
        if (!user) {
            return res.status(404).send()
        }
            // await user.save()
            res.status(201).send({ user, token })
        
    } catch (e) {
        res.status(400).send(e)
    }
})

//login
router.post('/users/login', async (req, res) => {
    try{
        //custom function
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e){
        res.status(400).send()
    }   
})

//logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        //filter out the current token.
        req.user.tokens = req.user.tokens.filter((token) => {
            console.log(token)
            console.log(req.token)
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e){
        res.status(500).send()
    }
})

//logout all sessions
router.post('/users/logoutALL', auth, async (req, res) => {
    try {
        //clear sessions array
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//second argument is our authentication middleware
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404)
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'password', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates.' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        //remove the user from database
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router