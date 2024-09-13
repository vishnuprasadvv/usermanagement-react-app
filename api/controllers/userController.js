
import User from "../models/userModels.js"

export const uploadProfileImage = async(req,res)=>{

    try{
        const user = await User.findById(req.user.id);
        user.profileImage = `/uploads/${req.file.filename}`;
        console.log(req.file)
        await user.save();
        res.status(201).json({ message:'image uploaded successfully' })

    }catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const userProfile = async(req,res) =>{
    
    try {
        const user  = await User.findById(req.user.id)
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}