
const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const fileUpload = require('../config/cloudinary');


router.get("/", (req, res, next) => {
    res.render("auth/login");
  });


router.get("/signup", (req, res) => {
    res.render("auth/signup");
});



router.post("/signup", fileUpload.single("photo"), async (req, res) => {
    let fileUrlOnCloudinary = "";
    if (req.file) {
        fileUrlOnCloudinary = req.file.path; //the path on cloudinary
    }

    const {username, password, bio, email,} = req.body;
    if (username === "" || password === "") {
        res.render("auth/signup", { errorMessage: "Fill username and password"});
        return;
    }

    const user = await User.findOne({ username });
    if (user !== null) {
        //found the user, it already exists
        res.render("auth/signup", { errorMessage: "User already exists"});
        return;
    }


    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    console.log("cloud", fileUrlOnCloudinary);

    await User.create({
        username,
        password: hashedPassword,
        bio,
        email,
        photo: fileUrlOnCloudinary
    });

    res.redirect("/");
});

router.get("/profile/:id", (req, res) => {
    const user = req.session.currentUser;
    res.render("users/profile", user);
})

router.post("/edit-profile/:id", async (req, res) => {
    const { gender, age, height, weight, disability, activityLevel, expectedDays, workoutGoals } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        gender, 
        age, 
        height, 
        weight, 
        disability, 
        activityLevel, 
        expectedDays, 
        workoutGoals
    })
    res.redirect(`/profile/${req.params.id}`)
})

// router.get("/login", (req, res) => {         OLD LOGIN ROUTE -> to delete eventually
//     res.render("auth/login");
// });




router.post("/login", async (req, res) => {
    const {username, password } = req.body;

    if (username === "" || password === "") {
        res.render("login", { errorMessage: "Fill username and password"});
        return;
    }

    const user = await User.findOne({ username });
    if (user === null) {
        //user doesn't exist
        res.render("login", { errorMessage: "Invalid login"});
        return;
    }

    if (bcrypt.compareSync(password, user.password)) {
        //password matches - login successful
        req.session.currentUser = user;
        res.redirect("/");
    } else {
        res.render("login", { errorMessage: "Invalid login"});
    }
    
});






router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});



module.exports = router;