import mongoose from "mongoose"
import { BlogSchema } from "../schemas/index.js"

/**
 * @type {mongoose.Model}
 */
const Blog = mongoose.model('Blog', BlogSchema)
export default Blog