import mongoose from "mongoose";
import Schema from "./schema.js";

const BlogShema = new Schema({
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { collation: { locale: 'en_US', strength: 1 } })

export default BlogShema;