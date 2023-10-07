import { login } from '@/services/customer.service'


export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { email, password } = req.body
        login(email, password).then((response) => {
            res.status(200).json(response.data)
        }).catch((err) => {
            
            res.status(400).json(err)
        })

    } else if(req.method === 'GET') {
        
    } else {
        //res.json({})
    }
  }
  