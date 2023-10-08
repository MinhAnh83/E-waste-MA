'use strict'

const RoleModel = require('../model/role.repo')

class RoleController {
    static getRoles = async (req, res, next) => {
        try {

            const results = await RoleModel.getRole()
            // console.log(results)
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get roles success!',
                data: results
            })

        }
        catch (err) {
            console.log(err)
            res.status(500).json({
                code: 500,
                message: 'Error::: c',
                error: err.message
            })
        }


    }
    static createRole = async (req, res, next) => {
        try {
            const { accessApp, name, description } = req.body;
            const result = await RoleModel.create({

                accessApp: accessApp
                , name: name
                , description: description
            })
            if (!result) throw new Error("Can't create role");
            res.status(200).json({
                message: 'Create roles success!',
                data: result
            })


        }
        catch (err) {
            res.status(500).json({
                code: 500,
                message: 'Error:::',
                error: err.message
            })
        }
    }

    static editRole = async (req, res, next) => {
        try {
            const { accessApp, name, description } = req.body;
            const { RoleId } = req.query
            const result = await RoleModel.editRole({
                accessApp: accessApp
                , name: name
                , description:description
                 ,
                  id: RoleId
            })
            if (!result) throw new Error("Can't create role");
            res.status(200).json({
                message: 'Create roles success!',
                data: result
            })


        }
        catch (err) {
            res.status(500).json({
                code: 500,
                message: 'Error:::',
                error: err.message
            })
        }
    }
}
module.exports = RoleController
