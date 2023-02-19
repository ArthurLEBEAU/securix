import path from "path"
import fs from "fs"
import UploadedFile from 'express-fileupload'

export default class FileController {
    constructor() {}



    /**
     * save the file in a specifique directory
     * @param {UploadedFile} file 
     * @param {String} _path 
     */
    static async saveFile(file, _directory) {
	    
        const directory = path.dirname('public')+`/public/assets/${_directory}/`;
        const timeStamp = Date.now().toString()
        const filePath = `${directory}${timeStamp}_${file.name}`;
        const fileTypes = /jpeg|jpg|png|PNG|JPEG|JPG/;

        if (file.size > 1000000) {
            return { error: 'le fichier est trop grand.' }
        }
        if (!fileTypes.test(path.extname(file.name))) {
            return { error: "le format de fichier n'est pas supporter." }
        }

        try {
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory)
            }
            await file.mv(filePath);

            return { path: `/assets/${_directory}/${timeStamp}_${file.name}` }

        } catch (error) {
            return { error }
        }
    }

    /**
     * drop a specific the file
     * @param {String} _path 
     */
    static dropFile(_path) {
        const __path = path.dirname('public') + `/public${_path}`
        try {
            if (fs.existsSync(__path)) fs.unlinkSync(__path)

            return null

        } catch (error) {
            return { error: error }
        }
    }
}
