import mongoose from "mongoose"
import { RequestShema } from "../schemas/index.js"

/**
 * @type {mongoose.Model}
 */
const Request = mongoose.model('Requests', RequestShema)
export default Request