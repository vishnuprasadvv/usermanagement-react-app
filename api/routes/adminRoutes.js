import express from 'express'
import { adminLogin, getAllUsers, createUser, deleteUser, updateUser } from '../controllers/adminController.js'
import { adminAuth }  from '../middlewares/authMiddeware.js'

const router = express.Router();

router.post('/login', adminLogin);
router.get('/users', adminAuth, getAllUsers);
router.post('/users/create', adminAuth, createUser);
router.delete('/users/:id', adminAuth, deleteUser);
router.put('/users/:id', adminAuth, updateUser);

 export default router;
