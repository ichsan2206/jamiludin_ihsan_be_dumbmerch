const express = require("express");

const router = express.Router();

// Controller Import
const {getUsers, register} = require("../controlers/user");
// router
router.get("/dataUser", getUsers);
router.post("/Register", register)

module.exports = router;
