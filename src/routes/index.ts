import { Router } from "express";
import userRouter from "./userRoutes";
import questionsRouter from "./questionsRoutes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/questions", questionsRouter);

export default routes;