import Validator from "../Validator.js";

export default class RequestValidator extends Validator {
    constructor() {
        super()
    }
    createSchema = {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true
        },
        question: {
            type: 'string',
            required: true
        },
        reponse: {
            type: 'string',
            optional: true
        }
    }
    putSchema = {
        name: {
            type: 'string',
            optional: true
        },
        email: {
            type: 'string',
            optional: true
        },
        question: {
            type: 'string',
            optional: true
        },
        reponse: {
            type: 'string',
            optional: true
        }
    }

    validatePost(data) {
        return this.validate(this.createSchema, data)
    }
    validateUpdate(data) {
        return this.validate(this.putSchema, data)
    }
}