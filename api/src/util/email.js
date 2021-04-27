const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
require("dotenv").config();
const { API_KEYMAILGUN, DOMAIN } = process.env;

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
  auth: {
    api_key: API_KEYMAILGUN,
    domain: DOMAIN
  }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

let userMail = (mail) => {
    console.log(mail)
    nodemailerMailgun.sendMail({
    from: 'pepe@gmail.com',
    to: mail, // An array if you have multiple recipients.
    // cc:'second@domain.com',
    // bcc:'secretagent@company.gov',
    // subject: 'Hey you, awesome!',
    // 'h:Reply-To': 'reply2this@company.com',
    // //You can use "html:" to send HTML email content. It's magic!
    // html: '<b>Wow Big powerful letters</b>',
    // //You can use "text:" to send plain-text content. It's oldschool!
    text: 'Mailgun rocks, pow pow!'
  }, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
    else {
      console.log(`Response: ${info}`);
    }
  });
}

module.exports = {
    userMail
}