import { Request, Response } from 'express';
import { prisma } from "../controllers";  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { parse } from 'path';

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    fullname: string;
    phonenumber: string;
    image?: string;
    visibility?: boolean;
   
  
}

export const CreateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const SECRET_KEY = process.env.JWT_SECRET;
        if (!SECRET_KEY) {
            throw new Error('JWT_SECRET must be defined in environment variables');
        }
        
        const { username, email, password, fullname, phonenumber }: User = req.body;
        const file = req.file;
        
        if (!username || !email || !password || !fullname || !phonenumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await prisma.user.findFirst({ where: { email } });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword,
                fullname,
                phonenumber,
                image: file?.path,
                visibility: true
                
            }
        });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
        res.status(201).json({ message: 'User created successfully', user: { id: user.id, phonenumber: user.phonenumber }, token, status: 201 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const GetUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const UpdateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const file = req.file;
        
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { image: file?.path }
        });

        return res.status(200).json("User updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const DeleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        
        await prisma.user.delete({ where: { id: Number(id) } });
        return res.status(200).json("User deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const Visibility = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        console.log(id)
        const user = await prisma.user.findFirst({ where: { id: Number(id) } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ visibility: user.visibility });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const Toggle = async (req: Request, res: Response): Promise<any> => {
    try {
        const { isOn, userId } = req.body;
       
        console.log(isOn)
        console.log(userId)
        
        const user = await prisma.user.update({
            where: { id: Number(userId) },
            data: { visibility: isOn }
        });
        return res.status(200).json({ isOn,msg:"User updated successfully" });
        
        // return res.status(200).json("User updated successfully");
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};




export const ReloadUser = async (req: Request, res: Response): Promise<any> => {
    try {
       
        const authHeader: any = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];
        const SECRET_KEY = process.env.JWT_SECRET;

        if (!SECRET_KEY) {
            throw new Error('JWT_SECRET must be defined in environment variables');
        }

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
    }

        const user: User = await jwt.verify(token, SECRET_KEY) as User;

       
        const findUser = await prisma.user.findUnique({
            where:{
                id: user.id
            }
        })
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newToken = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', newToken, { httpOnly: true, sameSite: 'strict' });
        return res.status(200).json({ message: "User reloaded successfully", user: findUser });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ error, message: "Internal server error" });
    }
}




export const GetProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        post: {
          select: {
            id: true,
            image: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);
    return res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const ForgetPassword = async (req: Request, res: Response): Promise<any> => {
    try {
      
        const { phonenumber } = req.body;
        if (!phonenumber) {
            return res.status(400).json({ message: "Phonenumber is required" });
        }

        const user = await prisma.user.findFirst({
            where: {
             
               phonenumber: phonenumber
            }

        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User found", user }); 
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const ResetPassword = async (req: Request, res: Response): Promise<any> => {
    const { phonenumber, password } = req.body;

    try {
        if (!phonenumber || !password) {
            return res.status(400).json({ message: 'Phone number and password are required' });
        }

        const user = await prisma.user.findFirst({ where: { phonenumber } });

        if (!user) {
            return res.status(404).json({ message: 'User not found with that phone number' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.updateMany({
            where: { phonenumber },
            data: { password: hashedPassword }
        });

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error('Reset Password Error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

