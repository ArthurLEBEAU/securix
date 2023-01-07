import 'dotenv/config';
import nunjucks from 'nunjucks'
import bodyParser from 'body-parser';
import express from 'express';
import routeApi from './src/routes/api.js';
import webApi from './src/routes/web.js';
import DBConnexion from './src/db/dbCon.js';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';
import createHandler from 'express-error-handler';

// to et the file name
const __filename = fileURLToPath(
    import.meta.url);

// to et the directory path name
const __dirname = path.dirname(__filename);

// initiate the express app
const app = express();

// get the db connexion
const db = new DBConnexion()

// connect to the db
await db.createConnection()

// all allowed origin
var allowedOrigins = ['http://127.0.0.1:5500/'];


// for parsing application/json
app.use(bodyParser.json())

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// use cors
app.use(cors({}));

// register views
app.set('views', './src/views')

// set public path
app.use('/static', express.static(path.join(__dirname, 'public')))

// set view engine conf
nunjucks.configure('./src/views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

// file save configuration
app.use(fileUpload())

const handler = createHandler({
    handlers: {
        '404': '404.njk'
    }
});

// register routes
app.use(webApi)
app.use('/api', routeApi)

// Handle all unhandled errors:


// lauch the server on the specific prot
app.listen(process.env.PORT || 3001, () => {
    console.log(`server is listening to port ${process.env.PORT}`)
});