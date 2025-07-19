import {Request,Response} from 'express';
import {prisma} from '../controllers';

interface follow{
    followers:number,
    following:number
}



export const Follow = async (req: Request, res: Response): Promise<any> => {
    try {
        const { followers, following } = req.body;

        if (!followers || !following) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate that the follower user exists
        const followerUser = await prisma.user.findUnique({ where: { id: followers } });
        const followingUser = await prisma.user.findUnique({ where: { id: following } });

        if (!followerUser) {
            return res.status(404).json({ message: 'Follower user does not exist' });
        }

        if (!followingUser) {
            return res.status(404).json({ message: 'User to follow does not exist' });
        }

        const follows = await prisma.follow.create({
            data: {
                followers,
                following,
            },
        });

        return res.status(201).json({ message: 'Followed successfully', follows });
    } catch (err) {
        console.error('Follow API error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// export const Follow = async (req:Request,res:Response) : Promise<any> => {
//     try{
//         const {followers,following} : follow = req.body;
//         if(!followers || !following) {
//               return res.status(404).json({message:'all fields are required'})
//         }
//         const follows = await prisma.follow.create({
//             data: {
//                 followers,
//                 following
//             }
//         });
//         res.status(201).json({message:'followed successfully',follows});
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({message:"Internal server error"});
//     }
// }

export const GetFollow = async (req:Request,res:Response):Promise<any> => {
    try{
          const follows = await prisma.follow.findMany({
            where :{
                following : Number(req.params.id)
            }
          });
          res.status(200).json({message:'follows',follows});    
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error"});
    }
}

export const UpdateFollow = async (req:Request,res:Response):Promise<any> => {
    try{
        const {id} = req.params;
        const data = req.body;
        const follow = await prisma.follow.update({
            where: {
                id: Number(id)
            },
            data
        });
        res.status(200).json({message:'follow updated successfully',follow});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error"});
    }
}

export const DeleteFollow = async (req: Request, res: Response): Promise<any> => {
  try {
    const { postUserId, userId } = req.params;

    const result = await prisma.follow.deleteMany({
      where: {
        following: Number(userId),
        followers: Number(postUserId),
      },
    });

    console.log(result);
    res.status(200).json({ message: 'Follow deleted successfully', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// export const DeleteFollow = async (req:Request,res:Response):Promise<any> => {
//     try{
//         const {id} = req.params;
//         const follow = await prisma.follow.delete({
//             where: {
//                 id: Number(id)
//             }
//         });
//         res.status(200).json({message:'follow deleted successfully',follow});
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({message:"Internal server error"});
//     }
// }
export const CountFollow = async (req:Request,res:Response):Promise<any> => {
    console.log(req.params.id)
    try{
        const {id} = req.params;
        const follow = await prisma.follow.count({
            where: {
                 followers: Number(req.params.id)
            }
        });
        console.log(follow)
        res.status(200).json({message:'follow count successfully',follow});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error"});
    }
}
export const CountFollowing = async (req:Request,res:Response):Promise<any> => {
    console.log(req.params.id)
    try{
        const {id} = req.params;
        const follow = await prisma.follow.count({
            where: {
                 following: Number(req.params.id)
            }
        });
        console.log(follow)
        res.status(200).json({message:'follow count successfully',follow});
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error"});
    }
}
export const checkFollow = async (req: Request, res: Response): Promise<any> => {
    try {
        const { postUserId, userId } = req.params;

        const follow = await prisma.follow.findFirst({
            where: {
                AND: [
                    { following: Number(userId) },
                    { followers: Number(postUserId) }
                ]
            }
        });

        console.log(follow);
        res.status(200).json({ message: 'Follow status retrieved', follow });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


