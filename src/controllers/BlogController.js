import { HttpResponse } from '../helpers/helper.js';
import { Category } from '../models/index.js';
import { Blog } from '../models/index.js';
import { BlogValidator } from '../validators/index.js';
import FileController from './FileController.js';

export default class BlogController {
    constructor() {}



    /**
     * return all the articles
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async index(req, res) {
        try {
            let articles = await Blog.find().populate("cat_id", "name + _id");
            res.status(HttpResponse.OK);
            return res.send({ articles: this.serealize(articles) });
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
        }
    }

    /**
     * insert an article in the database
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

        data = (new BlogValidator()).validatePost(data)
        if (data.error) {
            res.status(HttpResponse.UNPROCESSABLE_ENTITY);
            return res.send(data);
        }
        // check the category
        const cat = Category.findOne({ _id: data.cat_id });
        if (cat == null) {
            res.status(HttpResponse.NOT_FOUND);
            return res.send({ message: "la categorie n'existe pas!" });
        }
        // check and send the file
        try {
            const sf = await FileController.saveFile(data.cover, 'article')
            if (Object.keys(sf).includes('error')) {
                throw sf
            }
            data.cover = sf.path
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
        }

        try {
            const article = await Blog.create(data);
            res.status(HttpResponse.CREATED);
            return res.send(article);
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
        }
    }


    /**
     * get a single article in the database
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async single(req, res) {
        try {
            const article = await Blog.findOne({ _id: req.params.id }).populate("cat_id", "name + _id");
            if (article != null) {
                res.status(HttpResponse.OK);
                return res.send(article);
            } else {
                res.status(HttpResponse.NOT_FOUND);
                return res.send({ message: `${req.params.id} ne correspond à aucun article` })
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
     * update an article
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

        data = (new BlogValidator()).validateUpdate(data)
        if (data.error) {
            res.status(HttpResponse.UNPROCESSABLE_ENTITY);
            return res.send(data);
        }

        // check the category
        if (data.cat_id) {
            const cat = Category.findOne({ _id: data.cat_id });
            if (cat == null) {
                res.status(HttpResponse.NOT_FOUND);
                return res.send({ message: "la categorie n'existe pas!" });
            }
        }
        if (req.files) {
            data['cover'] = req.files.cover
            try {
                const sf = await FileController.saveFile(data.cover, 'article')
                if (Object.keys(sf).includes('error')) {
                    throw sf
                }
                path = sf.path
            } catch (error) {
                res.status(HttpResponse.INTERNAL_SERVER_ERROR);
                return res.send({ error });
            }
        }

        try {
            if (path != "") data.cover = path
            let article = await Blog.updateOne({ _id: req.params.id }, data).populate("cat_id", "name + _id");
            if (article.modifiedCount == 1 || article.matchedCount == 1) {
                res.status(HttpResponse.OK);
                return res.send({ message: "article modifié avec success!" });
            } else {
                res.status(HttpResponse.NOT_FOUND);
                return res.send({ message: `${req.params.id} ne correspond à aucun article!` })
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

        let article = await Blog.findOne({ _id: req.params.id });
        if (article == null) {
            res.status(HttpResponse.NOT_FOUND);
            return res.send({ message: `${req.params.id} ne correspond à aucun article!` })
        }
        try {
            let rs = FileController.dropFile(article.cover)
            if (rs == null) {
                await Blog.remove({ _id: req.params.id });
            } else {
                return res.send({ message: rs.error });
            }
            res.status(HttpResponse.OK);
            return res.send({ message: 'un article supprimer!' });
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
                resume: serv.resume,
                content: serv.content,
                categorie: {
                    _id: serv.cat_id._id,
                    name: serv.cat_id.name,
                },
                updated_at: (new Date(serv.updated_at)).toLocaleString(),
            })
        });

        return servV
    }
}