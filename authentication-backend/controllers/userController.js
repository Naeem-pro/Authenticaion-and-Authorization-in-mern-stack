const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//controller for user-signup
const singnup = async (req, res) => {
  try {
    let existinguser = await User.findOne({ email: req.body.email });
    if (existinguser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
  } catch (error) {
    console.log(error);
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return res.status(200).json({
      message: "Signup successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

//controller for user-login
const login = async (req, res) => {
  const { email, password } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email: email });
  } catch (error) {
    return new Error(error);
  }
  if (!existinguser) {
    return res.status(400).json({
      message: "User not found. Please Signup First",
    });
  } else {
    const isCorrectPassword = bcrypt.compareSync(
      password,
      existinguser.password
    );
    if (!isCorrectPassword) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    } else {
      const token = jwt.sign({ id: existinguser._id }, "mytoken", {
        //generate token after finding correct user from database
        expiresIn: "30s",
      });
      res.cookie(String(existinguser._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax",
      });
      return res.status(200).json({
        messsage: "Login Successfully...",
        existinguser,
        token,
      });
    }
  }
};

const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    return res.status(400).json({
      message: "You are not authenticated user",
    });
  }
  const result = jwt.verify(token, "mytoken");
  req.id = result.id; //store the id of user in the request object, req is the only global object which is accessible in the backend
  next();
};

const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.id, "-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Error in finding user",
      error,
    });
  }
};

exports.signup = singnup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
