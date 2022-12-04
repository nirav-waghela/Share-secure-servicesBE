const express = require('express')
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const controls = require("../controllers/authenticator.js");
const GroupOperation = require('../controllers/groupOperation');
// const operation = require("../operations/cruds");
// const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(cors());



router.get("/", (req, res) => {
    res.send("from api route");
});

router.post("/signUp", (req, res) => {
    console.log("inside signup")
    const control = new controls();

    let { name, approved, created_at, email, password, role } = req.body;
    control
        .signUp({ name, approved, created_at, email, password, role })
        .then(resp => {
            res.status(200).json(resp);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});


router.post("/login", (req, res) => {
    const control = new controls();

    const userData = req.body;
    return control
        .login(userData)
        .then(resp => {
            res.status(200).json(resp);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

router.get("/getAllUsers", (req,res)=>{
    const control = new controls();
    return control
        .getAllUser()
        .then(resp => {
            res.status(200).json(resp)
            })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.post("/changeStatus",(req,res)=>{
    const control = new controls();
    return control
        .changeUserStatus(req.body)
        .then(resp=>{
            res.status(200).json(resp)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.post("/createGroup", (req,res)=>{
    const control = new controls();
    return control.createGroup(req.body).then(resp => res.status(200).json(resp)).catch(err => res.status(400).json(err))
})

router.post("/changeGroupStatus", (req,res)=>{
    const control = new controls();
    return control.approveGroup(req.body).then(resp => res.status(200).json(resp)).catch(err => res.status(400).json(err))
})

router.post("/getAllGroups", (req,res)=>{
    const control = new controls();
    return control.getAllGroups(req.body).then(resp => res.status(200).json(resp)).catch(err => res.status(400).json(err))
})

// router.post("/createGroup", (req, res)=>{
//     const control
// })

module.exports = router;