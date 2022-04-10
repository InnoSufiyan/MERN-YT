const express = require('express')

const router = express.Router()

require('../db/conn')

const User = require("../model/userSchema")

router.get('/', (req, res) => {
    res.send('Hello from the Router Server')
})

//registration route

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({
            error: "Please fill the field properly"
        })
    }

    try {
        const userExist = await User.findOne({
            email: email
        })

        if (userExist) {
            return res.status(422).json({
                error: "Email already exist"
            })
        }

        const user = new User({
            name, email, phone, work, password, cpassword
        })

        const userRegister = await user.save()

        if (userRegister) {
            res.status(201).json({
                message: "User saved"
            })
        } else {
            res.status(500).json({
                error: "Failed to register"
            })
        }
    } catch (err) {
        console.log(err)
    }
})


// login route

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({
            error: "Please fill the field properly"
        })
    }

    try {
        const userExist = await User.findOne({
            email: email,
            password: password

        })

        if (!userExist) {
            return res.status(422).json({
                error: "Invalid credentials"
            })
        } else {
            return res.status(201).json({
                message: "User logged In"
            })
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;