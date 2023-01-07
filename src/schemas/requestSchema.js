import Schema from "./schema.js";

const RequestShema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    reponse: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { collation: { locale: 'en_US', strength: 1 } })

export default RequestShema;