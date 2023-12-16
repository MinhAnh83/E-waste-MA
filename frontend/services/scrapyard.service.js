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
   
static deleteScrapyard = async({scrapyard_id})=>{

    return await Axios.post(`/api/scrapyard/delete?scrapyard_id=${scrapyard_id}`)
}
static updateScrapyard=async({name, address, image, langlat, open_time, scrapyard_id})=>{
    return await Axios.post(`/api/scrapyard/update`,{name, address, image, langlat, open_time, scrapyard_id})
}
   
}

module.exports = ScrapyardService