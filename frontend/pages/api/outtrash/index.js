import { outTrash} from '@/services/post.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        outTrash(req.query).then((response)=>{
    const {data} =response;
    console.log('datacuapost',data)
    ///xem tren terminal 
    res.status(200).json(data)
}).catch((err) => {
    console.log(`2::::`, err)
    res.status(400).json(err)
})
      

    } else if(req.method === 'GET') {
       
    } 
  }