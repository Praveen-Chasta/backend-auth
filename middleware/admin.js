// impoer admin from db folder
// check admin exist or not 

const {Admin} = require('../db');



function adminCheck(req,res,next){

    const username = req.headers.username;
    const password = req.headers.password;

    Admin.findOne({
        username: username,
        password: password,
    })
    .then(function(value){
        if(value){
            next()
        }
        else{
            res.status(400).json({
                msg : "Admin Does not Exist"
            })
        }
    })    
}


module.exports = adminCheck