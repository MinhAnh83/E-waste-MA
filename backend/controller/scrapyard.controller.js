
'use strict'
const ScrapyardModel = require('../model/scrapyard.repo')


class ScrapyardController {
    static getScrapyards = async (req, res, next) => {
        try {
            const { id } = req.query;

            const results = await ScrapyardModel.getScrapyards({ id })
            // console.log(results)
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get scrapyards success!',
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
    static deleteScrapyard = async (req, res, next) => {
        try {
            const {scrapyard_id} = req.query
            const results = await ScrapyardModel.deleteScrapyard(scrapyard_id)
            // console.log(results)
            if (!results) throw new Error("Don't delete scrapyard");
            res.status(200).json({
                message: 'delete scrapyard success!',
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

    static createScrapyard = async (req, res, next) => {
        try {
            const { address, name, image, langlat, open_time } = req.body;
            const { user_id } = req.body
            const result = await ScrapyardModel.createScrapyard({
                address: address,
                name: name,
                image: image,
                langlat: langlat,
                open_time: open_time,
                user_id: user_id
            })
            if (!result) throw new Error("Can't create Scrapyard");
            res.status(200).json({
                message: 'Create Crapyard success!',
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
module.exports = ScrapyardController