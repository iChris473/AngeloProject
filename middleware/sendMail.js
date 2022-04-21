
const nodemailer = require("nodemailer")

module.exports = async(email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: "smtp.gmail.com",
            service: "gmail",
            // port: 587,
            // secure: true,
            auth: {
                user: process.env.USEREMAIL,
                pass: process.env.USERPASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.USEREMAIL,
            to: email,
            subject,
            html:text
        })
        console.log("EMAIL SENT SUCCESSFULLY")
    } catch (error) {
        console.log("An error Occured")
        console.log(error)
    }
}