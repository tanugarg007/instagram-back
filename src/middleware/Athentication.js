import jwt from 'jsonwebtoken';

const Authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
   
    if (!token) {
         res.status(401).json({ message: "no token provided"  });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
           
           return res.status(403).json({ message: 'invalid or expire token' });
        }
           
        req.user = user;
        
        next();

    });
}
export { Authentication };
