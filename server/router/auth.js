const express = require('express')

const router = express.Router()

require('../db/conn')

const User = require("../model/userSchema")

router.get('/', (req, res)=> {
    res.send('Hello from the Router Server')
})

router.post('/register', (req, res)=> {
    const {name, email, phone, work, password, cpassword} = req.body
    
    if(!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({
            error: "Please fill the field properly"
        })
    }

    User.findOne({
        email: email
    }).then((userExist)=> {
        if(userExist) {
            return res.status(422).json({
                error: "Email already exist"
            })
        }

        const user = new User({
            name, email, phone, work, password, cpassword
        })

        user.save().then(()=> {
            res.status(201).json({
                message: "User saved"
            })
        }).catch((err)=> res.status(500).json({
            error: "Failed to register"
        }))

    }).catch(err => {console.log(err)})
})

module.exports = router;