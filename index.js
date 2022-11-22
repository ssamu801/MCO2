import "dotenv/config";

import express from "express";
import db from "./models/db.js";
import routes from "./routes/routes.js";

import path from 'path';
import { fileURLToPath } from "url";

//import passport from "passport";
//import flash from "connect-flash";
//import session from "express-session";

const __filename =  fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;

const app = express();


app.set("view engine", "ejs");
//app.set("views", "./views");

// To access css files
app.use(express.static(__dirname + '/public'));
//app.use('/public', express.static('public'));

// So you can use of req.body
app.use(express.urlencoded({extended: false}));

db.connect();

// Express-session
// app.use(session({
//     secret: "hatdog",
//     resave: true,
//     saveUninitialized: true
// }));

// Passport
//app.use(passport.initialize());
//app.use(passport.session());

// Connect-flash
//app.use(flash());

app.use(`/`, routes);

app.listen(port, function () {
    console.log(`App running at:` + port);
})