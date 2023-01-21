import { HttpResponse } from '../helpers/helper.js';
import { Blog, Category, Contact, Request, Service } from '../models/index.js';

export default class AdminController {
    constructor() {}

    /**
     * return the admin home page
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async home(req, res) {
            let data = {
                articles: await Blog.count(),
                services: await Service.count(),
                msg: await Contact.count(),
                faq: await Request.count(),
                date: (new Date()).toLocaleString(),
                username: req.user.username
            }
            res.status(HttpResponse.OK);
            return res.render('admin/index.njk', {...data });
        }
        /**
         * return the category admin page
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @returns Express.res
         */
    async categoryView(req, res) {
        let data = {
            date: (new Date()).toLocaleString(),
            username: req.user.username
        }
        res.status(HttpResponse.OK);
        return res.render('admin/category.njk', {...data });
    }

    /**
     * return the service admin page
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async serviceView(req, res) {
        let data = {
            date: (new Date()).toLocaleString(),
            username: req.user.username,
            categories: await Category.find({ cat_type: 'service' })
        }
        res.status(HttpResponse.OK);
        return res.render('admin/service.njk', {...data });
    }

    /**
     * return the account admin page
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async accountView(req, res) {
        let data = {
            date: (new Date()).toLocaleString(),
            username: req.user.username
        }
        res.status(HttpResponse.OK);
        return res.render('admin/account.njk', {...data });
    }

    /**
     * return the article admin page
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async articleView(req, res) {
        let data = {
            date: (new Date()).toLocaleString(),
            username: req.user.username,
            categories: await Category.find({ cat_type: 'article' })
        }
        res.status(HttpResponse.OK);
        return res.render('admin/article.njk', {...data });
    }

    /**
     * return the contact admin page
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async contactView(req, res) {
            let data = {
                date: (new Date()).toLocaleString(),
                username: req.user.username
            }
            res.status(HttpResponse.OK);
            return res.render('admin/contact.njk', {...data });
        }
        /**
         * return the faq admin page
         * @param {Express.Request} req 
         * @param {Express.Response} res 
         * @returns Express.res
         */
    async faqView(req, res) {
        let data = {
            date: (new Date()).toLocaleString(),
            username: req.user.username
        }
        res.status(HttpResponse.OK);
        return res.render('admin/faq.njk', {...data });
    }

    /**
     * 
     * @param {Array} categories 
     * @returns {Array}
     */
    serealize(categories) {
        let catV = []
        categories.forEach((cat) => {
            catV.push({
                id: cat._id,
                name: cat.name,
                description: cat.description,
                type: cat.cat_type,
                created_at: (new Date(cat.created_at)).toLocaleString(),
            })
        });

        return catV
    }



}