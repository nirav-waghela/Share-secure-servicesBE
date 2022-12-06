const User = require("../models/user");
const groupSchema  = require("../models/group")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const bbcrypt = require("bcryptjs")


class Controls {
    generatePassword(password) {
        return bcrypt.hash(password, 10);
    }

    getAllUser(){
        console.log("insied gegt all user")
        return new Promise((resolve,reject)=>{
            User.find({},(error,user)=>{
                if (error){
                    reject({
                        status:"error",
                        message:"Server Error"
                    })
                }
                else{
                    resolve(user)
                }
            })
        })
    }

    changeUserStatus(value){

        let {data} = value
        console.log(value,'inside change user')
        return new Promise((resolve,reject)=>{
            User.updateOne({_id:data.id}, {approved:data.approved},(error,user)=>{
                if(error){
                    reject({
                        status:"error",
                        message:error
                    })
                }else{
                    resolve(user)
                }
            })
        })

    }
    
    login(value) {
        let userData = value;
        console.log("inside login")
        return new Promise((resolve, reject) => {
            User.findOne({ email: userData.email }, (error, user) => {
                if (error) {
                    reject({
                        status: "error",
                        message: error
                    });
                } else {
                    if (!user) {
                        reject({
                            meassage: "invalid email"
                        });
                    } else {
                        let cnpass = bbcrypt.compare(userData.password, user.password)
                        console.log(cnpass,"============")
                        // let cnpass = bcrypt.compareSync(
                        //     userData.password,
                        //     user.password
                        // );
                        if (cnpass && user.approved == true) {
                            console.log("approved")
                             let payload = {subject: user._id }
                             let token = jwt.sign(payload, 'itiswhatitis')
                             
                            resolve({
                                "userData": user,
                                success: true,
                                token
                            });
                        }else if(cnpass){
                            resolve({
                                approved:false,
                                message:"Admin needs to approve your request"
                            })
                        }
                        else {
                            reject({
                                success: false,
                                message: "password did not match"
                            });
                        }
                    }
                }
            });
        });
    }

    signUp(value) {
        let { name, approved, created_at, email, password, role } = value;
        return new Promise((resolve, reject) => {
            User.countDocuments({ email }, (err, count) => {
                if (count > 0) {
                    reject({
                        message: "user already exists"
                    });
                } else {
                    let user = new User();
                    user.name = name;
                    user.approved = approved;
                    user.email = email;
                    user.created_at = created_at;
                    user.role = role
                    user.password = password
                    user.save((error,registeredUser)=>{
                        if(error){
                            reject({
                                error:error
                            })
                        }else{
                            resolve({
                                success:true,
                                userDetails:registeredUser
                            })
                        }
                    })
                    // this.generatePassword(password)
                    //     .then(hash => {
                    //         user.password = hash;
                    //         return user;
                    //     })
                    //     .then(user => {
                    //         user.save((error, registeredUser) => {
                    //             if (error) {
                    //                 reject(error);
                    //             } else {
                    //                 resolve({
                    //                     success: true,
                    //                     userDetails:registeredUser
                    //                 });
                    //             }
                    //         });
                    //     });
                }
            });
        });
    }

    createGroup(values){
        let {data} = values
        let {
            groupName,
            groupDescription,
            groupCategory,
            issueDate,
            user
        } = data;
        console.log(values,"inside create group ")

        

        return new Promise((resolve, reject) => {
            let GroupSchema = new groupSchema();
            GroupSchema.groupName = groupName;
            GroupSchema.issueDate = issueDate  
            GroupSchema.groupDescription = groupDescription;
            GroupSchema.groupCategory = groupCategory;
            GroupSchema.groupStatus = false
            GroupSchema.user = user;
            console.log(GroupSchema,"++++++")
            GroupSchema.save((error, eventsave) => {
                console.log(eventsave,"=========")
                if (error) {
                    reject(error);
                } else {
                    resolve({ success: true , message:"Group created Successfully",groupDetails:eventsave});
                }
            });
        });
    }

    approveGroup(values){
        let {data } = values
        let { id,groupStatus } = data
        console.log(values,"inside approve group")
        return new Promise((resolve, reject) => {
            groupSchema.updateOne({_id:id}, {groupStatus:groupStatus},(err,group)=>{
                if(err){
                    reject({
                        message:'Error occured',
                        error:err
                    })
                }else{
                    resolve({
                        success:true,
                        message:"Permission Granted",
                        groupDetails:group
                    })
                }
            })


        })
    }

    getAllGroups(data){
        return new Promise((resolve,reject)=>{
            if(data.data.status === "ALL"){
                groupSchema.find({},(err,allGroups)=>{
                    if(err){
                        reject({
                            error:err,
                            message:"error occured"
                        })
                    }else{
                        resolve({
                            success:true,
                            allGroups:allGroups
                        })
                    }
                })
            }else{
            groupSchema.find({groupStatus:false},(err,allGroups)=>{
                if(err){
                    reject({
                        error:err,
                        message:"error occured"
                    })
                }else{
                    resolve({
                        success:true,
                        allGroups:allGroups
                    })
                }
            })
        }
        })
    }
}
module.exports = Controls;
