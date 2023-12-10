import { setPassword} from '@/services/user.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        setPassword(req.body).then((response)=>{
            const {data} =response;
            res.status(200).json(data)
        }).catch((err) => {
            console.log(`2::::`, err)
            res.status(400).json(err)
        })
    


    } else if(req.method === 'GET') {
      
    } else {
        //res.json({})
    }
  }