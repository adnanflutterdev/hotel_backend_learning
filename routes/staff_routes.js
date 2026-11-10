const express = require("express");
const router = express.Router();
const { Staff, staffTypes } = require("./../models/staff.js");

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newStaff = new Staff(data);

    const response = await newStaff.save();
    res.status(201).json({
      success: true,
      message: "✅ Staff entery created successfully!!!",
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

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const response = await Staff.findByIdAndUpdate(id, updatedData, {
      returnDocument: 'after',
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

router.delete("/:id", async (req, res) => {
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

router.get("/:type", async (req, res) => {
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
