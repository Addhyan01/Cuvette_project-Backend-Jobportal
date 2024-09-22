const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const fs = require("fs");



app.use((req, res, next) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    fs.appendFileSync("log.txt", `${req.method}  ${req.url} ${ip} ${new Date().toISOString()}\n`); 
 


    // console.log(req.method, req.url);
    next();

})
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(process.env.PORT, () => {
    
    console.log("Server is running on port " + process.env.PORT); 
})