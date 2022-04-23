
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    referrer: {
        type: String,
    },
    accountName: {type: String},
    accountNumber: {type: String},
    bankName: {type: String},
    accountType: {type: String},
    resetPasswordToken: String,
    validated: {
        type: Boolean,
        default: false
    },
    number:{
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    verifiedDate:{
        type: Date,
    },
    package:{
        type: String,
    },
    withdraw:{
        type: Boolean,
        default: false
    }

}, {timestamps: true})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, process.env.JWTSECRET, {expiresIn: '9999y'})
}

UserSchema.methods.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    return resetToken
}

module.exports = mongoose.model("Users", UserSchema)