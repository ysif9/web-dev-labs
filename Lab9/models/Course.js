import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: String,
    description: String,
    instructor: String,
    price: Number,
    category: String,
    students_enrolled: {type: Number, default: 0},
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
