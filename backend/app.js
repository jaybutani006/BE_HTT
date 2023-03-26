const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require("dotenv");


// config

dotenv.config({ path: "backend/config/config.env" });

const errorMiddleware = require("./middleware/error");
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route imports

const user = require("./routes/userRoute");
// const payment = require("./routes/paymentRoute");

app.use("/api/v1", user);
// app.use("/api/v1", payment);

// middleware for errors
app.use(errorMiddleware);
app.use(cors)
module.exports = app;