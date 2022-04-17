const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: {

    }
})

userSchema.pre('save', async function(next) {
    console.log("function working")
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.password, 12)
    }
    next();
})

//we are generating jwt token

userSchema.method.generateAuthToken = async function() {
    try {
        let token = jwt.sign({
            _id: this._id
        }, process.env.SECRET_KEY)
    } catch (error) {
        console.log(error)
        
    }
}


const User = mongoose.model("USER", userSchema)

module.exports = User