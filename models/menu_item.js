const mongoose = require("mongoose");

const menuItemType = [
  "starter",
  "main_course",
  "dessert",
  "beverage",
  "snack",
  "side_dish",
  "salad",
  "soup",
];
const menuItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: menuItemType,
    required: true,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  numSales: {
    type: Number,
    default: 0,
    min: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = { MenuItem, menuItemType };
