const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routers/user')
const mixtapeRouter = require('./routers/mixtape')

const app = express()
const port = process.env.PORT || 3000

//use is for middleware
// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled.')
//     } else {
//         next()
//     }
// })

//check for incoming authentication token
// app.use((req, res, next) => {
//     res.send('App is currently in maintenance mode', 503)
// })

app.use(express.json()) //auto parse req to json
app.use(userRouter)
app.use(mixtapeRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

const pet = {
    name: 'Hal'
}

pet.toJSON = function () {
    console.log(this)
    return {}
}

console.log(JSON.stringify(pet))