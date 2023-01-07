import fs from 'fs'
import 'dotenv/config';
import path from 'path';
import { getValidatorContent } from './commandHelper.js';

const vname = (process.argv)[2]
const directory = `${path.dirname('src')}/${process.env.VALIDATOR_PATH}/`

if (fs.existsSync(directory)) {
    if (!fs.existsSync(directory + `${vname}/`)) fs.mkdirSync(directory + `${vname}/`)
    const filePath = `${directory}${vname}/${vname}Validator.js`
    try {
        fs.appendFileSync(filePath, getValidatorContent(vname));
        console.log('validator created successfuly!!')
    } catch (error) {
        console.log(error)
    }
} else {
    console.log("this directory does not exist")
}