const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const routes = require('./routes/v1');
const db = require('./model'); 
const sendNotification = require("./service/notification.service");



const app = express();

// Middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 40 * 60 * 1000 // 30 minutes
  }
}));
app.use(passport.initialize());
app.use(passport.session());
sendNotification();
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
const port =  5000;
app.listen(process.env.PORT, () => {
  console.log(`App is successfully running on port ${port}`);
});
