import {createdMessage} from '@/services/message.service'

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const response = await createdMessage(req.body)
        if(!response && !response.data) return res.status(400).json(data)
        res.status(200).json(response.data)
    } else if(req.method === 'GET') {
        // getMessageByUser(req.query).then((response)=>{
        //     const {data} =response
        //     res.status(200).json(data)
        // }).catch((err) => {
        //         console.log(`2::::`, err)
        //         res.status(400).json(err)
        //     })
    } else {
        //res.json({})
    }
  }