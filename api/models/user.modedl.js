import { Schema,model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema=new Schema({
 name:{
    type:String,
    required:true
 },
 username:{
    type:String,
    required:true,
    unique:true
 },
 password:{
    type:String,
    required:true,
    select:false

 },
 avatar:{
    public_id:{
        type:String,
      
    },
    url:{
        type:String,
       
    }
 },


},{
    timestamps:true
});
userSchema.pre("save", async function(){
   if(!this.isModified('password')) return next();
   this.password= await bcrypt.hash(this.password,10 )
})


export const User = model("User",userSchema)