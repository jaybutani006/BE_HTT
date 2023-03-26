const express = require("express");

const { register, loginUser, logout, getUsers, getAllUsers, getUserDetail } = require("../controllers/userController");

// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/getAllUsers").get(getAllUsers);
router.route("/getusers/:fren").get(getUsers);
router.route("/getuserdetail/:email").get(getUserDetail);

module.exports = router;