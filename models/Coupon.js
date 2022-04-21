

const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const couponSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model("Coupons", couponSchema)