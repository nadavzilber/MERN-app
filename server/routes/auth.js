const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  console.log("/auth");
});

//REGISTER
router.post("/register", async (req, res) => {
  //Validate input
  const { error } = registerValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //Does the user exist?
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) res.status(400).send("Email already exists!");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    videos: [],
  });

  //save it in the DB
  try {
    const savedUser = await user.save();
    res.status(200).send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //Validate input
  const { error } = loginValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //Does the user exist?
  const user = await User.findOne({ email: req.body.email });
  if (!user) res.status(400).send("Email* or password is wrong");

  //Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send("Email or password* is wrong");
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).status(200).send(token);
  // res.send('Logged in!');
});

module.exports = router;
