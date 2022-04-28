
const router = require("express").Router()
const userController = require("../controllers/userController")
const adminController = require("../controllers/adminController")

const {verifiedAccessToken, verifiedAdminToken} = require("./verifyTokens")

// USER ROUTES

// create user
router.post("/user/register", userController.createUser)
// Verify User
router.get("/validate", userController.confirmEmail)
// login user
router.post("/user/login", userController.loginUser)
// Update User
router.put("/user/update/:id", userController.updateUser)
// Delete user
router.delete("/user/delete/:id", verifiedAccessToken, userController.deleteUser)
// Get one User
router.get("/user/get/:id",  userController.getOneUser)
// Get All Users
router.get("/user/all/:id", verifiedAdminToken, userController.getAllUsers)
// Forgot Passowrd
router.post("/user/forgotpass", userController.forgotPassword)
// Reset Passowrd
router.put("/user/resetpassword", userController.resetPassword)
// Verify Account
router.put("/user/verify", userController.verifyAccount)
// Get all Referrals
router.get("/user/referrals", userController.getReferredUsers)
// Get Mined Total
router.put("/user/mine/:id", userController.getMinedAccount)
// Generate Coupon
router.post("/coupon/create", userController.generateCoupon)
// Get Coupons
router.get("/coupon/get", userController.getCoupons)



// ADMIN ROUTES

// create admin
// router.post("/admin/register", adminController.createUser)
// login admin
router.post("/admin/login", adminController.loginUser)
// Update admin
router.put("/admin/update/:id", verifiedAdminToken, adminController.updateUser)
// Delete admin
router.delete("/admin/delete/:id", verifiedAdminToken, adminController.deleteUser)



module.exports = router