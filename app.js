const request = require('request')
const path = require('path')
const express = require('express')

const app = express()



app.get('/mixtapes', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    const url = `http://api.weatherstack.com/current?access_key=e035e76babcc3a49b4cbc4bcd8ddd53f&query=${req.query.search}`

    request({ url: url, json: true },
        (error, response) => {
            res.send(response)
        })
    
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})