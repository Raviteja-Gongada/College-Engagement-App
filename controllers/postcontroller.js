const Post = require("../model/post");

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Post.find({});
        res.render("blog.ejs", {blogs});
    } catch (err) {
        console.log(err);
    }
};

exports.getAllNotice = async (req, res) => {
    try {
        const notice = await Post.find({});
        res.render("notice.ejs", {notice});
    } catch (err) {
        console.log(err);
    }
};

exports.getAllInterview = async (req, res) => {
    try {
        const Interview = await Post.find({});
        res.render("interview.ejs", {Interview});
    } catch (err) {
        console.log(err);
    }
};

exports.getEdit = async (req,res) => {
    let post 
    try{
        post = await Post.findById(req.params.id);
        res.render("editpost.ejs",{post});
    }catch(err){
        console.log(err);
    }
}

exports.getMypost = async (req,res) => {
    try {
        const mypost = await Post.find({});
        res.render("mypost.ejs", {mypost});
    } catch (err) {
        console.log(err);
    }
}

exports.postupVote = async (req,res) => {
    let post 
    try{
        post = await Post.findById(req.params.id)
        post.upvote = post.upvote+1;
        await post.save();
        if(post.type=="Blog"){
            res.redirect("/blog");
        }else if(post.type=="Interview"){
            res.redirect("/interview");
        }else if(category=="Notice"){
            res.redirect("/notice");
        }
    }catch(err){
        console.log(err);
    }
}


exports.postdownVote = async (req,res) => {
    let post 
    try{
        post = await Post.findById(req.params.id)
        post.downvote = post.downvote+1;
        await post.save();
        if(post.type=="Blog"){
            res.redirect("/blog");
        }else if(post.type=="Interview"){
            res.redirect("/interview");
        }else if(category=="Notice"){
            res.redirect("/notice");
        }
    }catch(err){
        console.log(err);
    }
}


exports.postUpdate = async (req,res) => {
    let post 
    var today = new Date();

    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    var today = date+' '+time;

    var text = req.body.content.split("\n");
    var content = text.join('.</br>');

    try{
        post = await Post.findById(req.params.id)
        post.title=req.body.title;
        post.type=req.body.gridRadios;
        post.description=req.body.description;
        post.content=content;
        post.date=today;
        await post.save();
        if(post.type=="Blog"){
            res.redirect("/blog");
        }else if(post.type=="Interview"){
            res.redirect("/interview");
        }else if(category=="Notice"){
            res.redirect("/notice");
        }
    }catch(err){
        console.log(err);
    }
}



exports.postdelete = async (req,res) => {
    let post 
    try{
        post = await Post.findById(req.params.id)
        let category = post.type;
        await post.remove();
        if(category=="Blog"){
            res.redirect("/blog");
        }else if(category=="Interview"){
            res.redirect("/interview");
        }else if(category=="Notice"){
            res.redirect("/notice");
        }
    }catch(err){
        console.log(err);
    }
}

exports.getAllContent = async (req,res) => {
    let post 
    try{
        post = await Post.findById(req.params.id)
            res.render("display.ejs",{post});
    }catch(err){
        console.log(err);
    }
};

