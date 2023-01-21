import { HttpResponse } from '../helpers/helper.js';
import { Category } from '../models/index.js';
import { Service } from '../models/index.js';
import { ServiceValidator } from '../validators/index.js';
import FileController from './FileController.js';

export default class ServiceController {
    constructor() {}



    /**
     * return all the services
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async index(req, res) {
        try {
            let services = await Service.find().populate("cat_id", "name + _id");
            res.status(HttpResponse.OK);
            return res.send({ service: this.serealize(services) });
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
        }
    }

    /**
     * insert an service in the database
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async save(req, res) {
        let data = {}
        Object.keys(req.body).forEach((it) => {
            if (req.body[it] != "") {
                data[it] = req.body[it]
            }
        })
        if (req.files) data['cover'] = req.files.cover

        data = (new ServiceValidator()).validatePost(data)
        if (data.error) {
            res.status(HttpResponse.UNPROCESSABLE_ENTITY);
            return res.send(data);
        }
        // check the category
        const cat = Category.findOne({ _id: data.cat_id });
        if (cat == null) {
            res.status(HttpResponse.NOT_FOUND);
            return res.send({ error: "la categorie n'existe pas!" });
        }
        // check and send the file
        try {
            const sf = await FileController.saveFile(data.cover, 'service')
            if (Object.keys(sf).includes('error')) {
                throw sf
            }
            data.cover = sf.path
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
        }

        try {
            const service = await Service.create(data);
            res.status(HttpResponse.CREATED);
            return res.send(service);
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
        }
    }


    /**
     * get a single service in the database
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async single(req, res) {
        try {
            const service = await Service.findOne({ _id: req.params.id }).populate("cat_id", "name + _id");
            if (service != null) {
                res.status(HttpResponse.OK);
                return res.send(service);
            } else {
                res.status(HttpResponse.NOT_FOUND);
                return res.send({ message: `${req.params.id} ne correspond à aucun service !` })
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
     * update an service
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async update(req, res) {


        let path = ""
        let data = {}
        Object.keys(req.body).forEach((it) => {
            if (req.body[it] != "") {
                data[it] = req.body[it]
            }
        })

        data = (new ServiceValidator()).validateUpdate(data)
        if (data.error) {
            res.status(HttpResponse.UNPROCESSABLE_ENTITY);
            return res.send(data);
        }

        // check the category
        if (data.cat_id) {
            const cat = Category.findOne({ _id: data.cat_id });
            if (cat == null) {
                res.status(HttpResponse.NOT_FOUND);
                return res.send({ error: "la categorie n'existe pas!" });
            }
        }
        if (req.files) {
            data['cover'] = req.files.cover
            try {
                const sf = await FileController.saveFile(data.cover, 'service')
                if (Object.keys(sf).includes('error')) {
                    throw sf
                }
                path = sf.path
            } catch (error) {
                res.status(HttpResponse.INTERNAL_SERVER_ERROR);
                return res.send({ error: "une erreur c'est produite!" });
            }
        }

        try {
            if (path != "") data.cover = path
            let service = await Service.updateOne({ _id: req.params.id }, data).populate("cat_id", "name + _id");
            if (service.modifiedCount == 1 || service.matchedCount == 1) {
                res.status(HttpResponse.OK);
                return res.send({ message: "service modifié avec success!" });
            } else {
                res.status(HttpResponse.NOT_FOUND);
                return res.send({ message: `${req.params.id} ne correspond à aucun service` })
            }
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
        }
    }

    /**
     * remove an article
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async remove(req, res) {

        let service = await Service.findOne({ _id: req.params.id });
        if (service == null) {
            res.status(HttpResponse.NOT_FOUND);
            return res.send({ message: `${req.params.id} ne corespond à aucun service` })
        }
        try {
            let rs = FileController.dropFile(service.cover)
            if (rs == null) {
                await Service.remove({ _id: req.params.id });
            } else {
                return res.send({ message: rs.error });
            }
            res.status(HttpResponse.OK);
            return res.send({ message: 'service supprimé !' });
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
        }
    }

    /**
     * 
     * @param {Array} sevices 
     * @returns {Array}
     */
    serealize(sevices) {
        let servV = []
        sevices.forEach((serv, index) => {
            servV.push({
                id: index + 1,
                _id: serv._id,
                title: serv.title,
                cover: serv.cover,
                description: serv.description,
                categorie: {
                    _id: serv.cat_id._id,
                    name: serv.cat_id.name,
                },
                created_at: (new Date(serv.created_at)).toLocaleString(),
            })
        });

        return servV
    }
}