import { Request, Response } from 'express';
import { prisma } from '../controllers';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

interface Login {
    phonenumber: string;
    password: string;
}

export const Login = async (req: Request, res: Response): Promise<any> => {
    try {
        const SECRET_KEY = process.env.JWT_SECRET;
        if (!SECRET_KEY) {
            throw new Error('JWT_SECRET must be defined in environment variables');
        }
        const { phonenumber, password }: Login = req.body;
        if (!phonenumber || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await prisma.user.findFirst({
            where: {
                phonenumber: phonenumber,
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = Jwt.sign({ id: user.id, phonenumber: user.phonenumber }, SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
            return res.status(200).json({ 
                message: 'Login successfully', 
                user: {
                    id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    email: user.email,
                    phonenumber: user.phonenumber,
                    image: user.image
                }, 
                token 
            });
        } else {
            return res.status(401).json({ message: 'Password is not correct' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
