const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')

const app = express();
dotenv.config({
    path: './config.env'
})

require('./db/conn')

//linking files to make route easy

app.use(require('./router/auth'))

const port = process.env.PORT




//middleware


app.get('/about', (req, res)=> {
    res.send("running")
})

app.listen(port, ()=> {
    console.log("express running on port" + port)
})