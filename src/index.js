const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routers/user')
const mixtapeRouter = require('./routers/mixtape')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //auto parse req to json
app.use(userRouter)
app.use(mixtapeRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', { expiresIn: '7 days'})
    console.log(token)
    jwt.verify(token, 'thisismynewcourse')
}


myFunction()