import { signup } from '@/services/user.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const {fullname, email, password , phonenumber, address, role_id} = req.body
        signup(fullname, email, password,phonenumber, address, role_id).then((response) => {
         
            const { data } = response
            res.status(200).json(data)
        }).catch((err) => {
            console.log(`2::::`, err.message)
            res.status(400).json(err)
        })


    } else if(req.method === 'GET') {
        
    } else {
        //res.json({})
    }
  }
  