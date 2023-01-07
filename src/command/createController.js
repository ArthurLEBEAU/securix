import fs from 'fs'
import 'dotenv/config';
import path from 'path';
import { getControllerContent } from './commandHelper.js';

const cname = (process.argv)[2]
const api = (process.argv)[3] ? true : false
const directory = `${path.dirname('src')}/${process.env.CONTROLLER_PATH}/`
const filePath = `${directory}${cname}controller.js`

if (fs.existsSync(directory)) {
    try {
        fs.appendFileSync(filePath, getControllerContent(cname, api));
        console.log('file created successfuly!!')
    } catch (error) {
        console.log(error)
    }
} else {
    console.log("this directory does not exist")
}