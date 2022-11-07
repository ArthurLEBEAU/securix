import { HttpResponse } from '../helpers/helper.js';
import Categorie from '../models/Categorie.js';
import CreateCategorieValidator from '../validator/createCategorieValidator.js';

export default class CategoryController{
    constructor(){}



    /**
     * return all the categories
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async index(req, res){
        try {
            let cats = await Categorie.all();
            Categorie.db.removeConnection();
            res.status(HttpResponse.OK);
            return res.send(cats);
        } catch (error) {
            Categorie.db.removeConnection();
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send(error);
        }
    }

    /**
     * insert a categorie in the database
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async save(req, res){
        const validate = new CreateCategorieValidator(req.body);
        const data = validate.validate()

        if(Object.keys(data).includes('error')){ 
            res.status(HttpResponse.UNPROCESSABLE_ENTITY);
            return res.send(data)
        };
        try {
            let cats = await Categorie.save(data);
            Categorie.db.removeConnection();
            res.status(HttpResponse.OK);
            return res.send(cats);
        } catch (error) {
            Categorie.db.removeConnection();
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({error});
        }
    }


    /**
     * get a single categorie in the database
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async single(req, res){
        try {
            let cat = await Categorie.getById(req.params.id);
            Categorie.db.removeConnection();
            if(cat.length > 0){
                res.status(HttpResponse.OK);
                return res.send({category: cat[0]});
            }else{
                res.status(HttpResponse.NOT_FOUND);
                return res.send({message: `${req.params.id} does not corresponde to any category`})
            }
        } catch (error) {
            Categorie.db.removeConnection();
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({error});
        }
    }

    /**
     * update a categorie
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
    */
    async update(req, res){
        const validate = new CreateCategorieValidator(req.body);
        const data = validate.validate()

        if(Object.keys(data).includes('error')){ 
            res.status(HttpResponse.UNPROCESSABLE_ENTITY);
            return res.send(data)
        };
        try {
            let cat = await Categorie.update(req.params.id, data);
            Categorie.db.removeConnection();
            if(cat.affectedRows > 0){
                res.status(HttpResponse.OK);
                return res.send(cat);
            }else{
                res.status(HttpResponse.NOT_FOUND);
                return res.send({message: `${req.params.id} does not corresponde to any category`})
            }
        } catch (error) {
            Categorie.db.removeConnection();
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({error});
        }
    }

    /**
     * remove a categorie
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
    */
    async remove(req, res){
        try {
            let cat = await Categorie.delete(req.params.id);
            Categorie.db.removeConnection();
            if(cat.affectedRows > 0){
                res.status(HttpResponse.OK);
                return res.send({message: 'one category removed'});
            }else{
                res.status(HttpResponse.NOT_FOUND);
                return res.send({message: `${req.params.id} does not corresponde to any category`})
            }
        } catch (error) {
            Categorie.db.removeConnection();
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({error});
        }
    }
}