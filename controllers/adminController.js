
const User = require("../models/Admin")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.createUser = async (req, res) => {
    const newUser = new User(req.body)
    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(404).json("An account has been registered with this email")
    }
}

// Login User
exports.loginUser = async  (req, res) => {
    try {
        // finds user by email
        const user = await User.findOne({ email: req.body.email })
        if(!user){
            return res.status(401).json("An account is not registered with this email")
            // res.status(401).json("enter correct credentials")
        }

        // compares password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(404).json("Incorrect password")
        //  res.status(401).json("enter correct credentials")

        // sends JSON_WEB_TOKEN
        const token = user.getSignedToken()
        
        // res.status(200).json({success:true, token})
        // // hides password from client
        const {_id, email, ...others} = user._doc

        return res.status(200).json({
            id: _id,
            token,
            email
        })
        

    } catch (err) {
        return res.status(400).json(err)
    }
}

exports.updateUser = async(req, res) => {
    const {p} = req.query
    try {
        const oldUser = await User.findById(req.user.id)
        // checks password
        const validPassword = await bcrypt.compare(p, oldUser.password)
        if(!validPassword) return res.status(401).json("InCorrect Password")
        // check email
        if(req.body.email){
            const registered = await User.findOne({email: req.body.email})
            if(registered) return res.status(401).json("An Account is registered with this email")
        }
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword
        }
        const user = await User.findOneAndUpdate(
            {
                _id: req.user.id
            }, {
                $set: req.body
            },{new: true}
        );
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({_id: req.user.id})
        res.status(200).json("User Account deleted")
    } catch (error) {
        res.status(400).json(error)
    }
}