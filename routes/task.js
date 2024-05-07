import express from 'express';
import { authenticate } from '../middleWare/auth.js';
import { createNewTaskHandler, deleteTask, editTask, getMyTask, updateTaskCompleteStatus } from '../controllers/task.js';

const router = express.Router();

router.post('/add',authenticate,createNewTaskHandler);

router.get('/my',authenticate,getMyTask);

router.put("/edit/:id",authenticate,editTask)

router.route("/:id")
    .put(authenticate,updateTaskCompleteStatus)
    .delete(authenticate,deleteTask);




export default router;