import mongoose from "mongoose"
import { ServiceSchema } from "../schemas/index.js"

/**
 * @type {mongoose.Model}
 */
const Service = mongoose.model('Service', ServiceSchema)
export default Service