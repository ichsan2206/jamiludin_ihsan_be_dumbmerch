const express = require("express");

const router = express.Router();

const {uploadFile} = require("../midleware/uploadFIle")

// validate token
const {auth} = require("../midleware/auth")

// Controller Import
const {getUsers, register, login, deleteUser, updateUser, getUser} = require("../controlers/user");
const {getProduct, addProduct, detailProduct, updateProduct, deleteProduct} = require("../controlers/product");
const {addTransaction } = require("../controlers/transaction");

// router User
router.get("/User", getUsers);
router.post("/Register", register);
router.get("/Login", login);
router.get("/User/:id", getUser);
router.delete("/User/:id", deleteUser);
router.patch("/User/:id", updateUser);

//router Product
router.get("/Product", auth, getProduct);
router.post("/Product", auth, uploadFile("image"), addProduct);
router.get("/Product/:id", auth, detailProduct);
router.delete("/Product/:id", auth, deleteProduct)
router.patch("/Product/:id",  auth, uploadFile("image"), updateProduct);

//router Transaction
router.post("/Transaction", auth, addTransaction);

module.exports = router;
