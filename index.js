
const express = require('express')
const app = express();
const api = require("./routes/api")
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const express = require("express");
const PORT = 3005;


app.use(bodyParser.json());
app.use(cors());

let db1 = `mongodb+srv://Nirav5382:AnstZ8J7IrYTBQ1I@cluster0.hiqgwhr.mongodb.net/?retryWrites=true&w=majority`



let db = "mongodb://localhost:27017/ShareDrive";

mongoose.connect(
    db1,
    err => {
        if (err) {
            console.err("Error" + err);
        } else {
            console.log("connected to mongodb");
        }
        app.use("", api);
    }
);

app.listen(process.env.PORT || PORT, () => {
    console.log("server running on local host:" + PORT);
});