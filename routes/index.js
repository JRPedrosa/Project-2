const router = require("express").Router();
var axios = require("axios").default;


var getALlExercise = {
  method: 'GET',
  url: `https://exercisedb.p.rapidapi.com/exercises`,
  headers: {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com', // process.env.API_HOST
    'x-rapidapi-key': '5c69d9ad7fmsh37f71ce5cfc1d4dp1c82bfjsn3abce3514042' //  process.env.API_KEY
  }
};

var getByEquipment = {
  method: 'GET',
  url: `https://exercisedb.p.rapidapi.com/equipment`,
  headers: {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com', // process.env.API_HOST
    'x-rapidapi-key': '5c69d9ad7fmsh37f71ce5cfc1d4dp1c82bfjsn3abce3514042' //  process.env.API_KEY
  }
};





/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/listexercise", (req, res, next) => {
  axios.request(getALlExercise).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

  res.render("list");
});


router.get("/equipment", (req, res, next) => {
  axios.request(getALlExercise).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

  res.render("list");
});


module.exports = router;
