const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const app = express();
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"backend/config/config.env"});
}
//using middlewares
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
//importing routes
const post = require("./routes/post");
const user = require("./routes/user");
app.use("/api/v1" , post)
app.use("/api/v1" , user)
module.exports = app;