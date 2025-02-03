const cron = require("node-cron");

const {Op } = require("sequelize");

const db = require('../model');
const sendMail = require("./MailService");
const { User, Appointment } = require("../model");
const Reminder = db.Reminder


const sendNotification = () => {





cron.schedule('* * * * *', async () => {
    const now = new Date();
    const upcomingReminders = await Reminder.findAll({
        where : {
            reminderTime : {
[Op.lte]: new Date(now.getTime() + 60  * 24* 60 *  1000)
            }, status: 'pending'
        }
    })
    const ReminderHeader =  ' Here is a reminder'
    for (const reminder in upcomingReminders) {
        const appointmentDetails = await Appointment.findByPk(reminder.appointmentId);
        const userDetails =  await User.findOne({where :{id: appointmentDetails.patientId}})


        await sendMail(userDetails.email, ReminderHeader, reminder.message );

        await reminder.update({status: "sent"})
    }
})


console.log("cron service functioning")
}

module.exports = sendNotification