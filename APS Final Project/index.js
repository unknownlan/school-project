// Set up express, bodyparser and EJS
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering
app.use(express.static(__dirname + '/public')); // set location of static files

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});

// Home page
const homeRoute = require('./routes/home');
app.use('/', homeRoute);

// Search Instructor page
const searchRoute = require('./routes/search-instructor');
app.use('/search-instructor', searchRoute);

// Login page
const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

// Logout page
const logoutRoute = require('./routes/logout');
app.use('/logout', logoutRoute);

// Sign Up page
const signUpRoute = require('./routes/sign-up');
app.use('/sign-up', signUpRoute);

// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

