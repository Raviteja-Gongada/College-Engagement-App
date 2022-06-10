const Post = require("../model/post");

exports.getInputForm = (req, res) => {
    res.render("createpost.ejs");
}

exports.createPost = async (req, res) => {
    let category = req.body.gridRadios;
    let {title,description,content} =req.body;
    let user =req.session.user.name;
    let email = req.session.user.email;
    var today = new Date();

    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    var today = date+' '+time;


    try {
        let post
        post = await Post.create({
            title,
            type: category,
            description,
            content,
            author:user,
            email,
            date: today,
            upvote: 0,
            downvote: 0
        })
        if(category=="Blog"){
            res.redirect("/blog");
        }
        else if(category=="Interview"){
            res.redirect("/interview");
        }else if(category=="Notice"){
            res.redirect("/notice");
        }
    } catch (err) {
        console.log(err)
    }
}
