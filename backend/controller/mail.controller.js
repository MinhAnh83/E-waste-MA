const { sendMail } = require('../helper/mail.helper')
class Mailcontroller {
   
    static sendMail = async (req, res, next) => {
      
        try {
            console.log(req.body)
            const { to, subject, text, html } = req.body;
           
          const result= await sendMail({ to, subject, text, html })
      
            res.status(200).json({
                message: 'send mail succesfully'
            })

        }
        catch (error) {
            res.status(500).json({
                message: "send mail failed"
            })
        }

    }
}

module.exports = Mailcontroller