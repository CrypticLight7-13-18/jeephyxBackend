import { Router } from "express";
import { addQuestion, getQuestions } from "../controllers/questionsControllers";
import { validateAddQuestion } from "../middleware/questionsValidator";

const questionsRouter = Router();

questionsRouter.get("/", getQuestions);

questionsRouter.post("/addQuestion", validateAddQuestion, addQuestion);

export default questionsRouter;