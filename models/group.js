const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const groupSchema = new Schema({
    groupName: String,
    groupDescription: String,
    groupCategory : String,
    groupStatus:Boolean,
    issueDate:Date,
    groupOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    groupMembers: Array,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
   
});

module.exports = mongoose.model("group", groupSchema, "groups");