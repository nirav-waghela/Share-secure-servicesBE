const groupSchema = require('../models/group')
class GroupOperation{
    createGroup(values){
            let {
                groupName,
                groupDescription,
                groupCategory,
                user
            } = values;
    
            return new Promise((resolve, reject) => {
                let GroupSchema = new groupSchema();
                GroupSchema.eventName = groupName;
                GroupSchema.eventDescription = groupDescription;
                GroupSchema.eventDuration = groupCategory;
                GroupSchema.user = user;
                GroupSchema.save((error, eventsave) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ success: true , message:"Group created Successfully",groupDetails:eventsave});
                    }
                });
            });
    }
}

exports.module = GroupOperation