const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const fileUpload = require('../config/cloudinary');
const Workout = require("../models/Workout.model");


function requireLogin(req, res, next) {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect("/");
    }
}


router.get("/edit-profile/:id", requireLogin, (req, res) => {
    const user = req.session.currentUser;
    res.render("users/edit-profile", user);
})

router.post("/edit-profile/:id",fileUpload.single("photo"), async (req, res) => {
    const { gender, age, height, weight, disability, activityLevel, expectedDays, workoutGoals,} = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        gender, 
        age, 
        height, 
        weight, 
        disability, 
        activityLevel, 
        expectedDays, 
        workoutGoals,
    })
    res.redirect(`/profile/${req.params.id}`)
})


router.post("/edit-account/:id",fileUpload.single("photo"), async (req, res) => {
    const {email, bio} = req.body;

    let fileUrlOnCloudinary = "";
    if (req.file) {
        fileUrlOnCloudinary = req.file.path; //the path on cloudinary
    }

    await User.findByIdAndUpdate(req.params.id, {
        photo: fileUrlOnCloudinary,
        email,
        bio,
    })
    res.redirect(`/profile/${req.params.id}`)
})



router.get("/my-workouts/:id", requireLogin, async (req, res) => {
    const workouts = await Workout.find().populate("user");
    const userId = req.params.id;
    res.render("users/my-workouts", { workouts, userId });
})

router.get("/profile/:id", requireLogin, async (req, res) => {
    // const user = await User.findById(req.params.id);
    const user = await User.findById(req.params.id);
    // console.log(user);
    res.render("users/profile", user);
})


router.get("/edit-account/:id", requireLogin, (req, res) => {
    res.render("users/edit-account");
})

router.post("/exercise-delete/:exerciseId/:workoutId", async (req, res) => {  // Bad try at trying to implement the delete a single exercise button
    const exerciseId = req.params.exerciseId;
     await Workout.findByIdAndUpdate(req.params.workoutId, {
        $pull:  { "exercises": { _id: exerciseId}  }
      });  
   
    res.redirect(`/workout/${req.params.workoutId}`)
    })


module.exports = router;