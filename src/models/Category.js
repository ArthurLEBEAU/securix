import mongoose from "mongoose"
import { CategoryShema } from "../schemas/index.js"

/**
 * @type {mongoose.Model}
 */
const Category = mongoose.model('Category', CategoryShema)
export default Category