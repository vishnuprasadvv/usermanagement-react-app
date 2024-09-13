import User from "../models/userModels.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async(req, res)=>{
    
    const {username, email, password} = req.body;
    console.log(req.body)
    try {
    
    const userExist = await User.findOne({email})
    if(userExist){
        return res.status(401).json({message: "User already exist"})
    }
    const hashedPassword = bcryptjs.hashSync(password.toString(), 10)
    const newUser = new User({username, email, password: hashedPassword});
         await newUser.save();
        res.status(201).json ({message:'User created successfully'})
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}  

export const singin = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) {
            console.log('user not found')
           return res.status(404).json ({message : 'user not found'})
        }
        const passwordVerified = bcryptjs.compareSync(password.toString(), validUser.password);
        if(!passwordVerified){
            console.log('invalid credentials')
            return res.status(401).json({message:'Invalid credentials'})

        }
        // create the user data without password 
        const { password : hashedPassword, ...rest} = validUser._doc;

        //create token
        const token = jwt.sign({id:validUser._id, role: validUser.role}, process.env.JWT_SECRET);
        res.json({token, user:rest})

        console.log('sign in success')
    } catch (error) {
        res.status(500).json({message:error.message})
    }
  
}

export const signout =(req, res)=>{
    console.log('signout')
}