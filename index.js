const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const fs = require("fs");
const { incomingRequestLogger } = require("./middleware/index.js");
dotenv.config();
const app = express();
const indexrouter = require("./routes/index.js");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");

const { mongo } = require("mongoose");
app.use(incomingRequestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", indexrouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT); 
    mongoose.connect(process.env.MONGOOSE_URI_STRING, {

    });
    mongoose.connection.on("error", (err) => {
        console.log(err);
    });
});