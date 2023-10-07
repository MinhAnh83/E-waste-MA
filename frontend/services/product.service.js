'use strict'

import Axios from '@/helper/axios.helper'

class ProductService {

    static getProducts = async () => {
        return await Axios.get('/api/product')
    }
}

module.exports = ProductService