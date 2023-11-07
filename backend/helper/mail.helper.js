'use strict'
const { google } = require('googleapis');
const nodemailer = require('nodemailer')
require('dotenv').config()
const CLIENT_ID = process.env['CLIENT_ID']
const CLIENT_SECRET = process.env['CLIENT_SECRET']
const REDIRECT_URI = process.env['REDIRECT_URI']
const REFESH_TOKEN = process.env['REFESH_TOKEN']
const MAIL_CLOUD = process.env['MAIL_CLOUD']

const oAuth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2client.setCredentials({ refresh_token: REFESH_TOKEN })

class MailHelper {



    static getTransport = async () => {
        const accessToken = await oAuth2client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: `OAuth2`,
                user: MAIL_CLOUD,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFESH_TOKEN,
                accessToken: accessToken
            },                          
        })
        return transport
    }
    static sendMail = async ({ from = '"E-WASTE Service 👻" ewastewebsite832@gmail.com',
        to, subject, text, html }) => {
        const transporter = await MailHelper.getTransport()
        const info = transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });
        return info
    }
} 
module.exports = MailHelper
