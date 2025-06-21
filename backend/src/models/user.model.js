import mongoose from 'mongoose'

const userScheme = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
},{
    timestamps:true
})

const User = mongoose.model("User",userScheme);

export default User