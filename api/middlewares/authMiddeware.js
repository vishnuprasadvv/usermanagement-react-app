import jwt from 'jsonwebtoken';

export const authMiddleware = async(req,res, next) =>{
    console.log('authmiddelware')
    // const token = await req.header('Authorization')\
    let token = req.headers.authorization;
    if(!token)  return res.status(401).json({message: 'Unauthorized, no token provided'});

    try {
        const decodedToken =  jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({message: 'Unauthorized, invalid token'})
    }
}

export const adminAuth = (req, res, next) => {
    console.log('admin auth')
    let token = req.headers.authorization;
    console.log(token)
    if (token && token.startsWith('Bearer')) {
      // Remove 'Bearer' from the token
      token = token.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded;
      console.log(decoded)
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

