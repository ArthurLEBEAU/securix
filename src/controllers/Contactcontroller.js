import { HttpResponse } from '../helpers/helper.js'
import { Contact } from '../models/index.js'
import { ContactValidator } from '../validators/index.js'

export default class ContactController {
    constructor() {}

    /**
     * return all the Contact
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @returns Express.res
     */
    async index(req, res) {
        try {
            let data = await Contact.find()
            res.status(HttpResponse.OK)
            return res.send(data)
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR)
            console.log('code error ', error)
            return res.send(error)
        }
    }

    /**
     * insert a Contact in the database
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @returns Express.res
     */
    async save(req, res) {
        const data = (new ContactValidator()).validateUpdate(req.body)
        if (data.error) {
            res.status(HttpResponse.UNPROCESSABLE_ENTITY);
            return res.send(data);
        }
        try {
            const r = await Contact.create(data)
            res.status(HttpResponse.OK)
            return res.send(r._id)
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR)
            return res.send({ error })
        }
    }

    /**
     * get a single Contact in the database
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @returns Express.res
     */
    async single(req, res) {
        try {
            const data = await Contact.findOne({ _id: req.params.id })
            if (data != null) {
                res.status(HttpResponse.OK)
                return res.send({ data: data })
            } else {
                res.status(HttpResponse.NOT_FOUND)
                return res.send({
                    message: `${req.params.id} does not corresponde to any Contact`,
                })
            }
        } catch (error) {
            if (error.name == 'CastError') {
                res.status(HttpResponse.BAD_REQUEST)
            } else {
                res.status(HttpResponse.INTERNAL_SERVER_ERROR)
            }
            return res.send({ message: error.message })
        }
    }

    /**
     * update a Contact
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @returns Express.res
     */
    async update(req, res) {
        const data = (new ContactValidator()).validateUpdate(req.body)
        if (data.error) {
            res.status(HttpResponse.UNPROCESSABLE_ENTITY);
            return res.send(data);
        }
        try {
            let data = await Contact.updateOne({ _id: req.params.id }, req.body)
            if (data.modifiedCount == 1 || data.matchedCount == 1) {
                res.status(HttpResponse.OK)
                return res.send({ message: 'data modifier avec success!' })
            } else {
                res.status(HttpResponse.NOT_FOUND)
                return res.send({
                    message: `${req.params.id} does not corresponde to any data`,
                })
            }
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR)
            return res.send({ error })
        }
    }

    /**
     * remove a Contact
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @returns Express.res
     */
    async remove(req, res) {
        let data = await Contact.findOne({ _id: req.params.id })
        if (data == null) {
            res.status(HttpResponse.NOT_FOUND)
            return res.send({
                message: `${req.params.id} does not corresponde to any data`,
            })
        }
        try {
            await Contact.remove({ _id: req.params.id })
            res.status(HttpResponse.OK)
            return res.send({ message: 'one ow removed' })
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR)
            return res.send({ error })
        }
    }
}