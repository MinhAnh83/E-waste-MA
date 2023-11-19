import { updateScrapyard} from '@/services/scrapyard.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        updateScrapyard(req.body).then((response) => {
            console.log('hehe')
            const { data } = response;
          
            ///xem tren terminal 
            res.status(200).json(data)
        }).catch((err) => {
            console.log(`2::::`, err)
            res.status(400).json(err)
        })


    } else if (req.method === 'GET') {
       
    } else {
        //res.json({})
    }
}