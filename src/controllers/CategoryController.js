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
             return res.send({ categories: this.serealize(data) });
         } catch (error) {
             res.status(HttpResponse.INTERNAL_SERVER_ERROR);
             return res.send({ error: "une erreur c'est produite!" });
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

         if (dataVal.error) {
             res.status(HttpResponse.UNPROCESSABLE_ENTITY);
             return res.send(dataVal);
         }



         try {
             const cat = await Category.findOne({ name: dataVal.name, cat_type: dataVal.cat_type })
             if (cat) {
                 res.status(HttpResponse.CONFLICT);
                 return res.send({ error: "this categorie is already used!" });
             }
             const data = await Category.create(dataVal);
             res.status(HttpResponse.OK);
             return res.send(data);
         } catch (error) {
             res.status(HttpResponse.INTERNAL_SERVER_ERROR);
             return res.send({ error: "une erreur c'est produite!" });
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
                 return res.send({ message: `${req.params.id} ne correspond à aucune categorie` })
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

             if (data.name && data.cat_type) {
                 const cat = await Category.findOne({ name: data.name, cat_type: data.cat_type })
                 if (cat) {
                     res.status(HttpResponse.CONFLICT);
                     return res.send({ error: "cette categorie existe déja!" });
                 }
             }

             let cat = await Category.updateOne({ _id: req.params.id }, data);

             if (cat.modifiedCount == 1 || cat.matchedCount == 1) {
                 res.status(HttpResponse.OK);
                 return res.send({ message: "une categorie modifier avec success!" });
             } else {
                 res.status(HttpResponse.NOT_FOUND);
                 return res.send({ message: `${req.params.id} ne correspond à aucune categorie` })
             }
         } catch (error) {
             res.status(HttpResponse.INTERNAL_SERVER_ERROR);
             return res.send({ error: "une erreur c'est produite!" });
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
             return res.send({ message: `${req.params.id} ne correspond à aucune categorie` })
         }
         try {
             await Category.deleteOne({ _id: req.params.id });
             res.status(HttpResponse.OK);
             return res.send({ message: 'une categorie supprimer!' });
         } catch (error) {
             res.status(HttpResponse.INTERNAL_SERVER_ERROR);
             return res.send({ error: "une erreur c'est produite!" });
         }
     }

     /**
      * 
      * @param {Array} categories 
      * @returns {Array}
      */
     serealize(categories) {
         let catV = []
         categories.forEach((cat, index) => {
             catV.push({
                 id: index + 1,
                 _id: cat._id,
                 name: cat.name,
                 description: cat.description,
                 type: cat.cat_type,
                 created_at: (new Date(cat.created_at)).toLocaleString(),
             })
         });

         return catV
     }


 }