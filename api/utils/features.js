import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import {v4 as uuid} from "uuid";
import { getBase64 } from "../lib/helper.js";
export const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECREAT);
  const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  };

  return res.status(code).cookie("access_token", token, cookieOptions).json({
    success: true,

    user,
    message,
  });
};

export const errorShow = (err, req, res, next) => {
  console.log(err.message);

  // Set default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific MongoDB duplicate key error
  if (err.code === 11000) {
      const errorField = Object.keys(err.keyPattern).join(",");
      statusCode = 400;
      message = `Duplicate field: ${errorField}`;
  }
  if(err.name === 'CastError'){
   err.message= `Invalid Fromat of ${err.path}`;
    statusCode = 400;
  }

  res.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      message: process.env.NODE_ENV === 'DEVELOPMENT' ? err :err.message,
  });
};


   export const emitEvent = (req,event,users,data)=>{
         console.log("emiiting events",event)
   }

   export const deleteFileFromCloudainary = async (public_ids)=>{
    
   }
export const uploadCloudainary = async (files=[])=>{
  try {
    const uploadPromises = files.map((file)=>{
      return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(getBase64(file),{
          resource_type:"auto",
          public_id:uuid()
        },(err,result)=>{
          if(err) return reject(err);
          resolve(result);
        })
      })
    })

    const results = await Promise.all(uploadPromises);
    const formattedResults = results.map((result)=>({
      public_id: result.public_id,
      url:result.secure_url,
    }))
    return formattedResults
  } catch (error) {
    throw new Error('Error uploading file: to cloaudinary' + error.message)
  }
}