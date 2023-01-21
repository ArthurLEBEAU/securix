import Schema from "./schema.js";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { collation: { locale: 'en_US', strength: 1 } })

export default UserSchema;