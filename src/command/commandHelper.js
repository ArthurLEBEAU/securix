/**
 * 
 * @param {String} cname
 * @param {Boolean} api
 * @returns {String}
 */
function getControllerContent(cname, api = true) {
    let methods = ''
    if (api) methods = getMehode(cname)
    return ` import { HttpResponse } from '../helpers/helper.js';
        import { ${cname} } from '../models/index.js';
        
        export default class ${cname}Controller {
            constructor() {}
        
            ${methods}
        
            
        }`
}

/**
 * 
 * @param {String} cname
 * @returns {String}
 */
function getMehode(cname) {
    const req = { params: { id: "${req.params.id}" } }
    return `/**
    * return all the ${cname}
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async index(req, res) {
       try {
           let data = await ${cname}.find();
           res.status(HttpResponse.OK);
           return res.send(data);
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           console.log("code error ", error)
           return res.send(error);
       }
   }

   /**
    * insert a ${cname} in the database
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async save(req, res) {

       try {
           const data = await ${cname}.create(req.body);
           res.status(HttpResponse.OK);
           return res.send(data);
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           return res.send({ error });
       }
   }


   /**
    * get a single ${cname} in the database
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async single(req, res) {
       try {
           const data = await ${cname}.findOne({ _id: req.params.id });
           if (data != null) {
               res.status(HttpResponse.OK);
               return res.send({ data: data });
           } else {
               res.status(HttpResponse.NOT_FOUND);
               return res.send({ message: \`${req.params.id} does not corresponde to any ${cname}\` })
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
    * update a ${cname}
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async update(req, res) {

       try {
           let data = await ${cname}.updateOne({ _id: req.params.id }, req.body);
           if (data.modifiedCount == 1 || data.matchedCount == 1) {
               res.status(HttpResponse.OK);
               return res.send({ message: "data modifier avec success!" });
           } else {
               res.status(HttpResponse.NOT_FOUND);
               return res.send({ message: \`${req.params.id} does not corresponde to any data\` })
           }
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           return res.send({ error });
       }
   }

   /**
    * remove a ${cname}
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async remove(req, res) {
       let data = await ${cname}.findOne({ _id: req.params.id });
       if (data == null) {
           res.status(HttpResponse.NOT_FOUND);
           return res.send({ message: \`${req.params.id} does not corresponde to any data\` })
       }
       try {
           await ${cname}.remove({ _id: req.params.id });
           res.status(HttpResponse.OK);
           return res.send({ message: 'one ow removed' });
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           return res.send({ error });
       }
   }`
}

/**
 * 
 * @param {String} vname
 * @returns {String}
 */
function getValidatorContent(vname) {
    return `import Validator from "../Validator.js";

        export default class ${vname}Validator extends Validator {
            constructor() {
                super()
            }
            createSchema = {
                title: {
                    type: 'string',
                    required: true
                }
            }
            putSchema = {
                title: {
                    type: 'string',
                    optinal: true
                }
            }

            validatePost(data) {
                return this.validate(this.createSchema, data)
            }
            validateUpdate(data) {
                return this.validate(this.putSchema, data)
            }
        }`
}

export { getControllerContent, getValidatorContent }