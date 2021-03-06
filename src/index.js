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
