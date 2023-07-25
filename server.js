import 'dotenv/config';
import nunjucks from 'nunjucks'
import bodyParser from 'body-parser';
import express from 'express';
import apiRoute from './src/routes/api.js';
import adminRoutes from './src/routes/admin.js';
import webRoute from './src/routes/web.js';
import DBConnexion from './src/db/dbCon.js';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';
import createHandler from 'express-error-handler';
import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from './src/models/index.js';
import session from 'express-session'
// import helmet from 'helmet';

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

// secure header
// app.use(helmet());
app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser(function(user, done) {
    done(null, user._id);
}));
passport.deserializeUser(User.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
}));
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
app.use("/admin", adminRoutes)
app.use("/api", apiRoute)
app.use("/", webRoute)


// lauch the server on the specific prot
app.listen(process.env.PORT || 3001, () => {
    console.log(`server is listening to port http://localhost:${process.env.PORT}`)
});