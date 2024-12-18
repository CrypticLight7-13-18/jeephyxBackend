import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Question , { QuestionModel } from "../models/questions";
import { addQuestions } from "../services/questions/addQuestions";
import { QuestionBankMCQModel , QuestionBankNumericalModel , RoadmapMCQModel , RoadmapNumericalModel } from "../models/question";

export const getQuestions = asyncHandler(
  async (req: Request, res: Response) => {
    const roadmapMCQQuestions = await RoadmapMCQModel.find();
    const roadmapNumericalQuestions = await RoadmapNumericalModel.find();
    const questionBankMCQQuestions = await QuestionBankMCQModel.find();
    const questionBankNumericalQuestions = await QuestionBankNumericalModel.find();
    const questions = [...roadmapMCQQuestions, ...roadmapNumericalQuestions, ...questionBankMCQQuestions, ...questionBankNumericalQuestions];
    res.status(200).json({
      success: true,
      message: "Get all questions",
      questions
    });
  }
);

export const addQuestion = asyncHandler(async (req: Request, res: Response) => {
  const questionData = req.body as Question;

  // Create the question in the database
  const addedQuestion = await QuestionModel.create(questionData);

  // Respond with the created question
  res.status(201).json({
    success: true,
    message: "Question added",
    data: addedQuestion,
  });
});

export const addQuestionsController = asyncHandler(async (req: Request, res: Response) => {
  try{
    const questions = req.body;
    const result = await addQuestions(questions);
    res.status(201).json({
      success: true,
      message: "Questions added",
      data: result,
    });
  } catch (error) {
    
    if (error) {
      res.status(400)
      console.error("Error in addQuestionsController:", error);
      throw error;
    }
  }
});