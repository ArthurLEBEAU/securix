import Validator from "../Validator.js";

export default class ContactValidator extends Validator {
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
        description: {
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
        description: {
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