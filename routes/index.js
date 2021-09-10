const router = require("express").Router();
var axios = require("axios").default;
const Workout = require("../models/Workout.model")


var getAllExercise = {
  method: 'GET',
  url: `https://exercisedb.p.rapidapi.com/exercises`,
  headers: {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com', // process.env.API_HOST
    'x-rapidapi-key': '5c69d9ad7fmsh37f71ce5cfc1d4dp1c82bfjsn3abce3514042' //  process.env.API_KEY
  }
};

// var getByEquipment = {
//   method: 'GET',
//   url: `https://exercisedb.p.rapidapi.com/equipment`,
//   headers: {
//     'x-rapidapi-host': 'exercisedb.p.rapidapi.com', // process.env.API_HOST
//     'x-rapidapi-key': '5c69d9ad7fmsh37f71ce5cfc1d4dp1c82bfjsn3abce3514042' //  process.env.API_KEY
//   }
// };





/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/listexercise", (req, res, next) => {
  axios.request(getAllExercise).then(function (response) {
    // console.log(response.data);
    const exec = response.data;
    res.render("list",  { exec } );
  }).catch(function (error) {
    console.error(error);
  });

  // res.render("list", { getAllExercise });
 });


 router.get("/create-workout", (req, res, next) => {
  axios.request(getAllExercise).then(function (response) {
    const exec = response.data;
    res.render("workout-create",  { exec } );
  }).catch(function (error) {
    console.error(error);
  });
});

router.post("/create-workout", async (req, res) => {

  const {title, exercise1, exercise2, exercise3} = req.body;
  await Workout.create({ 
    title, exercise1, exercise2, exercise3
  });
  res.redirect("/");
});


router.get("/workout-list", async (req, res, next) => {
  const workouts = await Workout.find();
  await axios.request(getAllExercise).then(function (response) {
    const exec = response.data.
  })
  res.render("workout-list", { workouts } );
});


// router.get("/equipment", (req, res, next) => {
//   axios.request(getALlExercise).then(function (response) {
//     console.log(response.data);
//   }).catch(function (error) {
//     console.error(error);
//   });

//   res.render("list");
// });


module.exports = router;
