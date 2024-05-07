import { CustomError } from "../middleWare/error.js";
import Task from "../models/task.js";

export const createNewTaskHandler = async(req,res,next) =>{
    try {
        const {title,description} = req.body ;
        const task = await Task.create({
            title,
            description,
            user:req.user
        })

        res.status(201).json(
            {
                success:true,
                message:"task added succcesfully",
                task
            }
        )
        
    } catch (error) {
        next(error)
    }
}

export const getMyTask = async (req,res,next) =>{
    const {_id} = req.user ;
    
    const taskList = await Task.find({user:_id});
    
    res.status(200).json(
       {
        success:true,
        taskList
       }
    )
}

export const editTask = async (req,res,next) =>{
    try {
        const {id} = req.params;
        
        const task = await Task.findOne({_id:id});  // As of 6th may,2024 -- this should be the syntax .. Task.find() is not working
        
       
        if(!task){
            return next(new CustomError("No task found",404))
        }
        const {title,description} = req.body ;

        task.title = title ;
        task.description = description ;

        await task.save() ;

        res.status(200).json({
            success:true,
            edited:task
        })
        
    } catch (error) {
        next(error)
    }
}

export const updateTaskCompleteStatus = async (req,res,next) => {
    try {
        const {id} = req.params;
        
        const task = await Task.findOne({_id:id});  // As of 6th may,2024 -- this should be the syntax .. Task.find() is not working
        console.log(task instanceof Task)
        if(!task){
            next(new CustomError("No task found",404))
        }
        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success:true,
            message:"Task updated"
        })
        
    } catch (error) {
        next(error)
    }
}
export const deleteTask = async (req,res,next) => {
    try {
        const {id} = req.params;
        
        const task = await Task.findOne({_id:id});  // As of 6th may,2024 -- this should be the syntax .. Task.find() is not working
        if(!task){
            next(new CustomError("No task found",404))
        }
        
        await task.deleteOne();

        res.status(200).json({
            success:true,
            message:"Task deleted"
        })
        
    } catch (error) {
        next(error)
    }
}