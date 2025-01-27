const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const routes = require('./routes/v1');
const db = require('./model'); // Assuming Sequelize models are here



const app = express();

// Middleware
dotenv.config();
console.log(dotenv.config())
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000 // 30 minutes
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passport')(passport);

// Database sync
db.sequelize.sync().then(() => {
  console.log('Database synced successfully');
}).catch(err => {
  console.error('Error syncing database:', err);
});

// Routes
app.use('/v1', routes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is successfully running on port ${port}`);
});
