import mongoose from "mongoose"
import { ContactShema } from "../schemas/index.js"

/**
 * @type {mongoose.Model}
 */
const Contact = mongoose.model('Contacts', ContactShema)
export default Contact