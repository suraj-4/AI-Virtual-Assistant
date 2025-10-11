import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    email : {
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    assistantName:{
        type:String
    },
    assistantImage:{
        type:String
    },
    history:[
        {
            type:String
        }
    ]
}, {timestamps:true})

const User = mongoose.model("User", userSchema);

export default User;