"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questionsControllers_1 = require("../controllers/questionsControllers");
const questionsValidator_1 = require("../middleware/questionsValidator");
const questionsRouter = (0, express_1.Router)();
questionsRouter.get("/", questionsControllers_1.getQuestions);
questionsRouter.post("/addQuestion", questionsValidator_1.validateAddQuestions, questionsControllers_1.addQuestionsController);
exports.default = questionsRouter;
