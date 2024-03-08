const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");

const protectUser = async (req, res, next, expectedRole) => {
  try {
    if (req.path === '/home' || req.path === '/login') {
      req.oidc.unless({ path: ["/", ,"/home" ,"/UserLogin"] });
    }

    const user = await User.findById(req.oidc.user.sub); // Define the user variable

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    if (!expectedRole || user.role.toLowerCase() === expectedRole.toLowerCase()) {
      req.user = user;
      redirectToDashboard(res, user.role);
    } else {
      res.status(401).json({ message: "Authorization failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authorization failed" });
  }
  next();
};

const redirectToDashboard = (res, role) => {
  switch (role.toLowerCase()) {
    case "admin":
      res.redirect("/admin/dashboard");
      break;
    case "client":
      res.redirect("/client/dashboard");
      break;
    case "projectmanager":
      res.redirect("/projectmanager/dashboard");
      break;
    case "auditor":
      res.redirect("/auditor/dashboard");
      break;
    default:
      res.status(401).json({ message: "Invalid role" });
  }
};

module.exports = { protectUser };
