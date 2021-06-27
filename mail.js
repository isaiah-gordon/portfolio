const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport')

const auth = {
    auth: {
        api_key: process.env.smtp_api_key,
        domain: process.env.smtp_domain
    }
}

const transporter = nodemailer.createTransport(mailGun(auth))

function sendMail(email, subject, message, callback) {
    const mailOptions = {
        from: email,
        to: process.env.webmaster_email,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions, function (error, data) {
        if (error) {
            callback(error, null)
        } else {
            callback(null, data)
        }
    })
}

module.exports = sendMail
