'use strict'

import Axios from '@/helper/axios.helper'

class RoleService {

    static getRole = async () => {
        return await Axios.get('/api/role/get')
    }
}

module.exports = RoleService