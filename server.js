const express = require("express");
const db = require("./database.js");
const staffRouter = require("./routes/staff_routes.js");
const MenuItemRouter = require("./routes/menu_items_routes.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hotel backend is running");
});

app.use("/staff", staffRouter);
app.use("/menu-item", MenuItemRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
