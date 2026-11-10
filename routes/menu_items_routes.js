const express = require("express");
const router = express.Router();
const { MenuItem, menuItemType } = require("./../models/menu_item.js");

router.get("/", async (req, res) => {
  try {
    const response = await MenuItem.find();
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
    const newMenuItem = new MenuItem(data);

    const response = await newMenuItem.save();
    res.status(201).json({
      success: true,
      message: "✅ Menu item entery created successfully!!!",
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

    const response = await MenuItem.findByIdAndUpdate(id, updatedData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!response) {
      res.status(404).json({
        success: false,
        message: "❌ Menu Item not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "✅ Menu Item data updated successfully!!!",
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

    const response = await MenuItem.findByIdAndDelete(id);
    if (!response) {
      res.status(404).json({
        success: false,
        message: "❌ Menu Item not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "✅ Menu Item entery deleted successfully!!!",
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
    if (menuItemType.includes(type)) {
      const response = await MenuItem.find({ type: type });
      res
        .status(200)
        .json({ success: true, length: response.length, data: response });
    } else {
      res.status(404).json({
        success: false,
        message: `${type} is not valid menu item type`,
      });
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
