const mongoose = require("mongoose");
const staffTypes = ["chef", "waiter", "manager", "cleaner", "cashier"];

const staffSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
  },
  type: {
    type: String,
    enum: staffTypes,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
    match: /^[6-9]\d{9}$/,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = { Staff, staffTypes };
