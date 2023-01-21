import mongoose from "mongoose"
import { UserSchema } from "../schemas/index.js"
import passportLocalMongoose from 'passport-local-mongoose'
UserSchema.plugin(passportLocalMongoose);


/**
 * @type {mongoose.Model}
 */
const User = mongoose.model('User', UserSchema)
export default User