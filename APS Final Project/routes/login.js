const express = require("express");
const router = express.Router();
const assert = require('assert');

// Login page
router.get("/", (req, res, next)=>{
    res.render("loginPage");     // loginPage.ejs
});

// Login page - Student
router.get("/student", (req, res, next)=>{
    var validAccount = "valid";
    res.render("loginPage-Student", {validAccount});   // loginPage-Student.ejs
});

// Check student login
router.post("/check-student-account", (req, res, next)=> {
    // email and password
    const {emailInput, passwordInput} = req.body;
    var validAccount = "invalid";

    // check if email and password exist
    global.db.all("SELECT * FROM studentAccounts WHERE email_address=? AND account_password=?", 
    [emailInput, passwordInput], 
    function (err, row)
    {
        if (err) next(err); // error handling
        else {
            if(row.length == 1)
            {
                validAccount = "valid";
                // update student account
                global.db.run("UPDATE studentAccounts SET account_active=?",
                [1],
                function (err)
                {
                    if (err) next(err); // error handling  
                    else res.redirect('/');
                });
            }
            else
            {
                validAccount = "invalid";
                res.render("loginPage-Student", {validAccount});   // loginPage-Student.ejs
            }
        }
    });
});

// Login page - Instructor
router.get("/instructor", (req, res, next) => {
    var validAccount = "valid";
    res.render("loginPage-Instructor", {validAccount});   // loginPage-Instructor.ejs
});

// Check instructor login
router.post("/check-instructor-account", (req, res, next)=> {
    // email and password
    const {emailInput, passwordInput} = req.body;
    var validAccount = "invalid";

    // check if email and password exist
    global.db.all("SELECT * FROM instructorAccounts WHERE email_address=? AND account_password=?", 
    [emailInput, passwordInput], 
    function (err, row)
    {
        if (err) next(err); // error handling
        else {
            if(row.length == 1)
            {
                validAccount = "valid";
                // update article
                global.db.run("UPDATE instructorAccounts SET account_active=?",
                [1],
                function (err)
                {
                    if (err) next(err); // error handling  
                    else res.redirect('/');
                });
            }
            else
            {
                validAccount = "invalid";
                res.render("loginPage-Instructor", {validAccount});   // loginPage-Instructor.ejs
            }
        }
    });
});

// Export the router object so index.js can access it
module.exports = router;