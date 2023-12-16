'use strict'

import Axios from '@/helper/axios.helper'

class MailService {
    static sendMail = async ({ to, subject, text, html }) => {
        return await Axios.post('/api/mail/create', { to, subject, text, html })
    }



}

module.exports = MailService