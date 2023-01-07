import Validator from "../Validator.js";

export default class CategoryValidator extends Validator {
    constructor() {
        super()
    }
    createSchema = {
        name: {
            type: 'string',
            required: true
        },
        cat_type: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            optional: true
        }
    }
    putSchema = {
        name: {
            type: 'string',
            optinal: true
        },
        description: {
            type: 'string',
            optional: true
        },
        cat_type: {
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