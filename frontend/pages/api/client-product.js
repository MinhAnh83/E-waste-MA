import { getProducts } from '@/services/product.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        
      res.json({})
    } else if(req.method === 'GET') {
        const { data } = await getProducts()
        res.status(200).json({
            title: 'client rest',
            data
        })
    } else {
        res.json({})
    }
  }
  