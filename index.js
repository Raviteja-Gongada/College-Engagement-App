const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session);
//for overriding the post method to put/delete
const methodOverride = require("method-override");
const flash = require('connect-flash');
var csrf = require('csurf');

let port = process.env.PORT || 3000;

const req = require("express/lib/request");

// let csrfProtection = csrf();

//Bodyparser middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

//to make public folder static using express and path module
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

//for MongoDB compass local database we use 
// const MONGODB_URI = "mongodb://localhost:27017/College_App";

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     autoIndex: false, // Don't build indexes
//     poolSize: 10, // Maintain up to 10 socket connections
//     serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//     socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//     family: 4 // Use IPv4, skip trying IPv6
//   };


//to connect MongoDB_URI that we mentioned in the .env file
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true})
        .then(() => {
            console.log("Hurry,MongoDB Atlas connected!!");
            })
        .catch((err) => {
            console.log(err);
            });
       
//to save the session details in the MongoDB
const store = new MongoDBStore({uri: process.env.MONGODB_URI, collection: 'Sessions'});

//for creating a session using exress-session here
app.use(session({secret: "my secret", resave: false, saveUninitialized: false,store: store }));


// middleware for flash messages
app.use(flash());
// app.use(csrfProtection);

//to use isLoggedIn,admin,,username,etc... locally
app.use((req,res,next)=>{
    res.locals.isLoggedIn = req.session.isLoggedIn;
    if(req.session.user){
        res.locals.username =req.session.user.username;
        res.locals.admin=req.session.user.admin;
        res.locals.email=req.session.user.email;
    }
    else{
        res.locals.username =null;
        res.locals.admin=null;
        res.locals.email=null;
    }
    next();
})

app.get("/",(req,res) => {
    res.render("home");
});

const authRoutes = require("./routes/auth");
const createRoutes = require("./routes/create");
const postRoutes = require("./routes/post");

app.use(authRoutes);
app.use(createRoutes);
app.use(postRoutes);


app.listen(port,function(err){
    if(err)
    console.log("Unable to connect server");
    else
    console.log("Hurry,Server connected!!");
});




