import jwt from "jsonwebtoken";

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

export const errorShow = (err, req, res,next)=>{

    const statusCode = err.statusCode || 500;
    const message = err.message;
    res.status(statusCode).json({
       success: false,
       statusCode: statusCode,
       message: message,
    })
   
   }

   export const emitEvent = (req,event,users,data)=>{
         console.log("emiiting events",event)
   }

   export const deleteFileFromCloudainary = async (public_ids)=>{
    
   }