import { Request, Response } from "express";
import { prisma } from "../controllers";
import { parse } from "path";

interface comment {
  postId: any;
  comment: string;
  userId: number;
}

export const Comment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { comment, postId, userId }: comment = req.body;
    const file: any = req.file;
    if (!comment || !postId || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const comments = await prisma.comment.create({
      data: {
        comment,
        postId: parseInt(postId),
        userId,
      },
    });
    res.status(201).json({ message: "commented successfully", comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const comments = await prisma.comment.findMany({
      
      orderBy: {
        id: "desc",
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

    res.status(200).json({ message: "comments successfully", comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedComment = await prisma.comment.update({
      where: {
        id: Number(id),
      },
      data,
    });
    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const DeleteComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json("Comment deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

