import { Schema,Types,model } from "mongoose";
import { type } from "os";


const requestSchema=new Schema({
status:{
    type:String,
    default:"pending",
    enum:["pending","accepted","rejected"]
},
sender:{
    type:Types.ObjectId,
    ref:"User",
    required:true
   },
   receiver:{
           type:Types.ObjectId,
           ref:"User",
           required:true
          },
   
 

},{
    timestamps:true
})

export const Request = model("Request",requestSchema)