const express = require("express");
const router = express.Router();
const assert = require('assert');

// Home page
router.get("/", (req,res)=>{
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
                    res.render("homePage", {studentActive, instructorActive});     // homePage.ejs
                }
            });
        }
    });
});

// Export the router object so index.js can access it
module.exports = router;