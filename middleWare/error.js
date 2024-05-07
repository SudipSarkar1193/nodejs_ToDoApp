
export class CustomError extends Error{
    constructor(msg,statusCode){
      msg = msg === ""?"Internal server error":msg;
      
      super(msg);
      this.statusCode = statusCode
    }
  }

export const errorHandlerFunc = (err,req,res,next)=>{
    
    return res.status(err.statusCode).json({
      success:false,
      message:err.message,
    })
  }