const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "Gmail",

    secure: true,
    host: process.env.SMTP_HOST ,
    port: process.env.SMTP_PORT ,
    auth : {
        user: 'Tobilyn77@gmail.com',
        pass: 'ahcvfdvgnsrkfhkn',

    }
})


const sendMail = async (to, sub, msg) => {
    console.log(process.env)
    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_USERNAME, // Sender address (should match the auth user)
        to: to, // Recipient
        subject: sub, // Subject line
        html: msg, // Email content in HTML
      });
  
      console.log(`Email sent successfully: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw error;
    }
  };

module.exports = sendMail;