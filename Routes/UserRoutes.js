const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../Models/User.model");
const bcrypt = require("bcrypt");

// --------------->>>>>>>> User Registration <<<<<<<<-------------------

userRouter.post("/register", async (req, res) => {
  const { name, email } = req.body;
  const usernamefound = await UserModel.find({ name });
  const useremailfound = await UserModel.find({ email });
  if (usernamefound.length === 0 && useremailfound.length === 0) {
    try {
      const { name, email, password } = req.body;
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new UserModel({
          name,
          email,
          password: hash,
        });
        await user.save();
        res.status(200).send("New User Registration Successful");
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else if (usernamefound.length >= 1 && useremailfound.length >= 1) {
    res
      .status(400)
      .send(
        "User Already Exists with Same Credentials. Please login with same Credentials or Enter new Credentials to Create an Account"
      );
  } else if (usernamefound.length === 0 && useremailfound.length >= 1) {
    res.status(400).send("An account is Already Registered with this emailId!");
  } else if (usernamefound.length >= 1 && useremailfound.length === 0) {
    res
      .status(400)
      .send("An account is Already Registered with this username!");
  }
});

// --------------->>>>>>>> User Login <<<<<<<<-------------------

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    user.length > 0
      ? bcrypt.compare(password, user[0].password, (err, result) => {
          result === true
            ? res.status(200).send({
                msg: "Login Successful!",
                user: user,
              })
            : res.status(400).send("Wrong Password");
        })
      : res.status(400).send("No User Found With Such Credentials");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  userRouter,
};
