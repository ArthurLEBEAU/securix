import 'dotenv/config'

import mongoose from 'mongoose'
import * as models from '../models/index.js'

/**
 *create an instance of database connexion
 *
 * @export
 * @class DBConnexion
 */
export default class DBConnexion {
    constructor() {
        this.connection = null
        if (process.env.ENV == 'production') {
            this.uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_MDP}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authMechanism=DEFAULT&authSource=${process.env.AUTH_DB}`;
        } else {
            this.uri = `mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

        }
        this.option = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }

    /**
     * 
     * @param {boolean} reset 
     */
    async createConnection(reset = false) {
        try {
            // get the mongoose connexion
            await mongoose.connect(this.uri, this.option)
                .then((c) => {
                    this.connection = c
                    if (reset) this.initDb()
                }).catch((er) => {
                    throw er
                })
            console.log('connexion reussit!!!')
        } catch (error) {
            console.error('connexion refused !!!', error)
        }
    }

    initDb() {
            const d = {...models }
            Object.keys(d).forEach((el, i) => {
                const p = Object.values(d)[i]
                this.connection.model(p.modelName, p.schema)
            })
        }
        /**
         *
         *
         * @memberof DBConnexion
         * @return void
         */
    async removeConnection() {
        if (this.connection == null) return
        this.connection.disconnect().then(() => {
            this.connection = null
            console.log('connection removed !!')
        }).catch(err => {
            console.error('error disconnecting: ' + err)
        })
    }
}
