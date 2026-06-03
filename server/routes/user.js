const express = require("express");

const userController = require("../controllers/user");

const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/details", verify, userController.getUserDetails);

router.patch("/:userId/set-as-admin", verify, verifyAdmin, userController.setAdmin);

router.patch("/update-password", verify, userController.updatePassword);

module.exports = router;