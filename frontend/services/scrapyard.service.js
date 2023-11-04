'use strict'

import Axios from '@/helper/axios.helper'

class ScrapyardService {
    static createScrapyard = async ({address,  name, image,langlat, open_time, user_id}) => {
        return await Axios.post('/api/scrapyard/create', { address,  name, image,langlat, open_time, user_id })
    }
    static getScrapyards = async ({id}) => {
        let url = '/api/scrapyard/get?'
        if(id) url = url + `id=${id}&`
        return await Axios.get(url)
    }
   

   
}

module.exports = ScrapyardService