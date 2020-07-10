const nodemailer = require('nodemailer');
const { options } = require('../routes/postRoutes');

const sendEmail = async options => {
    // 1) Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    // 2) Define email options
    const mailOptions = {
        from: 'Omkar Ghag <admin@social.com>',
        to: options.email,
        text: options.message
    }
    // 3) send email
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;