//import Admin from'../models/Admin.js'
import User  from'../models/userModels.js'
import jwt from'jsonwebtoken'
import bcryptjs from 'bcryptjs' 

// Admin login
export const adminLogin = async (req, res) => {
    console.log('admin login')
  const { email, password } = req.body;
  console.log(req.body)
  const admin = await User.findOne({ email , role: 'admin'});
  if (!admin) return res.status(400).json({ message: 'Admin not found' });

  const isMatch = await bcryptjs.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

// Get all users
export const getAllUsers = async (req, res) => {
  console.log('userlist')
  const search = req.query.search || '';
 let users = await User.find({ username: { $regex: search, $options: 'i' } , role:{$ne:'admin'}});
 
  console.log(users)
  res.json(users);
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body)
  const hashedPassword = await bcryptjs.hash(password, 10);
  
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  
  await user.save();
  res.json(user);

  console.log('new user created')
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted' });
  console.log('user deleted')
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username:name, email },
    { new: true }
  );
  
  res.json(updatedUser);
};
