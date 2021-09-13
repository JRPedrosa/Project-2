const router = require("express").Router();
var axios = require("axios").default;
const Workout = require("../models/Workout.model");


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


router.get("/listexercise", async (req, res, next) => {  //General exercise list
  const allExercises = await getAllExercises();

  res.render("workout/exercise-list", { allExercises });
});



router.get("/create-workout", async (req, res, next) => { //First step in creating workout
  res.render("workout/workout-create");
});



router.post("/create-workout", async (req, res) => {  //Workout created, redirects to the list of workouts
  const { title, description, workoutGoals } = req.body;
  await Workout.create({ title, description, workoutGoals });

  res.redirect("workout-list");
});



router.get("/workout/:id", async (req, res) => {     //General page for adding exercises
  const workout = await Workout.findById(req.params.id);
  const allExercises = await getAllExercises();

  res.render("workout/add-exercise", { allExercises, id: req.params.id, workout });
});



router.post("/workout/:id/filter", async (req, res) => {  //Filter by muscles
  const workout = await Workout.findById(req.params.id);
  const target = req.body.target;
  const selectedMuscle = await getByMuscle(target);

  res.render("workout/add-exercise", { allExercises: selectedMuscle, id: req.params.id, workout, target });
});



router.post("/workout/:id", async (req, res) => { //The act of adding an exercise. Redirects to the general page for adding exercises.
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



router.get("/workout-list", async (req, res, next) => {  //List of workouts
  const workouts = await Workout.find();

  res.render("workout/workout-list", { workouts });
});



router.get("/workout-detail/:id", async (req, res) => {  //Specific workout details
  const workout = await Workout.findById(req.params.id);
  res.render("workout/workout-detail", workout);
});




router.get("/listexercise/:id", async (req, res) => {   //Specific exercise details
    const exercise = await getById(req.params.id);
    res.render("workout/exercise-detail", exercise);
  });


router.post("/workout-delete/:id", async (req, res) => {   //Delete workouts from the workout list.
  await Workout.findByIdAndDelete(req.params.id);
  res.redirect("/workout-list");
});



module.exports = router;

