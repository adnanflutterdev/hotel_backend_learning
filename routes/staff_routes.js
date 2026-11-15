const express = require("express");
const router = express.Router();
const { Staff, staffTypes } = require("./../models/staff.js");
const {
  jwtAuthenticationMiddleware,
  generateJwtToken,
} = require("./../jwt.js");

router.get("/", jwtAuthenticationMiddleware, async (req, res) => {
  try {
    const response = await Staff.find();
    res.status(200).json({
      success: true,
      length: response.length,
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newStaff = new Staff(data);

    const response = await newStaff.save();
    const payload = {
      id: newStaff.id,
      username: newStaff.username,
      email: newStaff.email,
    };
    const token = generateJwtToken(payload);
    res.status(201).json({
      success: true,
      message: "✅ Staff entery created successfully!!!",
      data: response,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const staff = await Staff.findOne({ username: data.username });

    if (!staff) {
      res.status(404).json({
        success: false,
        message: `User with ${data.username} is not found`,
      });
    }

    hasPasswordMatch = await staff.comparePassword(data.password);

    if (hasPasswordMatch) {
      const payload = {
        id: staff.id,
        username: staff.username,
        email: staff.email,
      };
      const token = generateJwtToken(payload);
      res
        .status(200)
        .json({ success: true, message: "Login success!!!", token: token });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Password is incorrect" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/profile", jwtAuthenticationMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Error occured. Can't get profile" });
    }

    const staff = await Staff.findById(user.id);
    if (!staff) {
      res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: staff });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.put("/:id", jwtAuthenticationMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const response = await Staff.findByIdAndUpdate(id, updatedData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!response) {
      res.status(404).json({
        success: false,
        message: "❌ Staff not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "✅ Staff data updated successfully!!!",
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.delete("/:id", jwtAuthenticationMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Staff.findByIdAndDelete(id);
    if (!response) {
      res.status(404).json({
        success: false,
        message: "❌ Staff not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "✅ Staff entery deleted successfully!!!",
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/:type", jwtAuthenticationMiddleware, async (req, res) => {
  try {
    const type = req.params.type.toLocaleLowerCase();
    if (staffTypes.includes(type)) {
      const response = await Staff.find({ type: type });
      res
        .status(200)
        .json({ length: response.length, success: true, data: response });
    } else {
      res
        .status(404)
        .json({ success: false, message: `${type} is not valid staff type` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
