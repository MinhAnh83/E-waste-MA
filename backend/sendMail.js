// const { google } = require('googleapis');
// const nodemailer = require('nodemailer')
// require('dotenv').config()

// const CLIENT_ID = process.env['CLIENT_ID']
// const CLIENT_SECRET = process.env['CLIENT_SECRET']
// const REDIRECT_URI = process.env['REDIRECT_URI']
// const REFESH_TOKEN = process.env['REFESH_TOKEN']


// const oAuth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
// oAuth2client.setCredentials({ refresh_token: REFESH_TOKEN })

// const sendMail = async () => {
//     try {
//         const accessToken = await oAuth2client.getAccessToken();
//         const transport = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 type: `OAuth2`,
//                 user: "ewastewebsite832@gmail.com",
//                 clientId: CLIENT_ID,
//                 clientSecret: CLIENT_SECRET,
//                 refreshToken: REFESH_TOKEN,
//                 accessToken: accessToken
//             },
//         })

//         const info = await transport.sendMail({
//             from: '"E-WASTE Service 👻" ewastewebsite832@gmail.com', // sender address
//             to: "tranluanhxxx@gmail.com, huy.nguyen22994@gmail.com", // list of receivers
//             subject: "Send mail to accept the account", // Subject line
//             text: "Hello world", // plain text body
//             html: "<b>Hello world?</b>", // html body
//         });
//         console.log(info)
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

// sendMail()
const {sendMail} = require('./helper/mail.helper')

sendMail({
    to:'tranluanhxxx@gmail.com',
    subject:'Accept to the account',
    text: 'Xin chao',
    html:'<h1>Chao xin</h1>'
})