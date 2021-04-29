require("dotenv").config();
const nodemailer = require('nodemailer');
const { EMAIL_GMAIL, PASS_EMAIL, OUR_EMAIL } = process.env;
const { orderEmail } = require('../Templates/orderEmail.js')
const { activateEmail } = require('../Templates/activateEmail.js')
const { authUser } = require('../Templates/authUser.js')



// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)

let userMail = async (user) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: EMAIL_GMAIL,
            pass: PASS_EMAIL,
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
        from: OUR_EMAIL,
        to: user.userName ? [
            "malejandroceli@gmail.com",
            "maxibc94@gmail.com",
            "fddbh1@gmail.com",
            "marcoslezcanodev@gmail.com",
            "solis.sergioariel@gmail.com",
            "vcoronadoasm@gmail.com",
            "olimpomn@hotmail.com",
            "ponzonej@gmail.com"
        ] : user.email,//user.email // An array if you have multiple recipients.
        // cc:'second@domain.com',
        // bcc:'secretagent@company.gov',
        subject: user.userName && !user.status ? `User ${user.userName} desactivo la cuenta` : user.status ? `User ${user.userName} quiere activar su cuenta` : user.name ? `Hello ${user.name}! Your account has been active` : 'Tech Store <Order shipped>',
        // 'h:Reply-To': 'reply2this@company.com',
        // //You can use "html:" to send HTML email content. It's magic!
        html: user.userName ? activateEmail(user.userName, user.id) : user.name ? authUser(user.name) : orderEmail(user),
        // //You can use "text:" to send plain-text content. It's oldschool!
        //text: 'Mailgun rocks, pow pow!'
    }, (err, info) => {
        if (err) {
            console.log(`Error: ${err}`);
        }
        else {
            return info
        }
    });
}

module.exports = {
    userMail
}

// require("dotenv").config();
// const nodemailer = require('nodemailer');
// const mg = require('nodemailer-mailgun-transport');
// const { API_KEYMAILGUN, DOMAIN, OUR_EMAIL } = process.env;
// const {orderEmail} = require ('../Templates/orderEmail.js')
// const {activateEmail} = require ('../Templates/activateEmail.js')

// // This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
// const auth = {
//   auth: {
//     api_key: API_KEYMAILGUN,
//     domain: DOMAIN
//   }
// }

// const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// let userMail = (user) => {
//     nodemailerMailgun.sendMail({
//     from: OUR_EMAIL,
//     to: user.id?"malejandroceli@gmail.com":"pablomoronrey@gmail.com",//user.email // An array if you have multiple recipients.
//     // cc:'second@domain.com',
//     // bcc:'secretagent@company.gov',
//     subject: user.id && !user.status?`User ${user.id} desactivo la cuenta`:user.status?`User ${user.id} quiere activar su cuenta`:'Tech Store <Order shipped>',
//     // 'h:Reply-To': 'reply2this@company.com',
//     // //You can use "html:" to send HTML email content. It's magic!
//     html: user.id?activateEmail(user.id,user.status):orderEmail(user),
//     // //You can use "text:" to send plain-text content. It's oldschool!
//    //text: 'Mailgun rocks, pow pow!'
//   }, (err, info) => {
//     if (err) {
//       console.log(`Error: ${err}`);
//     }
//     else {
//       return info
//     }
//   });
// }

// module.exports = {
//     userMail
// }
