const express = require('express')
const bcrypt = require('bcryptjs')

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
    } else if (password !== cpassword) {
        return res.status(422).json({
            error: "Password and confirm password are not matching"
        })
    } else if (typeof password !== "string") {
        return res.status(422).json({
            error: "type of password should be string"
        })
    } else {
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
    }

})


// login route

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    console.log(typeof password)

    if (!email || !password || typeof password !== "string") {
        return res.status(422).json({
            error: "Please fill the field properly"
        })
    }

    try {
        const userExist = await User.findOne({
            email: email
        })
        console.log(userExist?.password)




        if (!userExist) {
            return res.status(422).json({
                error: "Invalid credentials"
            })
        } else {
            const isMatched = await bcrypt.compare(password, userExist.password)
            if (isMatched) {
                return res.status(201).json({
                    message: "User logged In"
                })
            } else {
                return res.status(422).json({
                    error: "Invalid credentials"
                })
            }
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;