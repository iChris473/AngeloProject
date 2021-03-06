
const User = require("../models/User")
const Token = require("../models/Token")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const sendMail = require("../middleware/sendMail")
const Coupon = require("../models/Coupon")

exports.createUser = async (req, res) => {
    const newUser = new User(req.body)
    try {
        const oldEmail = await User.findOne({email: req.body.email})

        if(oldEmail) return res.status(401).json("A user is registered with this email")

        const oldUsername = await User.findOne({username: req.body.username})

        if(oldUsername) return res.status(401).json("A user is registered with this Username")

         await newUser.save();

        const token = await new Token({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save()

        const url = `https://www.naircity.com/api/validate?token=${token.token}&id=${newUser._id}`

        const message = `
        <h1>Complete the process of becoming a citizen of NairaCity</h1>
        <p>Please click the link below to confirm your email </p>
        <a href=${url} clicktracking=off>${url}</a>
        `
        await sendMail(newUser.email, "Verify Email", message)

        return res.status(201).json("Check your Inbox or spam to verify your Email")
        // return res.redirect("/checkemail")

    } catch (error) {
        res.status(400).json("An account has been registered with this email")
    }
}

// Confirm Email
exports.confirmEmail = async (req, res) => {
    const {id, token} = req.query;
    try {
       
        const thisUser = await User.findById(id)

        if(!thisUser) return res.status(400).json("A user is not registered via this emnail")

        const thisToken = await Token.findOne({
            userId: thisUser._id,
            token
        })
        
        if(!thisToken) return res.status(400).json("Invalid Link");

        await User.findOneAndUpdate(
            {
                _id: thisUser._id
            }, {
                $set: {
                    validated: true
                }
            },{new: true}
        );

        await Token.findByIdAndDelete(thisToken._id)
        
        return res.redirect("/confirmed")

    } catch (error) {
        return res.status(404).json("Oops An error Occured")
    }
}

// Login User
exports.loginUser = async  (req, res) => {
    try {
        // finds user by email
        const user = await User.findOne({ email: req.body.email })
        if(!user){
            return res.status(401).json("An account is not registered with this email")
        }
        if (!user.validated) {

          const validateToken = await Token.findOne({ userId: user._id });
          if (!validateToken) {
            const token = await new Token({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
            }).save();

            const url = `https://www.naircity.com/api/validate?token=${token.token}&id=${user._id}`;

            const message = `
            <h1>Complete the process of becoming a citizen of NairaCity</h1>
            <p>Please click the link below to confirm your email </p>
            <a href=${url} clicktracking=off>${url}</a>
            `;
            await sendMail(user.email, "Verify Email", message);
          }
          return res
            .status(200)
            .json("Check your Inbox or spam to verify your Email");
        }

        // compares password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(404).json("Incorrect password")

        // sends JSON_WEB_TOKEN
        const token = user.getSignedToken()
        
        // // hides password from client
        const { password, coupon, ...others} = user._doc

        return res.status(200).json({...others, token})
        

    } catch (err) {
        return res.status(404).json("An error occured")
    }
}

exports.updateUser = async(req, res) => {
  
    try {
        const oldUser = await User.findById(req.params.id)

        // check email
        if(req.body.email){
            const registered = await User.findOne({email: req.body.email})
            if(registered) return res.status(401).json("An Account is registered with this email")
        }
        if (req.body.password) {
          const { p } = req.query;
          // checks password
          const validPassword = await bcrypt.compare(p, oldUser.password);

          if (!validPassword) return res.status(401).json("InCorrect Password");

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          req.body.password = hashedPassword;

        }
        
        const user = await User.findOneAndUpdate(
            {
                _id: req.params.id
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

// get a user
exports.getOneUser = async (req, res) => {
    try {
       const user = await User.findById(req.query.id)
    //    const user = await User.find({email:req.query.email})
       const {password, createdAt, updatedAt, ...others} = user._doc
        res.status(200).json(others)
    } catch (err) {
       res.status(404).json(err) 
    }
}

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
       const users = await User.find({})
        res.status(200).json(users)
    } catch (err) {
       res.status(404).json(err) 
    }
}

// Get Placed Withddrawals
exports.getPlacedWithdrawals = async (req, res) => {
    try {
       const users = await User.find({
              withdraw: {$gt: 0} // $gt means greater than
       })
        res.status(200).json(users)
    } catch (err) {
       res.status(404).json(err) 
    }
}

// Forgot Password

exports.forgotPassword = async (req, res) => {

    const {email} = req.body

    try {
        const user = await User.findOne({email})

        if(!user) return res.status(400).json(err)

        const resetToken = user.getResetPasswordToken()

        await user.save();

        const resetUrl = `https://www.naircity.com/updatepass?resettoken=${resetToken}`

        const message = `
            <h1>You have requested for a password reset</h1>
            <p>Please click the link below to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await sendMail(
                user.email,
                'Password reset request',
                message
            )

            res.status(200).json('Email Sent')

        } catch (error) {

            user.resetPasswordToken = undefined;
            await user.save()

            res.status(500).json('Email could not be sent')
        }

    } catch (err) {
        res.status(500).json('An error occured sening the email')
    }
}

// Reset Password
exports.resetPassword = async (req, res) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.query.resettoken).digest('hex')

    try {
        const user = await User.findOne({
            resetPasswordToken,
        })

        if(!user) return res.status(400).json('Invalid Reset Token')

        user.password = req.body.password;
        user.resetPasswordToken = undefined;

        await user.save()

        res.status(200).json("Password changed")

    } catch (error) {
        res.status(400).json('An error occured while resetting the password')
    }
}

exports.verifyAccount = async (req, res) => {

    const {coupon, email} = req.body

    try {
        
        const user = await User.findOne({email})

        const verifyCoupon = await Coupon.findOne({code: coupon})

        if(!verifyCoupon) return res.status(401).json("Provide a valid coupon code")
        
        await User.updateOne(
            {_id:user._id},
            {
                $set: {
                    verified: true,
                    verifiedDate: new Date(),
                    package: verifyCoupon.type
                }
            }
        )

        await Coupon.deleteOne({code: coupon})

        res.status(200).json("Your are now a verified citizen of nairacity")

    } catch (error) {
        res.status(400).json('An error occured while trying to verify your account')
    }
}

exports.upgradeAccount = async (req, res) => {

    const {coupon, email} = req.body

    try {
        
        const user = await User.findOne({email})

        const verifyCoupon = await Coupon.findOne({code: coupon})

        if(!verifyCoupon) return res.status(401).json("Provide a valid coupon code")

        
            // #5K PACKAGE
            if(verifyCoupon.type.toLowerCase() == "special"){

                await User.updateOne(
                    {_id:user._id},
                    {
                        $set: {
                            lastMinedAmout: ( user.lastMinedAmout + 500 ),
                            lastMinedDate: new Date().getTime(),
                            package: verifyCoupon.type
                        }
                    }
                )    
    
                await Coupon.deleteOne({code: coupon})

                return res.status(200).json("You have successfully upgraded your account")
            }
    
            // #10K PACKAGE
    
            if(verifyCoupon.type.toLowerCase() == "premium"){
    
                await User.updateOne(
                    {_id:user._id},
                    {
                        $set: {
                            lastMinedAmout: ( user.lastMinedAmout + 1000 ),
                            lastMinedDate: new Date().getTime(),
                            package: verifyCoupon.type
                        } 
                    }
                )    
    
                await Coupon.deleteOne({code: coupon})

                return res.status(200).json("You have successfully upgraded your account")
    
            }
    
    
            // #20K PACKAGE
    
            if(verifyCoupon.type.toLowerCase() == "pro"){
    
                await User.updateOne(
                    {_id:user._id},
                    {
                        $set: {
                            lastMinedAmout: ( user.lastMinedAmout + 2000 ),
                            lastMinedDate: new Date().getTime(),
                            package: verifyCoupon.type
                        } 
                    }
                )    
    

                await Coupon.deleteOne({code: coupon})

                return res.status(200).json("You have successfully upgraded your account")
    
            }
    
    
            // #50K PACKAGE
    
            if(verifyCoupon.type.toLowerCase() == "lite"){
    
                await User.updateOne(
                    {_id:user._id},
                    {
                        $set: {
                            lastMinedAmout: ( user.lastMinedAmout + 5000 ),
                            lastMinedDate: new Date().getTime(),
                            package: verifyCoupon.type
                        } 
                    }
                )    
    

                await Coupon.deleteOne({code: coupon})

                return res.status(200).json("You have successfully upgraded your account")
    
            }
    
    
            // #100K PACKAGE
    
            if(verifyCoupon.type.toLowerCase() == "xlite"){
    
                await User.updateOne(
                    {_id:user._id},
                    {
                        $set: {
                            lastMinedAmout: ( user.lastMinedAmout + 10000 ),
                            lastMinedDate: new Date().getTime(),
                            package: verifyCoupon.type
                        } 
                    }
                )    

                await Coupon.deleteOne({code: coupon})
    
                return res.status(200).json("You have successfully upgraded your account")
    
            }
    
    
            // #2K PACKAGE
            await User.updateOne(
                {_id:user._id},
                {
                    $set: {
                        lastMinedAmout: ( user.lastMinedAmout + 200 ),
                        lastMinedDate: new Date().getTime(),
                        package: verifyCoupon.type
                    } 
                }
            )    

            await Coupon.deleteOne({code: coupon})

        return res.status(200).json("You have successfully upgraded your account")

    } catch (error) {
        res.status(400).json('An error occured while trying to upgrade your account')
    }
}

exports.getReferredUsers = async (req, res) => { 

    try {

        const referred = await User.find({referrer: req.query.username})
        const verifiedReferred = await User.find({referrer: req.query.username, verified: true})
        res.status(200).json({
            referred,
            verifiedReferred: verifiedReferred.length
        })
        
    } catch (error) {
        res.status(400).json('An error occured while trying to verify your account')
    }
}

exports.generateCoupon = async (req, res) => {

    const code = crypto.randomBytes(5).toString('hex')

    try {
        
        const newCoupon = new Coupon({
            code,
            type: req.query.type
        })

        await newCoupon.save()

        res.status(200).json(newCoupon)        

    } catch (error) {
        res.status(400).json('An error occured while trying to verify your account')
    }
}

exports.getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({})
         res.status(200).json(coupons)
     } catch (err) {
        res.status(404).json(err) 
     }
}

exports.getMinedAccount = async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id)

        if( ( (new Date().getTime() - user.lastMinedDate) / (1000 * 60 * 60 * 24) ) < 1 ){ 
            return res.status(400).json("You can only mine once an hour")
        }

        // let totalMined;
        
        // let totalAmount = Math.abs(
        //     Math.floor( ( new Date().getTime() - user.verifiedDate.getTime() )  / (1000 * 3600 * 24) )
        // )

        // #5K PACKAGE

        if(user.package.toLowerCase() == "special"){

            // totalMined = Math.abs(
            //     Math.floor( ( new Date().getTime() - user.verifiedDate.getTime() )  / (1000 * 3600 * 24) )
            // ) * 600

            await User.updateOne(
                {_id:user._id},
                {
                    $set: {
                        lastMinedAmout: ( user.lastMinedAmout + 500 ),
                        lastMinedDate: new Date().getTime()
                    }
                }
            )    

            return res.status(200).json("Mining engine initiated")
        }

        // #10K PACKAGE

        if(user.package.toLowerCase() == "premium"){

            await User.updateOne(
                {_id:user._id},
                {
                    $set: {
                        lastMinedAmout: ( user.lastMinedAmout + 1000 ),
                        lastMinedDate: new Date().getTime()
                    } 
                }
            )    

            return res.status(200).json("Mining engine initiated")

        }


        // #20K PACKAGE

        if(user.package.toLowerCase() == "pro"){

            await User.updateOne(
                {_id:user._id},
                {
                    $set: {
                        lastMinedAmout: ( user.lastMinedAmout + 2000 ),
                        lastMinedDate: new Date().getTime()
                    } 
                }
            )    

            return res.status(200).json("Mining engine initiated")

        }


        // #50K PACKAGE

        if(user.package.toLowerCase() == "lite"){

            await User.updateOne(
                {_id:user._id},
                {
                    $set: {
                        lastMinedAmout: ( user.lastMinedAmout + 5000 ),
                        lastMinedDate: new Date().getTime()
                    } 
                }
            )    

            return res.status(200).json("Mining engine initiated")

        }


        // #100K PACKAGE

        if(user.package.toLowerCase() == "xlite"){

            await User.updateOne(
                {_id:user._id},
                {
                    $set: {
                        lastMinedAmout: ( user.lastMinedAmout + 10000 ),
                        lastMinedDate: new Date().getTime()
                    } 
                }
            )    

            return res.status(200).json("Mining engine initiated")

        }


        // #2K PACKAGE
        await User.updateOne(
            {_id:user._id},
            {
                $set: {
                    lastMinedAmout: ( user.lastMinedAmout + 200 ),
                    lastMinedDate: new Date().getTime()
                } 
            }
        )    

        return res.status(200).json("Mining engine initiated")

    } catch (error) {
        return res.status(400).json('An error occured')
    }
}