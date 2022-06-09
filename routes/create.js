const express = require("express");
const path = require("path");
const router = express.Router();
const {getInputForm,createPost} = require("../controllers/createcontroller")
const isAuth = require("../middlewares/isAuth");
router.get("/createpost", isAuth ,getInputForm);

router.post("/createpost",isAuth,createPost);

module.exports = router
