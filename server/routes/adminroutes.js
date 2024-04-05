// adminroutes.js
const express = require("express");
const router = express.Router();
const { protectUser } = require("../middlewares/UserProtect");

const {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  getUserByRole,
} = require("../controllers/AdminController");

/* ROUTES */
router.post("/adduser", protectUser, addUser);
router.get("/getusers", protectUser, getUsers);
router.get("/getuser/:id", protectUser, getUser);
router.put("/edituser",editUser);
router.delete("/deleteuser/:id", deleteUser);
router.get("/getuserbyrole/:role", getUserByRole);



module.exports = router;
