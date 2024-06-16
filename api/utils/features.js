
import jwt from 'jsonwebtoken';

export const sendToken =(res,user,code,message)=>{
 const token = jwt.sign( {_id:user._id},process.env.JWT_SECREAT)
const cookieOptions = {
    maxAge:15*24*60*60*1000,
    sameSite:"none",
    httpOnly:true,
    secure:true,
}

return res.status(code).cookie("access_token",token,cookieOptions).json({
    success:true,
   
    user,
    message,
})

}