import { Request,Response } from "express";
import {prisma} from '../controllers';

interface post{
    title: string;
    description: string;
    userId: string;
   
}
export const Post = async (req:Request, res:Response):Promise<any> => {
    try{
        const {title,description,userId}:post = req.body;
        const file:any = req.file;
        console.log(req.file);
            
        if(!title || !description  || !userId ){ 
            return res.status(400).json({message:"All fields are required"});
    }
    const post = await prisma.post.create({
        data: {
            title,
            description,
            image: file?.path,
            userId: parseInt(userId),
          
      }
    });
    
    res.status(201).json({message:"uploaded successfully"});
}
catch(error){
    console.error(error);
    res.status(500).json({message:"Internal server error"});
}
}

export const GetPost = async (req:Request, res:Response):Promise<any> => {
    try{

        const posts = await prisma.post.findMany({
           
            orderBy: {
                id: 'desc'
            },
            select: {
                id: true,
                title: true,
                description: true,
                image: true,
                datetime: true,
                like: true,
                comment: true,
                 user: {
                     select: {
                        id: true,
                        username: true,
                        image: true
                    }
             }
            }
        });
     
        res.status(200).json(posts);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}
export const GetPost2 = async (req:Request, res:Response):Promise<any> => {
    try{
        const {id} = req.params;
        console.log(id+"tanisha");
        
        const posts = await prisma.post.findMany({
           
            where: {
                userId: Number(id)
            },
            select: {
                id: true,
                title: true,
                description: true,
                image: true,
                datetime: true,
                like: true,
                comment: true,
                 user: {
                     select: {
                        id: true,
                        username: true,
                        image: true
                    }
             }
            }
        });
     
        res.status(200).json(posts);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}



export const UpdatePost = async (req:Request, res:Response):Promise<any> => {
    try{
        const {id} = req.params;
        const data = req.body;
        const file = req.file;
        const post = await prisma.post.update({
            where: {
                id: Number(id)
            },
              data
        });
        return res.status(200).json(post);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const DeletePost = async (req:Request, res:Response):Promise<any> => {
    try{
        const {id} = req.params;
        const post = await prisma.post.delete({
            where: {
                id: Number(id)
            }
        });
        return res.status(200).json("Post deleted successfully");
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}