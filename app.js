const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose-connection");
const expressSession = require("express-session");
const flash = require("connect-flash");
require('dotenv').config()

const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const index = require("./routes/index")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(expressSession({
    resave : false,
    saveUninitialized:false,
    secret : process.env.EXPRESS_SESSION_SECRET,
}));
app.use(flash());

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);
app.use("/",index)


app.listen(3000);