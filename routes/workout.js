const router = require("express").Router();
var axios = require("axios").default;
const Workout = require("../models/Workout.model");

var getAllExercise = {
  method: "GET",
  url: `https://exercisedb.p.rapidapi.com/exercises`,
  headers: {
    "x-rapidapi-host": "exercisedb.p.rapidapi.com", // process.env.API_HOST
    "x-rapidapi-key": "5c69d9ad7fmsh37f71ce5cfc1d4dp1c82bfjsn3abce3514042", //  process.env.API_KEY
  },
};

// var getById = {
//   method: 'GET',
//   url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${ID}`,
//   headers: {
//     'x-rapidapi-host': 'exercisedb.p.rapidapi.com', // process.env.API_HOST
//     'x-rapidapi-key': '5c69d9ad7fmsh37f71ce5cfc1d4dp1c82bfjsn3abce3514042' //  process.env.API_KEY
//   }
// };

function getById(ID) {
  var getById = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${ID}`,
    headers: {
      "x-rapidapi-host": "exercisedb.p.rapidapi.com", // process.env.API_HOST
      "x-rapidapi-key": "5c69d9ad7fmsh37f71ce5cfc1d4dp1c82bfjsn3abce3514042", //  process.env.API_KEY
    },
  };
  return axios.request(getById).then(function (response) {
    const exec = response.data;
    return exec;
  });
}

function getByMuscle(muscle) {
  var getByMuscle = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/target/${muscle}`,
    headers: {
      "x-rapidapi-host": "exercisedb.p.rapidapi.com", // process.env.API_HOST
      "x-rapidapi-key": "5c69d9ad7fmsh37f71ce5cfc1d4dp1c82bfjsn3abce3514042", //  process.env.API_KEY
    },
  };
  console.log("test", getByMuscle);
  return axios.request(getByMuscle).then(function (response) {
    const exec = response.data;
    return exec;
  });
}

// function workoutID(workout) {
//   for (object of workout) {
//     object.exercise1 = getById(object.exercise1)
//   }
//   console.log(object.exercise1);
// }

router.get("/listexercise", (req, res, next) => {
  axios
    .request(getAllExercise)
    .then(function (response) {
      // console.log(response.data);
      const exec = response.data;
      res.render("workout/list", { exec });
    })
    .catch(function (error) {
      console.error(error);
    });

  // res.render("list", { getAllExercise });
});

router.get("/create-workout", (req, res, next) => {
  axios
    .request(getAllExercise)
    .then(function (response) {
      const exec = response.data;
      res.render("workout/workout-create", { exec });
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.post("/create-workout", async (req, res) => {
  const { title, description, workoutGoals } = req.body;
  await Workout.create({ title, description, workoutGoals });

  res.redirect("workout-list");
});

router.get("/workout/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  axios
    .request(getAllExercise)
    .then(function (response) {
      const exec = response.data;

      res.render("workout/add-exercise", { exec, id: req.params.id, workout });
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.post("/workout/:id/filter", async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  const target = req.body.target;
//   console.log("target", target);
  const selectedMuscle = await getByMuscle(target);

  res.render("workout/add-exercise", { exec: selectedMuscle, id: req.params.id, workout });
});

router.post("/workout/:id", async (req, res) => {
  const { exercise } = req.body;

  const exerciseFromApi = await getById(exercise);

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

router.get("/workout-list", async (req, res, next) => {
  const workouts = await Workout.find();

  res.render("workout/workout-list", { workouts });
});

router.get("/workout-detail/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.render("workout/workout-detail", workout);
});

// for (obj of workouts) {
//   var fin = await getById(obj.exercise1)
//   console.log(fin);
// }

// router.get("/equipment", (req, res, next) => {
//   axios.request(getALlExercise).then(function (response) {
//     console.log(response.data);
//   }).catch(function (error) {
//     console.error(error);
//   });

//   res.render("list");
// });

module.exports = router;

// const {exercise} = req.body

// // get exercise by name from api

// const exerciseFromApi = await axios.get("someurlwithstringinterpolation");

// await Workout.findByIdAndUpdate('idoftheworkout', {
//   $push: {exercise: exerciseFromApi }
// });
