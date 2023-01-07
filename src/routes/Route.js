import 'dotenv/config';

import _path from 'node:path';

import express from 'express';

export class Route {

    static routes = express.Router()

    /**
     * 
     * @param {string} path 
     * @param {string} controller 
     * @param {string} methode 
     */
    static async get(path, controller, methode) {
        const cpath = this.getRelativepath(process.env.ROUTE_PATH) + process.env.CONTROLLER_PATH + '/' + controller + '.js';
        try {
            const controller = await
            import (cpath)

            const icontroller = new controller.default();

            this.routes.get(path, (req, res) => {
                icontroller[methode](req, res)
            });

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
    static async post(path, controller, methode) {
        const cpath = this.getRelativepath(process.env.ROUTE_PATH) + process.env.CONTROLLER_PATH + '/' + controller + '.js';
        try {
            const controller = await
            import (cpath)

            const icontroller = new controller.default();

            this.routes.post(path, (req, res) => {
                icontroller[methode](req, res)
            });

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
    static async delete(path, controller, methode) {
        const cpath = this.getRelativepath(process.env.ROUTE_PATH) + process.env.CONTROLLER_PATH + '/' + controller + '.js';
        try {
            const controller = await
            import (cpath)

            const icontroller = new controller.default();

            this.routes.delete(path, (req, res) => {
                icontroller[methode](req, res)
            });

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
    static async patch(path, controller, methode) {
        const cpath = this.getRelativepath(process.env.ROUTE_PATH) + process.env.CONTROLLER_PATH + '/' + controller + '.js';
        try {
            const controller = await
            import (cpath)

            const icontroller = new controller.default();

            this.routes.patch(path, (req, res) => {
                icontroller[methode](req, res)
            });

        } catch (error) {
            console.error("erreur sur le controlleur : ", error);
        }
    }

    /**
     * 
     * @param {string} path
     * @returns {string} 
     */
    static getRelativepath(path) {
        const root = _path.resolve('./')
        const i = _path.resolve(path).split(root)[1].split('\\').join('/').slice(1).split('/')
        let res = ''
        for (let index = 0; index < i.length; index++) {
            res += "../"

        }
        return res;
    }
}