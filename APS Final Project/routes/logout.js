const express = require("express");
const router = express.Router();
const assert = require('assert');

router.get("/", (req, res, next)=>{
    // logout
    global.db.run("UPDATE studentAccounts SET account_active=? WHERE account_active=?", [0,1],
    function (err)
    {
        if (err) next(err); // error handling  
        else {
            global.db.run("UPDATE instructorAccounts SET account_active=? WHERE account_active=?", [0,1],
            function (err)
            {
                if (err) next(err); // error handling  
                else res.redirect('/');  // redirect
            });
        }
    });
});

// Export the router object so index.js can access it
module.exports = router;