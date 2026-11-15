const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Staff } = require("./models/staff.js");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const staff = await Staff.findOne({ username: username });

      if (!staff) {
        done(null, false, {
          message: `No account found by this username:${username}`,
        });
      }

      const hasPasswordMatch = await staff.comparePassword(password);

      if (!hasPasswordMatch) {
        done(null, false, { message: "Incorrect password" });
      }
      done(null, staff);
    } catch (err) {
      done(err);
    }
  }),
);

module.exports = passport;
