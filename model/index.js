
const Sequelize = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.MYDB,
  process.env.MYUSER,
  process.env.MYPASSWORD,
  {
    host:  process.env.MYHOST,
   port:  process.env.SQLPORT,
    dialect: "mysql",
    logging: false, // Prevents console spam
  }
);

// Sync database (ONLY in development)

  sequelize
    .sync()
    .then(() => console.log('Database successfully synced'))
    .catch(error => console.error('Database sync error:', error));


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models properly
db.User = require('../model/user.model')(sequelize, Sequelize);
db.Provider = require('../model/Provider.model')(sequelize, Sequelize);
db.Feedback = require('../model/Feedbacks.model')(sequelize, Sequelize);
db.Appointment = require('../model/Appointment.model')(sequelize, Sequelize);
db.Reminder =  require('../model/Reminder.model')(sequelize, Sequelize)
db.Token = require('../model/token.model')(sequelize, Sequelize);
db.Insurance = require('../model/Insurance.model')(sequelize, Sequelize);
// Export database object
module.exports = db;
