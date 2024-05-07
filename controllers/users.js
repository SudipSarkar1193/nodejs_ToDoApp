
import User from "../models/users.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { CustomError } from "../middleWare/error.js";
import { config } from 'dotenv';

config({ path: './data/config.env' })

const setCookie = (user,req,res,statusCode,message) =>{
  //Creating Token :
  const payload = { _id : user._id};
  const secretKey = process.env.jwtSecret;
  console.log(process.env.jwtSecret)
  const token = jwt.sign(payload,secretKey);


  req.body.cookieToken =  token ;

  res.status(statusCode).cookie("token",token,{
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
  }).json({
    success:true,
    message,
  })

}

export const handleRegistration = async (req, res,next) => {
    try {
      const { name,email,age,isCompleted,password} = req.body ;
    
    let user = await User.findOne({email});

    if(user){
      const isSameName = user.name === name
      next(new CustomError("User Already exists "+`${isSameName?"":"with another username"}` , 400 ))
    }

    //Encoding the password
    const saltRound = 10
    const hashedPassword =await bcrypt.hash(password,saltRound);

    user = await User.create({
      name,
      email,
      age,
      isCompleted,
      password:hashedPassword

    })

    setCookie(user,req,res,201,`Thanks ${user.name} for joining us`);
    } catch (error) {
      next(error)
    }
}

export const handleLogin = async (req,res,next) =>{
  try {
    const {email,password} = req.body ;
    
    const user = await User.findOne({email});


  if(!user){
    next(new CustomError("No user found with this email. Log in first." , 404 ))
  }
  const isCorrectPass = await bcrypt.compare(password,user.password);   //If we dont use await keyWord , it will just return an promise object instead of a boolean value ,and as that's an object that will considered to be not null i.e true . 

  
  
  if(!isCorrectPass){
    next(new CustomError("Wrog password." , 404 ))
  }

    setCookie(user,req,res,200,`Welcome back ${user.name.split(' ')[0]}`);
  } catch (error) {
    next(error)
  }

}



// export const getMyProfile =async (uid) => {
//   const user = await User.findOne({_id:uid});
//   return res.json(user);
// }

export const getProfileData = (req,res) =>{
  
  res.status(200).json(
    {
      success:true,
      user:req.user ,
    }
  )
}

export const handleLogout =  (req,res) =>{
  res.status(200).cookie("token","",{
      expires:new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
    success:true,
    user:req.user ,
  })
}
