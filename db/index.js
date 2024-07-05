const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://PraveenChasta:W4A9w4SqbdRZrqCL@cluster0.zg5y6pc.mongodb.net/Mernstack");


// These are the steps to follow

// Step - 1 => make a schema of user , admin user , course , in mongo db 
// Step - 2 => Export It 

const AdminSchema = new mongoose.Schema({
    username : String,
    password : String,
});


const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourse : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]
});

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String
})

const Admin =  mongoose.model('Admin', AdminSchema);
const User  =  mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}