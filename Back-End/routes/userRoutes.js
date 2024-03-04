const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const protectedRoute = require("../controllers/protectedRoute");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/protected", authMiddleware, protectedRoute);

module.exports = router;
