// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { auth } = require("express-openid-connect");
const session = require("express-session");

// Import routes
const adminRoutes = require("./routes/AdminRoutes");
const pmRoutes = require("./routes/PmRoutes");
const clientRoutes = require("./routes/ClientRoutes");
const auditorRoutes = require("./routes/AuditorRoutes");

// Import models
const User = require("./models/UserModel");

// Load environment variables
dotenv.config();

// Define constants
const PORT = process.env.PORT || 4004;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Initialize express app
const app = express();

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Define routes
app.use("/admin", adminRoutes);
app.use("/projectmanager", pmRoutes);
app.use("/client", clientRoutes);
app.use("/auditor", auditorRoutes);

// Define API endpoints
app.get("/api/user", async (req, res) => {
  try {
    const user = await User.findById(req.oidc.user.sub);
    if (user) {
      res.status(200).json({ userId: req.oidc.user.sub, name: user.name });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Define API endpoints
app.get("/api/userRole", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Role of the user print in a console for debugging
      console.log("User role:", user.role);
      res.json({ role: user.role });
    } else {
      console.log("User not found, defaulting to Client role.");
      res.json({ role: "Client" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// New endpoint to get user role from session
app.get("/get-session-role", (req, res) => {
  if (req.session.role) {
    res.send({ role: req.session.role });
  } else {
    res.status(401).send("Not logged in");
  }
});

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () =>
    // for debugging purposes
      console.log(`Server started on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error status code
  });
