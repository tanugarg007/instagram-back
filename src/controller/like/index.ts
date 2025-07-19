import { Request,Response } from "express";
import {prisma} from '../controllers';

interface like{
    userid:number;
    postid:number;
   
}
export const Like = async (req:Request, res:Response):Promise<any> => {
    try{
      const {userid,postid}:like = req.body;
      if(!userid || !postid ){
        return res.status(400).json({message:"All fields are required"});
      }
      const like = await prisma.like.create({
        data: {
          userid,
          postid,
    }
      });
      res.status(201).json({message:'post liked successfully',like});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const GetLike = async (req:Request, res:Response):Promise<any> => {
    try{
        const likes = await prisma.like.findMany();
        res.status(200).json(likes);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const UpdateLike = async (req:Request, res:Response):Promise<any> => {
    try{
        const {id} = req.params;
        const data = req.body;
        const like = await prisma.like.update({
            where: {
                id: Number(id)
            },
            data
        });
        return res.status(200).json(like);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const DeleteLike = async (req:Request, res:Response):Promise<any> => {
    try{
        const {userid,postid}:like = req.body;
        if(!userid || !postid) {
            return res.status(404).json({message:'all fields are required'});
        }
             
         const like = await prisma.like.deleteMany({
            where: {
                userid,
                postid
         }
         });

         return res.status(200).json("Like deleted successfully");
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}