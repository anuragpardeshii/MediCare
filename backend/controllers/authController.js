const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ errors: [{ msg: "All fields are required!" }] });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ errors: [{ msg: "Password must be at least 6 characters long." }] });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: "User already exists." }] });
    }

    // Create new user (password will be hashed automatically in UserSchema)
    const user = new User({
      name,
      email,
      password,
      role,
      specialization: role === "doctor" ? specialization : null,
    });

    await user.save();

    // Generate JWT
    const token = user.getSignedJwtToken();

    // Send response
    res.status(201).json({
      success: true,
      msg: "Registration successful!",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, specialization: user.specialization },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error. Please try again." }] });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errors: [{ msg: "Email and password are required!" }] });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials." }] });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials." }] });
    }

    const token = user.getSignedJwtToken();

    // ✅ Set Cookie with Token
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side access
      secure: false, // Change to true in production
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      msg: "Login successful!",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error. Please try again." }] });
  }
};



exports.checkAuth = async (req, res) => {
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    // Return 200 with no user if token is missing
    return res.status(200).json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    const userId = decoded.id; // Extract user ID from token payload

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      // Return 200 with no user if user is not found
      return res.status(200).json({ user: null });
    }

    // If user is found, send the complete user data
    res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    console.error(err);
    // Return 200 with no user if token is invalid
    return res.status(200).json({ user: null });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};