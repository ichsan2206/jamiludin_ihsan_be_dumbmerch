const express = require("express");

const router = express.Router();

// Controller Import
const {getUsers, register, login, deleteUser, updateUser, getUser} = require("../controlers/user");

// router User
router.get("/User", getUsers);
router.post("/Register", register);
router.get("/Login", login);
router.get("/User/:id", getUser);
router.delete("/User/:id", deleteUser);
router.patch("/User/:id", updateUser);

module.exports = router;
