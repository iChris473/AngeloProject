
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const TokenSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true
    },
    token: {
        type: String,
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model("Tokens", TokenSchema)