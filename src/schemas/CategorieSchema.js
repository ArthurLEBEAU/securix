import Schema from "./schema.js";

const CategoryShema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cat_type: {
        type: String,
        required: true,
    },
    description: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { collation: { locale: 'en_US', strength: 1 } })

export default CategoryShema;