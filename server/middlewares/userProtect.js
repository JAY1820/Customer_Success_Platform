const User = require("../models/UserModel");

const protectUser = async (req, res, _next, expectedRole) => {
  try {
    console.log("bolo bhai");
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
};

const redirectToDashboard = (res, role) => {
  console.log(role);
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
