const express = require("express");
const router = express.Router();
const assert = require('assert');

// Sign Up page
router.get("/", (req, res, next) => {
    res.render("signUpPage");
});

// Sign Up - Student page
router.get("/student", (req, res) => {
    var existingAccount = "false";
    res.render("signUpPage-Student", { existingAccount });   // signUpPage-Student.ejs
});

// Create student account
router.post("/create-student-account", (req, res, next) => {
    // name, email and password
    const { nameInput, emailInput, passwordInput } = req.body;
    var existingAccount = "false";

    // check if email has already been used to sign up
    global.db.all("SELECT * FROM studentAccounts WHERE email_address=?",
        [emailInput],
        function (err, row) {
            if (err) next(err); // error handling
            else {
                if (row.length == 0) {
                    existingAccount = "false";

                    // update student account
                    global.db.run("INSERT INTO studentAccounts (full_name, email_address, account_password, account_active) VALUES (?,?,?,1)",
                        [nameInput, emailInput, passwordInput],
                        function (err) {
                            if (err) next(err); // error handling
                            else res.redirect('/');  // redirect
                        });
                }
                else {
                    existingAccount = "true";
                    res.render("signUpPage-Student", { existingAccount });   // signUpPage-Student.ejs
                }
            }
        });
});

// Sign Up - Instructor page
router.get("/instructor", (req, res) => {
    var existingAccount = "false";
    res.render("signUpPage-Instructor", { existingAccount });   // signUpPage-Instructor.ejs
});

// Create instructor account
router.post("/create-instructor-account", (req, res, next) => {
    // name, email, phone number, password, age, gender, skill, lagnuage, experience, lesson size, lesson type, location, fees, bio
    const { nameInput, emailInput, phoneNumberInput, passwordInput, ageInput, genderInput, skillInput, languageInput, experienceInput,
        lessonSizeInput, lessonTypeInput, locationInput, feesInput, bioInput } = req.body;

    var existingAccount = "false";

    // check if email has already been used to sign up
    global.db.all("SELECT * FROM instructorAccounts WHERE email_address=?",
        [emailInput],
        function (err, row) {
            if (err) next(err); // error handling
            else {
                if (row.length == 0) {
                    existingAccount = "false";

                    // update instructor account
                    global.db.run("INSERT INTO instructorAccounts (full_name, email_address, phone_number, account_password, age, gender, skill, language_medium, experience, lesson_size, lesson_type, lesson_location, fees_range, bio, account_active) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)",
                        [nameInput, emailInput, phoneNumberInput, passwordInput, ageInput, genderInput, skillInput, languageInput, experienceInput,
                            lessonSizeInput, lessonTypeInput, locationInput, feesInput, bioInput],
                        function (err) {
                            if (err) next(err); // error handling
                            else res.redirect('/');  // redirect
                        });
                }
                else {
                    existingAccount = "true";
                    res.render("signUpPage-Instructor", { existingAccount });   // signUpPage-Instructor.ejs
                }
            }
        });
});

// Export the router object so index.js can access it
module.exports = router;