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
            let requests = await Request.find();
            res.status(HttpResponse.OK);
            return res.send({ faq: this.serealize(requests) });
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
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

            const qt = await Request.findOne({ name: data.name, question: data.question })
            if (qt) {
                res.status(HttpResponse.CONFLICT);
                return res.send({ error: "cette question existe deja!" });
            }


            if (!data["response"]) data["response"] = ""
            const request = await Request.create(data);
            res.status(HttpResponse.OK);
            return res.send(request["_id"]);
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
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
                return res.send({ message: `${req.params.id} ne correspond à aucune question` })
            }
        } catch (error) {
            if (error.name == 'CastError') {
                res.status(HttpResponse.BAD_REQUEST);
            } else {
                res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            }
            return res.send({ error: "une erreur c'est produite!" });
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
            if (data.name && data.question) {
                const cat = await Request.findOne({ name: data.name, question: data.question })
                if (cat) {
                    res.status(HttpResponse.CONFLICT);
                    return res.send({ error: "cette question existe deja!" });
                }
            }


            let request = await Request.updateOne({ _id: req.params.id }, data);
            if (request.modifiedCount == 1 || request.matchedCount == 1) {
                res.status(HttpResponse.OK);
                return res.send({ message: "question modifiée !" });
            } else {
                res.status(HttpResponse.NOT_FOUND);
                return res.send({ message: `${req.params.id} ne correspond à aucune question` })
            }
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
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
            return res.send({ message: `${req.params.id} ne corespond à aucune question` })
        }
        try {
            await Request.deleteOne({ _id: req.params.id });
            res.status(HttpResponse.OK);
            return res.send({ message: 'question supprimée !' });
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
        }
    }


    /**
     * 
     * @param {Array} questions 
     * @returns {Array}
     */
    serealize(questions) {
        let qsts = []
        questions.forEach((qt, index) => {
            qsts.push({
                id: index + 1,
                _id: qt._id,
                name: qt.name,
                email: qt.email,
                question: qt.question,
                response: qt.response,
                created_at: (new Date(qt.created_at)).toLocaleString(),
            })
        });

        return qsts
    }
}