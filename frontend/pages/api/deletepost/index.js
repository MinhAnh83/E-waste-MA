import { deletePost } from '@/services/post.service'


export default async function handler(req, res) {
    if (req.method === 'POST') {
        deletePost(req.query).then((response) => {
            res.status(200).json(response.data)
        }).catch((err) => {
            
            res.status(400).json(err)
        })

    } else if(req.method === 'GET') {
        
    } else {
        //res.json({})
    }
  }
  