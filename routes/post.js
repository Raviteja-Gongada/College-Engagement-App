const express = require("express");
const path = require("path");
const router = express.Router();
const {getAllBlogs,getAllNotice,getAllInterview,getAllContent,getEdit,getMypost,postupVote,postdownVote,postUpdate,postdelete} = require('../controllers/postcontroller')
const isAuth = require("../middlewares/isAuth");
const isAuthor = require("../middlewares/isAuthor");

router.get("/blog", getAllBlogs);

router.get("/notice", getAllNotice );

router.get("/interview", getAllInterview);

router.get("/content/:id",getAllContent);

router.get("/edit/:id",getEdit);

router.get('/mypost',getMypost);

router.put("/upvote/:id",postupVote);

router.put("/downvote/:id",postdownVote);

router.put("/update/:id",isAuth,isAuthor,postUpdate);

router.delete("/delete/:id",isAuth,isAuthor,postdelete);

module.exports = router;
