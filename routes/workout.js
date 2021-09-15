const router = require("express").Router();
var axios = require("axios").default;
const Workout = require("../models/Workout.model");
const User = require("../models/User.model");
const Like = require('../models/Like.model');

function requireLogin(req, res, next) {
  if (req.session.currentUser) {
      next();
  } else {
      res.redirect("/");
  }
}



// Functions to grab from the API //

function getAllExercises() {
  let getAllExercise = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises`,
    headers: {
      "x-rapidapi-host": process.env.API_HOST,
      "x-rapidapi-key": process.env.API_KEY
    },
  };
  return axios.request(getAllExercise).then(function (response) {
    const exec = response.data;
    return exec;
  });
}

function getById(ID) {
  let getById = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${ID}`,
    headers: {
      "x-rapidapi-host": process.env.API_HOST,
      "x-rapidapi-key": process.env.API_KEY
    },
  };
  return axios.request(getById).then(function (response) {
    const exec = response.data;
    return exec;
  });
}

function getByMuscle(muscle) {
  let getByMuscle = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/target/${muscle}`,
    headers: {
      "x-rapidapi-host": process.env.API_HOST,
      "x-rapidapi-key": process.env.API_KEY
    },
  };
  console.log("test", getByMuscle);
  return axios.request(getByMuscle).then(function (response) {
    const exec = response.data;
    return exec;
  });
}


// ROUTES BEGIN HERE  // 

//General exercise list
router.get("/listexercise", requireLogin, async (req, res, next) => { 
  const allExercises = await getAllExercises();

  res.render("workout/exercise-list", { allExercises });
});


//First step in creating workout
router.get("/create-workout", requireLogin, async (req, res, next) => {
  res.render("workout/workout-create");
});


//Workout created, redirects to the list of workouts
router.post("/create-workout", async (req, res) => {
  const { title, description, workoutGoals } = req.body;
  const workout = await Workout.create({ title, description, workoutGoals, user: req.session.currentUser });
  const id = workout.id;
  res.redirect(`workout/${id}`);
});


//General page for adding exercises
router.get("/workout/:id", requireLogin, async (req, res) => { 
  const workout = await Workout.findById(req.params.id);
  const allExercises = await getAllExercises();

  res.render("workout/add-exercise", { allExercises, id: req.params.id, workout });
});


//Filter by muscles
router.post("/workout/:id/filter", async (req, res) => { 
  const workout = await Workout.findById(req.params.id);
  const target = req.body.target;
  const selectedMuscle = await getByMuscle(target);

  res.render("workout/add-exercise", { allExercises: selectedMuscle, id: req.params.id, workout, target });
});


//The act of adding an exercise. Redirects to the general page for adding exercises.
router.post("/workout/:id", async (req, res) => { 
  const exerciseID  = req.body.exercise;
  const exerciseFromApi = await getById(exerciseID);

  const day = req.body.day;
  const sets = req.body.sets;
  const reps = req.body.reps;

  exerciseFromApi.sets = sets;
  exerciseFromApi.reps = reps;
  exerciseFromApi.day = day;

  await Workout.findByIdAndUpdate(req.params.id, {
    $push: { exercises: exerciseFromApi },
  });

  res.redirect(`/workout/${req.params.id}`);
});


//Main list of workouts
router.get("/workout-list", requireLogin, async (req, res, next) => {  
  const workouts = await Workout.find().populate("user");

  res.render("workout/workout-list", { workouts });
});

// FILTER for main list of workouts
router.post("/workout-list", async (req, res) => {
  const filter = req.body.workoutGoals;
  const selectedWorkouts = await Workout.find({workoutGoals: filter}).populate("user");

  res.render("workout/workout-list", {workouts: selectedWorkouts})


})


//Specific workout details
router.get("/workout-detail/:id", requireLogin, async (req, res) => { 
  const workout = await Workout.findById(req.params.id);
  res.render("workout/workout-detail", workout);
});



//Specific exercise details
router.get("/listexercise/:id", requireLogin, async (req, res) => { 
    const exercise = await getById(req.params.id);
    res.render("workout/exercise-detail", exercise);
  });



//Delete workouts from the my workouts private list,
router.post("/workout-delete/:id", async (req, res) => {  
  await Workout.findByIdAndDelete(req.params.id);
  res.redirect(`/my-workouts/${req.session.currentUser._id}`);
});



// LIKE BUTTON
router.post("/workout/:id/like", async (req, res) => { 
  try {
    const user = await User.findById(req.session.currentUser._id); 
    const workout = await Workout.findById(req.params.id);

    const existingLike = await Like.findOne({
      user: user,
      workout: workout,
    });

    if (!existingLike) {
      const like = await Like.create({
        user,
        workout
      });
      await Workout.findByIdAndUpdate(req.params.id, {
        $push: {
          like: like
        }
      })
    } else {
      //Delete like
    }
   res.redirect("/workout-list");
   } catch (e) {
  res.render('error');
  console.log(`An error occurred ${e}`);
  } 
});

// REVIEWS
router.post("/workout/:id/comment", async (req, res) => { 
  const comment  = req.body.comment;
  const name = req.session.currentUser.username;

  await Workout.findByIdAndUpdate(req.params.id, {
    $push: { reviews: { name, comment } },
  });
  res.redirect("/workout-list");
}); 



module.exports = router;

