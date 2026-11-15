const express = require("express");
const db = require("./database.js");
const staffRouter = require("./routes/staff_routes.js");
const MenuItemRouter = require("./routes/menu_items_routes.js");
const passport = require("./auth.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware for logging

function logger(req, res, next) {
  const date = new Date();
  console.log(`[${date.toLocaleString()}] Request at: ${req.url}`);
  next();
}
app.use(logger);

// authentication middleware
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });
// app.use(localAuthMiddleware);

app.get("/", (req, res) => {
  res.send("Hotel backend is running");
});

// app.use("/staff", localAuthMiddleware, staffRouter);
app.use("/staff", staffRouter);
app.use("/menu-item", MenuItemRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
