const express = require("express");
const router = express.Router();
const assert = require('assert');

// Search Instructor page
router.get("/", (req, res) => {
    var studentActive = "false";
    var instructorActive = "false";

    // student accounts
    global.db.all("SELECT * FROM studentAccounts WHERE account_active=?", [1], function (err, row)
    {
        if (err) next(err); // error handling
        else {
            if(row.length == 0)
            {
                studentActive = "false";
            }
            else
            {
                studentActive = "true";
            }
            // instructor accounts
            global.db.all("SELECT * FROM instructorAccounts WHERE account_active=?", [1], function (err, rows)
            {
                if (err) next(err); // error handling
                else 
                {
                    if(rows.length == 0)
                    {
                        instructorActive = "false";
                    }
                    else
                    {
                        instructorActive = "true";
                    }
                    res.render("searchInstructor", {studentActive, instructorActive});     // searchInstructor.ejs
                }
            });
        }
    });
});

// Search Instructor based on search bar
router.get("/based-on-skill", (req, res, next) => {
    var studentActive = "false";
    var instructorActive = "false";
    
    // student accounts
    global.db.all("SELECT * FROM studentAccounts WHERE account_active=?", [1], function (err, row)
    {
        if (err) next(err); // error handling
        else {
            if(row.length == 0)
            {
                studentActive = "false";
            }
            else
            {
                studentActive = "true";
            }
            // instructor accounts
            global.db.all("SELECT * FROM instructorAccounts WHERE account_active=?", [1], function (err, rows)
            {
                if (err) next(err); // error handling
                else 
                {
                    if(rows.length == 0)
                    {
                        instructorActive = "false";
                    }
                    else
                    {
                        instructorActive = "true";
                    }
                }
            });
        }
    });

    // skill
    const { skillPreferred } = req.query;

    // instructor accounts
    global.db.all("SELECT * FROM instructorAccounts WHERE skill LIKE '%" + skillPreferred + "%'", function (err, row) {
        if (err) next(err); // error handling 
        else {
            // searchInstructor-skill.ejs
            res.render("searchInstructor-skill", { instructorAccounts: row, skillPreferred, studentActive, instructorActive });
        }
    })
});

// Search Instructor based on popular skill
router.get("/based-on-skill/:skill", (req, res, next) => {
    var studentActive = "false";
    var instructorActive = "false";
    
    // student accounts
    global.db.all("SELECT * FROM studentAccounts WHERE account_active=?", [1], function (err, row)
    {
        if (err) next(err); // error handling
        else {
            if(row.length == 0)
            {
                studentActive = "false";
            }
            else
            {
                studentActive = "true";
            }
            // instructor accounts
            global.db.all("SELECT * FROM instructorAccounts WHERE account_active=?", [1], function (err, rows)
            {
                if (err) next(err); // error handling
                else 
                {
                    if(rows.length == 0)
                    {
                        instructorActive = "false";
                    }
                    else
                    {
                        instructorActive = "true";
                    }
                }
            });
        }
    });

    // popular skill
    const skillPreferred = req.params.skill;

    // instructor accounts
    global.db.all("SELECT * FROM instructorAccounts WHERE skill LIKE '%" + skillPreferred + "%'", function (err, row) {
        if (err) next(err); // error handling 
        else {
            // searchInstructor-skill.ejs
            res.render("searchInstructor-skill", { instructorAccounts: row, skillPreferred, studentActive, instructorActive });
        }
    })
});


// Search Instructor based on filters
router.get("/filter", (req, res, next) => {
    var studentActive = "false";
    var instructorActive = "false";
    
    // student accounts
    global.db.all("SELECT * FROM studentAccounts WHERE account_active=?", [1], function (err, row)
    {
        if (err) next(err); // error handling
        else {
            if(row.length == 0)
            {
                studentActive = "false";
            }
            else
            {
                studentActive = "true";
            }
            // instructor accounts
            global.db.all("SELECT * FROM instructorAccounts WHERE account_active=?", [1], function (err, rows)
            {
                if (err) next(err); // error handling
                else 
                {
                    if(rows.length == 0)
                    {
                        instructorActive = "false";
                    }
                    else
                    {
                        instructorActive = "true";
                    }
                }
            });
        }
    });

    // lesson size, lesson type, location, fees
    const { lessonSizeInput, lessonTypeInput, locationInput, feesInput, skillPreferred } = req.query;

    // instructor accounts
    global.db.all("SELECT * FROM instructorAccounts WHERE skill LIKE '%" + skillPreferred + "%' AND fees_range=? AND lesson_location=? AND lesson_type=? AND lesson_size=?",
        [feesInput, locationInput, lessonTypeInput, lessonSizeInput],
        function (err, row) {
            if (err) next(err); // error handling 
            else {
                // searchInstructor-skill.ejs
                res.render("searchInstructor-skill", { instructorAccounts: row, skillPreferred, studentActive, instructorActive });
            }
        })
});

// View profile
router.get("/profile", (req, res, next) => {
    // instructor ID
    const { instructorID } = req.query;
    res.redirect(`/search-instructor/profile/${instructorID}`);
});

// View profile
router.get("/profile/:id", (req, res, next) => {
    var studentActive = "false";
    var instructorActive = "false";
    
    // student accounts
    global.db.all("SELECT * FROM studentAccounts WHERE account_active=?", [1], function (err, row)
    {
        if (err) next(err); // error handling
        else {
            if(row.length == 0)
            {
                studentActive = "false";
            }
            else
            {
                studentActive = "true";
            }
            // instructor accounts
            global.db.all("SELECT * FROM instructorAccounts WHERE account_active=?", [1], function (err, rows)
            {
                if (err) next(err); // error handling
                else 
                {
                    if(rows.length == 0)
                    {
                        instructorActive = "false";
                    }
                    else
                    {
                        instructorActive = "true";
                    }
                }
            });
        }
    });
    
    // instructor ID
    const ID = req.params.id;

    // instructor account
    global.db.get("SELECT * FROM instructorAccounts WHERE ID=?", [ID],
        function (err, row) {
            if (err) next(err); // error handling
            else {
                res.render("instructorProfile", { instructor: row, studentActive, instructorActive }); // instructorProfile.ejs
            }
        });
});

// Export the router object so index.js can access it
module.exports = router;