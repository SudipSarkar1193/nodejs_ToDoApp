import express from 'express';

import { getProfileData, handleLogin, handleLogout, handleRegistration } from '../controllers/users.js';
import { authenticate } from '../middleWare/auth.js';
// Define routes

const router = express.Router();

router.post('/new',handleRegistration );
router.post('/login',handleLogin );
router.get('/logout',handleLogout );
router.get('/profile',authenticate,getProfileData );



export default router;
