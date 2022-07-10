// import joi validate package
const Joi = require("joi")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//import models
const {user} = require("../../models");

// AUTH Register
exports.register = async (req, res) => {
  try {
    
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(4).required()
    })
  
    const {error} = schema.validate(req.body)
  
    if(error){
      return res.status(400).send({
        error: {
          message: error.details[0].message
        }
      })
    }

    const userExist = await user.findOne({
      where: { 
        email: req.body.email
      }
    })

    if(userExist){
      return res.status(400).send({
        status: "failed",
        message: "Email sudah terdaftar"
      })
    }
// hashPassword
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10)

const newUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        status: "custommer",
    })

// Create Token
const tokenKey = "sseiAEhadnajdaks"
const token =jwt.sign({id: newUser.id}, tokenKey)
  
    res.status(201).send({
      status: "success",
      message: "register success",
      data: {
        user:{
        name: newUser.name,
        email: newUser.email,
        token
      }
      }
    })

  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error"
    })
  }

};

exports.getUsers = async (req, res) => {
  try {
    const dataUser = await user.findAll()

    res.send({
      status: "success",
      data: {
        dataUser
      },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};