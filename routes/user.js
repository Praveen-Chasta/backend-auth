const express = require("express");
const router = express.Router();
const userMiddleware = require('../middleware/user');
const {User , Course} = require('../db');
const { default: mongoose } = require("mongoose");


router.post('/signup',  (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })

    res.json({
        msg : "User Created Successfully"
    })

});

router.get('/course', async (req,res) => {
    const response = await Course.find({});

    res.json({
        Course : response
    })
})

router.post('/course/:courseId', userMiddleware, async(req,res) => {
    const username = req.headers.username;
    const courseId = req.params.courseId;

    await User.updateOne({
        username : username,
    },{
        "$push" : {
            purchasedCourse : courseId
        }
    })

    res.json({
        message: "Purchase complete!"
    })

})

router.get('/purchasedCourse', userMiddleware, async (req,res) => {
    
    const user = await User.findOne({
        username : req.headers.username
    })
    
    console.log(user.purchasedCourse);
    const courses = await Course.find({
        _id : {
            "$in" : user.purchasedCourse
        }
    })
    console.log(courses);
    res.json({
        Courses : courses
    })
})

module.exports = router