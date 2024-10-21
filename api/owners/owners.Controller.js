const Owner = require("../../models/Owner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const generateToken = (owner) => {
  const payload = {
    username: owner.username,
    _id: owner._id,
    role: "User",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// Signup
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;

    // Validate required fields
    if (!username || !email || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new owner
    const newOwner = await Owner.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    const token = generateToken(newOwner);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

// Signin
exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

// Get profile
exports.getMyProfile = async (req, res, next) => {
  try {
    const owner = await Owner.findById(req.user._id).populate("pets");
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(owner);
  } catch (err) {
    next(err);
  }
};

// Update profile
exports.updateMyProfile = async (req, res, next) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(updatedOwner);
  } catch (err) {
    next(err);
  }
};
