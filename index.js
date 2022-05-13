
require('dotenv').config()
const express = require('express')
const app = express()
require("./models/db");
const cors = require("cors")

// app.enable('trust proxy')

// app.use(function(request, response, next) {

//     if (process.env.NODE_ENV != 'development' && !request.secure) {
//        return response.redirect("https://" + request.headers.host + request.url);
//     }

//     next();
// })

// serve your css as static
app.use('/public', express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const router = require("./route/routes")

app.use("/api", router)

// index route for User Domain
app.get("/", (req, res) => res.render("./pages/index"))

// Register route for User Domain
app.get("/register", (req, res) => res.render("./pages/register"))

// Login route for User Domain
app.get("/login", (req, res) => res.render("./pages/login"))

// Dashboard route for User Domain
app.get("/dashboard", (req, res) => res.render("./pages/dashboard"))

// Account route for User Domain
app.get("/account", (req, res) => res.render("./pages/account"))

// Deposit route for User Domain
app.get("/deposit", (req, res) => res.render("./pages/deposit"))

// upgrade route for User Domain
app.get("/upgrade", (req, res) => res.render("./pages/upgrade"))

// Editprofile route for User Domain
app.get("/editprofile", (req, res) => res.render("./pages/editprofile"))

// Edit Password route for User Domain
app.get("/editpassword", (req, res) => res.render("./pages/editpass"))

// Withdraw route for User Domain
app.get("/withdraw", (req, res) => res.render("./pages/withdraw"))

// Checkemail route for User Domain
app.get("/checkemail", (req, res) => res.render("./pages/checkemail"))

// Confirmed Email route for User Domain
app.get("/confirmed", (req, res) => res.render("./pages/confirmed"))

// Reset Password route for User Domain
app.get("/reset", (req, res) => res.render("./pages/reset"))

// Password Email route for User Domain
app.get("/passemail", (req, res) => res.render("./pages/passemail"))

// Update pass route for User Domain
app.get("/updatepass", (req, res) => res.render("./pages/updatepass"))

// Terms and Service for User Domain
app.get("/terms", (req, res) => res.render("./pages/terms"))

// Wait for User Domain
app.get("/wait", (req, res) => res.redirect("/"))


// ADMIN ROUTES

// Home Route
app.get("/admin", (req, res) => res.render("./admin/index"))
// User Route
app.get("/admin/users", (req, res) => res.render("./admin/users"))
// Work Route
app.get("/admin/works", (req, res) => res.render("./admin/works"))
// Add Work Route
app.get("/admin/addwork", (req, res) => res.render("./admin/addwork"))
// Edit Work Route
app.get("/admin/editwork", (req, res) => res.render("./admin/editWork"))
// Password Work Route
app.get("/admin/password", (req, res) => res.render("./admin/password"))
// EMail Work Route
app.get("/admin/email", (req, res) => res.render("./admin/email"))
// LOGIN Work Route
app.get("/admin/login", (req, res) => res.render("./admin/login"))
// This User Route
app.get("/admin/thisuser", (req, res) => res.render("./admin/thisuser"))
// Generate Coupon Route
app.get("/admin/coupon", (req, res) => res.render("./admin/coupon"))


const port = process.env.PORT || 8800
app.listen(port, () => console.log(`Backend running on ${port}`))