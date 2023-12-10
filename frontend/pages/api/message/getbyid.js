import {getMessageById} from '@/services/message.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {

    } else if(req.method === 'GET') {
        getMessageById(req.query).then((response)=>{
            const {data} =response
            res.status(200).json(data)
        }).catch((err) => {
            res.status(400).json(err)
        })
    } else {
        //res.json({})
    }
  }