import Validator from "../Validator.js";

export default class ServiceValidator extends Validator {
    constructor() {
        super()
    }
    createSchema = {
        title: {
            type: 'string',
            required: true
        },
        cover: {
            type: 'any',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        cat_id: {
            type: 'string',
            required: true
        }
    }
    putSchema = {
        title: {
            type: 'string',
            optional: true
        },
        cover: {
            type: 'string',
            optional: true
        },
        description: {
            type: 'string',
            optional: true
        },
        cat_id: {
            type: 'string',
            optional: true
        },
    }

    validatePost(data) {
        return this.validate(this.createSchema, data)
    }
    validateUpdate(data) {
        return this.validate(this.putSchema, data)
    }
}