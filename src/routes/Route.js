import 'dotenv/config';

import _path from 'node:path';

import express from 'express';

export class Route {


    /**
     * @type {express.Router}
     */
    routes = null

    constructor() {
        this.routes = express.Router()
    }

    /**
     * 
     * @param {string} path 
     * @param {string} controller 
     * @param {string} methode 
     */
    async get(path, controller, methode, isGuad = false) {

        const cpath = this.getRelativepath(process.env.ROUTE_PATH) + process.env.CONTROLLER_PATH + '/' + controller + '.js';
        try {
            const controller = await
            import (cpath)

            const icontroller = new controller.default();

            if (isGuad) {
                this.routes.get(path, this.isLoggedIn.bind(this), (req, res) => {
                    icontroller[methode](req, res)
                });
            } else {
                this.routes.get(path, (req, res) => {
                    icontroller[methode](req, res)
                });
            }

        } catch (error) {
            console.error("erreur sur le controlleur : ", error);
        }
    }

    /**
     * 
     * @param {string} path 
     * @param {string} controller 
     * @param {string} methode 
     */
    async post(path, controller, methode, isGuad = false) {
        const cpath = this.getRelativepath(process.env.ROUTE_PATH) + process.env.CONTROLLER_PATH + '/' + controller + '.js';
        try {
            const controller = await
            import (cpath)

            const icontroller = new controller.default();

            if (isGuad) {
                this.routes.post(path, this.isLoggedIn.bind(this), (req, res) => {
                    icontroller[methode](req, res)
                });
            } else {
                this.routes.post(path, (req, res) => {
                    icontroller[methode](req, res)
                });
            }

        } catch (error) {
            console.error("erreur sur le controlleur : ", error);
        }
    }


    /**
     * 
     * @param {string} path 
     * @param {string} controller 
     * @param {string} methode 
     */
    async delete(path, controller, methode, isGuad = false) {
        const cpath = this.getRelativepath(process.env.ROUTE_PATH) + process.env.CONTROLLER_PATH + '/' + controller + '.js';
        try {
            const controller = await
            import (cpath)

            const icontroller = new controller.default();

            if (isGuad) {
                this.routes.delete(path, this.isLoggedIn.bind(this), (req, res) => {
                    icontroller[methode](req, res)
                });
            } else {
                this.routes.delete(path, (req, res) => {
                    icontroller[methode](req, res)
                });
            }

        } catch (error) {
            console.error("erreur sur le controlleur : ", error);
        }
    }

    /**
     * 
     * @param {string} path 
     * @param {string} controller 
     * @param {string} methode 
     */
    async patch(path, controller, methode, isGuad = false) {
        const cpath = this.getRelativepath(process.env.ROUTE_PATH) + process.env.CONTROLLER_PATH + '/' + controller + '.js';
        try {
            const controller = await
            import (cpath)

            const icontroller = new controller.default();

            if (isGuad) {
                this.routes.patch(path, this.isLoggedIn.bind(this), (req, res) => {
                    icontroller[methode](req, res)
                });
            } else {
                this.routes.patch(path, (req, res) => {
                    icontroller[methode](req, res)
                });
            }

        } catch (error) {
            console.error("erreur sur le controlleur : ", error);
        }
    }

    /**
     * 
     * @param {string} path
     * @returns {string} 
     */
    getRelativepath(path) {
        const root = _path.resolve('./')
        const i = _path.resolve(path).split(root)[1].split('\\').join('/').slice(1).split('/')
        let res = ''
        for (let index = 0; index < i.length; index++) {
            res += "../"

        }
        return res;
    }


    /**
     * return the admin login page
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @param {CallableFunction} next 
     * @returns Express.res
     */
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect("/admin/login");
    }
}