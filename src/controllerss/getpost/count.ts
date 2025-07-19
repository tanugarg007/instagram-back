import { Request, Response } from 'express';
import { prisma } from '../../controller/controllers';



export const Postcount = async (req: Request, res: Response): Promise<any> => {
    try {


        const postCount = await prisma.post.count({
            where: {
                userId: Number(req.params.id)
            }
        });
        const likeCount = await prisma.like.count({
            where: {
                postid: Number(req.params.id)
            }
        });
        const commentCount = await prisma.comment.count({
            where: {
                postId: Number(req.params.id)
            }
        });
        const postImage = await prisma.post.findMany({
            where: {
                userId: Number(req.params.id)
            },
        });
        // const followCount = await prisma.follow.count({
        //     where: {
        //         followers: Number(req.params.id)
        //     }
        // });
        return res.status(200).json({ postCount, likeCount, commentCount, postImage });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

