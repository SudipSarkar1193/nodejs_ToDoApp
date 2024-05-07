import express from 'express';

import { getProfileData, handleLogin, handleLogout, handleRegistration } from '../controllers/users.js';
import { authenticate } from '../middleWare/auth.js';
// Define routes

const router = express.Router();

router.post('/new',handleRegistration );
router.post('/login',handleLogin );
router.get('/logout',handleLogout );
router.get('/profile',authenticate,getProfileData );

router.get('/about', (req, res) => {
  res.send('About Page');
});

export default router;
