import { HttpResponse } from '../helpers/helper.js';
import { Request } from '../models/index.js';
import { RequestValidator } from '../validators/index.js';

export default class RequestController {
    constructor() {}



    /**
     * return all the request
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async index(req, res) {
        try {
            let request = await Request.find();
            res.status(HttpResponse.OK);
            return res.send(request);
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            console.log("code error ", error)
            return res.send(error);
        }
    }

    /**
     * insert a request in the database
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async save(req, res) {

        const data = (new RequestValidator()).validatePost(req.body)
        if (data.error) {
            res.status(HttpResponse.UNPROCESSABLE_ENTITY);
            return res.send(data);
        }
        try {
            if (!data["response"]) data["response"] = ""
            const request = await Request.create(data);
            res.status(HttpResponse.OK);
            return res.send(request["_id"]);
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error });
        }
    }


    /**
     * get a single request in the database
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async single(req, res) {
        try {
            const request = await Request.findOne({ _id: req.params.id });
            if (request != null) {
                res.status(HttpResponse.OK);
                return res.send({ request: request });
            } else {
                res.status(HttpResponse.NOT_FOUND);
                return res.send({ message: `${req.params.id} does not corresponde to any request` })
            }
        } catch (error) {
            if (error.name == 'CastError') {
                res.status(HttpResponse.BAD_REQUEST);
            } else {
                res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            }
            return res.send({ message: error.message });
        }
    }

    /**
     * update a request
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async update(req, res) {

        const data = (new RequestValidator()).validateUpdate(req.body)
        if (data.error) {
            res.status(HttpResponse.UNPROCESSABLE_ENTITY);
            return res.send(data);
        }

        try {
            let request = await Request.updateOne({ _id: req.params.id }, data);
            if (request.modifiedCount == 1 || request.matchedCount == 1) {
                res.status(HttpResponse.OK);
                return res.send({ message: "request modifier avec success!" });
            } else {
                res.status(HttpResponse.NOT_FOUND);
                return res.send({ message: `${req.params.id} does not corresponde to any request` })
            }
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error });
        }
    }

    /**
     * remove a request
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async remove(req, res) {
        let request = await Request.findOne({ _id: req.params.id });
        if (request == null) {
            res.status(HttpResponse.NOT_FOUND);
            return res.send({ message: `${req.params.id} does not corresponde to any request` })
        }
        try {
            await Blog.remove({ _id: req.params.id });
            res.status(HttpResponse.OK);
            return res.send({ message: 'one request removed' });
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error });
        }
    }
}