import { Request, Response } from "express";
import { prisma } from '../controllers';
export const EditProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, email, fullname, phonenumber } = req.body;
        const file = req.file;
        console.log(req.file);

        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                username,
                email,
                fullname,
                phonenumber,
                image: file?.path 
            }
        });

        res.status(200).json({ message: "Profile updated successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
