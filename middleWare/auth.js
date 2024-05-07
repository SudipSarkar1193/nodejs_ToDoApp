import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const authenticate = async (req,res,next) =>{
    const {token} = req.cookies;
  
  if(!token) return res.status(404).json(
    {
      success:false,
    
      message:"Authentication error : No user found",
      
    }
  )
  const decodedData = jwt.verify(token,process.env.jwtSecret);

  
  req.user = await User.findOne({_id:decodedData._id});
  
  next();
}