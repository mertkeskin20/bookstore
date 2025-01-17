import User from "../models/User.js";
import { checkValidationErrors } from "../utils/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { email } = req.body;

    const existingEmail = await User.findOne({ email });

    //check email if exist

    if (existingEmail) {
      return res.status(400).json({ error: "The email is already exist!" });
    }

    const newUser = await User.create(req.body);

    newUser.password = undefined;
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    //handle mongoose validation error
    if (error.name === "ValidationError") {
      if (checkValidationErrors(error, res)) return;
    } else {
      console.error("Error at register", error);
      return res.status(500).json({ error: "Internal Server error" });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //check user if exist
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    //check if password correct
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Password is not true!" });
    }

    user.password = undefined;

    const expirationTime = 60 * 60 * 24 * 7;

    //generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: expirationTime,
    });

    return res
      .status(200)
      .json({ message: "User logged in succesfully!", user, token });
  } catch (error) {
    console.error("Error at login", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export { register, login };
