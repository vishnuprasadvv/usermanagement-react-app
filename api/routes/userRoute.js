import express from 'express';
import {uploadProfileImage , userProfile} from '../controllers/userController.js'
import multer from 'multer'
import { authMiddleware } from '../middlewares/authMiddeware.js';
import path from 'path'
const router = express.Router();
const app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Get the full path of the current file
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file
const __dirname = dirname(__filename);


import fs from 'fs'; 

const uploadsDir = path.join(__dirname, '../uploads'); 
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
    }

//multer for image upload 
const storage = multer.diskStorage({

    destination: (req,file,cb)=>{
        cb(null, uploadsDir);
    },
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}_${file.originalname}`)
        console.log(__dirname)
    }
})
const upload = multer({storage:storage})

//user routes
//router.post('/upload/profile',authMiddleware,upload.single('profileImage'), uploadProfileImage)
router.post('/upload/profile',authMiddleware,(req, res, next) => {
    upload.single('profileImage')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err.message)
        return res.status(500).json({ message: 'Multer Error: ' + err.message });
      } else if (err) {
        console.log(err.message)
        return res.status(500).json({ message: 'Unknown Error: ' + err.message });
      }
      next();
    });
  }, uploadProfileImage);

  router.get('/profile',authMiddleware, userProfile)

export default router;