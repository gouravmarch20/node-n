const express = require("express");
const router = express.Router();

const {
    signin, signup
  } = require("../controllers/user.js");

router.post('/signup', signup);
router.post('/signin', signin);

// router.get('/signout', signout);

module.exports = router;
