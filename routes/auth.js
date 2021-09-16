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


router.post("/login", async (req, res) => {
    const {username, password } = req.body;

    if (username === "" || password === "") {
        res.render("auth/login", { errorMessage: "Fill username and password"});
        return;
    }

    const user = await User.findOne({ username });
    if (user === null) {
        //user doesn't exist
        res.render("auth/login", { errorMessage: "Invalid login"});
        return;
    }

    if (bcrypt.compareSync(password, user.password)) {
        //password matches - login successful
        req.session.currentUser = user;
        res.redirect("workout-list");
    } else {
        res.render("auth/login", { errorMessage: "Invalid login"});
    }
    
});






router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});



module.exports = router;