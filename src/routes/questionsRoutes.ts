import { Router } from "express";
import { addQuestionsController, getQuestions } from "../controllers/questionsControllers";
import { validateAddQuestions  } from "../middleware/questionsValidator";

const questionsRouter = Router();

questionsRouter.get("/", getQuestions);

questionsRouter.post("/addQuestion", validateAddQuestions, addQuestionsController);

export default questionsRouter;