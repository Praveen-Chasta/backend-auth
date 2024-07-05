const express = require('express');
const adminMiddleware = require("../middleware/admin")
const { Admin, Course } = require('../db');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    await Admin.create({
        username,
        password
    });

    res.json({
        msg: "Admin Created Successfully"
    });
});


router.post('/course', adminMiddleware , async (req,res) => {
    const {title, description, price, imageUrl} = req.body;

    const newCourse =  await Course.create({
        title,
        description,
        price,
        imageUrl
    })

    res.json({
        msg : "Course Create Successfully", courseId : newCourse._id
    })
})

router.get('/course', adminMiddleware, async (req,res) => {
    const response = await Course.find({})

    res.json({
        Courses : response
    })
})

module.exports = router;