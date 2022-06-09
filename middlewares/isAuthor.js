const Post = require("../model/post");


module.exports = async (req,res,next)=>{
    let post = await Post.findById(req.params.id)
    if(post.email==req.session.user.email){
        next();
    }
    else{
            if(post.type="Blog"){
                res.redirect("/blog");
            }else if(post.type=="Interview"){
                res.redirect("/interview");
            }
    }
}