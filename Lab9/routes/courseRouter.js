import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).send("Course not found");
        }
        res.send(course);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.send(course);
    } catch (err) {
        res.status(500).send(err);
    }
});

// update number of students
router.patch("/:id", async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!course) {
            return res.status(404).send("Course not found");
        }
        res.send(course);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).send("Course not found");
        }
        res.send(course);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
