
import { sendMail} from '@/services/mail.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {
sendMail(req.body).then((response)=>{
    res.status(200).json({
        message:'send successfully'
    })
}).catch((err)=>{
    res.status(400).json({
        message:'error'
    })
})
    } else if(req.method === 'GET') {
        
    } else {
        //res.json({})
    }
  }