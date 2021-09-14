
const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");


router.get("/", (req, res, next) => {
    res.render("login");
  });


router.get("/signup", (req, res) => {
    res.render("auth/signup");
});



router.post("/signup", async (req, res) => {
    const {username, password, bio, email, photo } = req.body;
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
    await User.create({
        username,
        password: hashedPassword,
        bio,
        email,
        photo,
    });
    res.redirect("/");
});

router.get("/profile/:id", (req, res) => {
    const user = req.session.currentUser;
    res.render("auth/profile", user);
})

router.post("/edit-profile", async (req, res) => {
    const { gender, age, height, weight, disability, activityLevel, expectedDays, workoutGoal } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        gender, 
        age, 
        height, 
        weight, 
        disability, 
        activityLevel, 
        expectedDays, 
        workoutGoal
    })
    res.redirect("profile/")
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