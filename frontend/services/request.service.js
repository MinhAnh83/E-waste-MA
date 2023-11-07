'use strict'
import Axios from '@/helper/axios.helper';
class RequestService{
    static createRequest = async ({ post_id, user_id, expect_price, comments, status }) => {
        return await Axios.post('/api/request/create', { post_id, user_id, expect_price, comments, status })
    }
}
module.exports=RequestService