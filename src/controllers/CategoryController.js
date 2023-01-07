 import { HttpResponse } from '../helpers/helper.js';
 import { Category } from '../models/index.js';
 import CategoryValidator from '../validators/Category/CategoryValidator.js';

 export default class CategoryController {
     constructor() {}

     /**
      * return all the Category
      * @param {Express.Request} req 
      * @param {Express.Response} res 
      * @returns Express.res
      */
     async index(req, res) {
         try {
             const filters = req.query.cat_type ? { cat_type: req.query.cat_type } : {}
             let data = await Category.find(filters);
             res.status(HttpResponse.OK);
             return res.send(data);
         } catch (error) {
             res.status(HttpResponse.INTERNAL_SERVER_ERROR);
             console.log("code error ", error)
             return res.send(error);
         }
     }

     /**
      * insert a Category in the database
      * @param {Express.Request} req 
      * @param {Express.Response} res 
      * @returns Express.res
      */
     async save(req, res) {

         const dataVal = (new CategoryValidator()).validatePost(req.body)
         console.log(dataVal)
         if (dataVal.error) {
             res.status(HttpResponse.UNPROCESSABLE_ENTITY);
             return res.send(dataVal);
         }

         try {
             const data = await Category.create(dataVal);
             res.status(HttpResponse.OK);
             return res.send(data);
         } catch (error) {
             res.status(HttpResponse.INTERNAL_SERVER_ERROR);
             return res.send({ error });
         }
     }


     /**
      * get a single Category in the database
      * @param {Express.Request} req 
      * @param {Express.Response} res 
      * @returns Express.res
      */
     async single(req, res) {
         try {
             const data = await Category.findOne({ _id: req.params.id });
             if (data != null) {
                 res.status(HttpResponse.OK);
                 return res.send({ data: data });
             } else {
                 res.status(HttpResponse.NOT_FOUND);
                 return res.send({ message: `${req.params.id} does not corresponde to any Category` })
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
      * update a Category
      * @param {Express.Request} req 
      * @param {Express.Response} res 
      * @returns Express.res
      */
     async update(req, res) {

         const data = (new CategoryValidator()).validateUpdate(req.body)
         if (data.error) {
             res.status(HttpResponse.UNPROCESSABLE_ENTITY);
             return res.send(data);
         }

         try {
             let data = await Category.updateOne({ _id: req.params.id }, data);
             if (data.modifiedCount == 1 || data.matchedCount == 1) {
                 res.status(HttpResponse.OK);
                 return res.send({ message: "data modifier avec success!" });
             } else {
                 res.status(HttpResponse.NOT_FOUND);
                 return res.send({ message: `${req.params.id} does not corresponde to any data` })
             }
         } catch (error) {
             res.status(HttpResponse.INTERNAL_SERVER_ERROR);
             return res.send({ error });
         }
     }

     /**
      * remove a Category
      * @param {Express.Request} req 
      * @param {Express.Response} res 
      * @returns Express.res
      */
     async remove(req, res) {
         let data = await Category.findOne({ _id: req.params.id });
         if (data == null) {
             res.status(HttpResponse.NOT_FOUND);
             return res.send({ message: `${req.params.id} does not corresponde to any data` })
         }
         try {
             await Category.remove({ _id: req.params.id });
             res.status(HttpResponse.OK);
             return res.send({ message: 'one ow removed' });
         } catch (error) {
             res.status(HttpResponse.INTERNAL_SERVER_ERROR);
             return res.send({ error });
         }
     }


 }