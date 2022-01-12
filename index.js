const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

require('dotenv').config();

require('./utils/connectdb');
require('./strategies/jwt');
require('./strategies/local');
require('./auth');

const userRouter = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

app.use(passport.initialize());

app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log("App started at port:", PORT);
})