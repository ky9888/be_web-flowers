import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
       
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        
    },
    role:{
        type:String,
        default:"member"
    }
},{versionKey:false,timestamps:true})
export default mongoose.model("User",userSchema)