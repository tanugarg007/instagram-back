import { Request, Response } from 'express';
import { prisma } from '../controllers';

export const Search = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username } = req.body;
        const users = await prisma.user.findMany({
            where: {
                username: {
                    contains: username
                   
            }
        }
        });
         return res.status(200).json({ message: 'users found', users });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



