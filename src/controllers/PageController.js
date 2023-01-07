import { HttpResponse } from '../helpers/helper.js';
import { Blog, Category } from '../models/index.js';
import { Request } from '../models/index.js';
import { Service } from '../models/index.js';

export default class PageController {
    constructor() {}

    /**
     * return the home page
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async home(req, res) {
            let articles = await Blog.find();
            let services = await Service.find().populate('cat_id', "name + _id");
            if (services) {
                services = services.filter((it, i) => i < 4)
            }
            if (articles) {
                articles = articles.filter((it, i) => i < 6)
            }
            res.status(HttpResponse.OK);
            return res.render('index.njk', { articles, services });
        }
        /**
         * return the blog page
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @returns Express.res
         */
    async blog(req, res) {
            const pageNumber = parseInt(req.query.pageNumber) || 1;
            const limit = parseInt(req.query.limit) || 6;
            const totalPosts = await Blog.countDocuments().exec();
            let startIndex = (pageNumber - 1) * limit;
            let articles = await Blog.find().sort("-_id")
                .skip(startIndex)
                .limit(limit)
                .exec();

            const resData = {
                articles,
                pages: pageNumber,
                numberOfLinks: (totalPosts / limit)
            }
            res.status(HttpResponse.OK);
            return res.render('global/blog.njk', {...resData });
        }
        /**
         * return the faq page
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @returns Express.res
         */
    async faq(req, res) {
            let questions = await Request.find();
            res.status(HttpResponse.OK);
            return res.render('global/faq.njk', { questions: questions });
        }
        /**
         * return the contact page
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @returns Express.res
         */
    contact(req, res) {
            res.status(HttpResponse.OK);
            return res.render('global/contact.njk');
        }
        /**
         * return the sevice page
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @returns Express.res
         */
    async service(req, res) {
            let categories = await Category.find();

            const pageNumber = parseInt(req.query.pageNumber) || 1;
            let active_category = req.query.active_category || 'all';
            const limit = parseInt(req.query.limit) || 6;
            let startIndex = (pageNumber - 1) * limit;
            let services = []
            let count = 0


            if (categories) {
                categories = categories.filter((it, i) => it.cat_type == "service")
                active_category = categories.filter((it, i) => it.name == active_category)
                if (active_category.length == 0) active_category = "all"
                const filter = active_category == "all" ? {} : { cat_id: active_category[0]._id }
                active_category = active_category == "all" ? "all" : active_category[0].name
                count = await Service.countDocuments(filter).exec();
                services = await Service.find(filter).sort("-_id")
                    .skip(startIndex)
                    .limit(limit)
                    .populate("cat_id", "name + _id")
                    .exec();
            }


            const resData = {
                services,
                pages: pageNumber,
                active_category,
                numberOfLinks: count / limit
            }
            res.status(HttpResponse.OK);
            return res.render('global/service.njk', {...resData, categories });
        }
        /**
         * return the about page
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @returns Express.res
         */
    about(req, res) {
            res.status(HttpResponse.OK);
            return res.render('global/about.njk');
        }
        /**
         * return the sevice page
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @returns Express.res
         */
    async single(req, res) {
        const article = await Blog.findOne({ _id: req.params.id }).populate("cat_id", "name + _id");
        let articles = await Blog.find({ cat_id: article.cat_id._id }).populate("cat_id", "name + _id");
        if (article != null) {
            res.status(HttpResponse.OK);
            return res.render('global/single.njk', { article, articles });
        } else {
            res.status(HttpResponse.NOT_FOUND);
            return res.render('global/blog.njk');
        }
    }

    /**
     * return the notFound page
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async NotFound(req, res) {
        res.status(HttpResponse.NOT_FOUND);
        return res.render('404.njk', { url: req.url });
    }


}