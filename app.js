// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

// Adding more features to hbs
const helpers = require("handlebars-helpers");
hbs.registerHelper(helpers());

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);


//Session stuff
const session = require("express-session");
app.use(
    session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        sameSite: true, //both FE and BE are running on the same hostname
        httpOnly:true, //we are not using https
        maxAge: 300000, //session time - 5 minutes.
    },
    rolling: true, // resets the maxAge when the user interacts with the site
  })
);


function getCurrentLoggedUser(req, res, next) {
    if (req.session && req.session.currentUser) {
        app.locals.loggedInUser = req.session.currentUser.username
    } else {
        app.locals.loggedInUser = "";
    }
    next();
}

function getCurrentUserID(req, res, next) {
    if (req.session && req.session.currentUser) {
        app.locals.loggedInUserID = req.session.currentUser._id
    } else {
        app.locals.loggedInUserID = "";
    }
    next();
}

app.use(getCurrentLoggedUser);
app.use(getCurrentUserID);


// default value for title local
const projectName = "FitHub";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;

// 👇 Start handling routes here
const workout = require("./routes/workout");
app.use("/", workout)
const auth = require("./routes/auth");
app.use("/", auth);
const user = require("./routes/user");
app.use("/", user);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);




module.exports = app;
