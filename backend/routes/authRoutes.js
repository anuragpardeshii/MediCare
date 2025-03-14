const express = require('express');
const { register, login, checkAuth, logout } = require('../controllers/authController.js');
const { protect } = require('../middleware/auth.js');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  "/register",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    body("role").optional().isIn(["patient", "doctor"]),
    body("specialization")
      .if(body("role").equals("doctor"))
      .notEmpty()
      .withMessage("Specialization is required for doctors"),
  ],
  register
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  login
);

router.get("/me", (req, res) => {
  res.json({ data: req.user });
});

// ✅ Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.get("/checkauth", checkAuth);
router.post("/logout", logout);


module.exports = router;
