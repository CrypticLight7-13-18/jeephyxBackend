import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const getQuestions = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Get all questions",
    });
  }
);

export const addQuestion = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    difficulty,
    type,
    videoLink,
    question,
    answer,
    solution,
    options,
  } = req.body;
  res.status(201).json({
    success: true,
    message: "Question added",
    data: {
      title,
      difficulty,
      type,
      videoLink,
      question,
      answer,
      solution,
      options,
    },
  });
});
