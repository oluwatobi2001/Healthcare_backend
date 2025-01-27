const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../model"); // Sequelize models are assumed to be here
const User = db.user; // Your User model

module.exports = function (passport) {
  // Configure LocalStrategy for Passport
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // Using 'email' instead of 'username'
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // Find user by email
          const user = await User.findOne({ where: { email } });

          if (!user) {
            return done(null, false, { message: "User not found." });
          }

          // Compare the provided password with the stored hashed password
          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            return done(null, false, { message: "Incorrect password." });
          }

          // If everything is valid, return the user
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Serialize user to store user ID in the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user to retrieve user data by ID
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
