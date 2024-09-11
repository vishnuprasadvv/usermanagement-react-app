import User from "../models/userModels.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async(req, res)=>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password.toString(), 10)
    const newUser = new User({username, email, password: hashedPassword});
    try {
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
            return res.status(401).json({message:'Invalid credentials'})

        }
        // create the user data without password 
        const { password : hashedPassword, ...rest} = validUser._doc;

        //create expire time for token 
        const expiryDate = new Date(Date.now() + 3600000) // 1 hour

        //create token
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);

        res.cookie('access_token', token, {httpOnly: true, expires: expiryDate})
        .status(200)
        .json(rest) // sending the user data without password to client
    } catch (error) {
        res.status(500).json({message:error.message})
    }
  
}