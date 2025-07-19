import {Request,Response} from 'express';
import { prisma } from '../controllers';    

export const CommentBox = async (req:Request, res:Response):Promise<any> => {
    try{
        const commentbox = await prisma.comment.findMany({
            where: {
                postId: Number(req.params.id)
            },
            orderBy:{
                id: "desc"
            },
            select: {
                id: true,
                comment: true,
                datetime: true,
                
                user: {
                    select: {
                        id: true,
                        username: true,
                        image: true,
                    },
                },
            },
        });
        res.status(200).json({message:"commentbox successfully",commentbox});   
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}
