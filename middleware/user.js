const { User } = require('../db');

function userCheck(req,res,next){
    
    const username = req.headers.username;
    const password = req.headers.password;


    User.findOne({
        username : username,
        password : password,
    })
    .then(function(value){
        if(value){
            next();
        }
        else{
            res.status(400).json({
                msg : "User Does not Exist"
            })
        }
    })
}


module.exports = userCheck