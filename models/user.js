const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    approved: Boolean,
    email: String,
    password: String,
    created_at: Date,
    role:Number
});

module.exports = mongoose.model("user", userSchema, "users");