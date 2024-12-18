"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuestionsController = exports.addQuestion = exports.getQuestions = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const questions_1 = require("../models/questions");
const addQuestions_1 = require("../services/questions/addQuestions");
const question_1 = require("../models/question");
exports.getQuestions = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roadmapMCQQuestions = yield question_1.RoadmapMCQModel.find();
    const roadmapNumericalQuestions = yield question_1.RoadmapNumericalModel.find();
    const questionBankMCQQuestions = yield question_1.QuestionBankMCQModel.find();
    const questionBankNumericalQuestions = yield question_1.QuestionBankNumericalModel.find();
    const questions = [...roadmapMCQQuestions, ...roadmapNumericalQuestions, ...questionBankMCQQuestions, ...questionBankNumericalQuestions];
    res.status(200).json({
        success: true,
        message: "Get all questions",
        questions
    });
}));
exports.addQuestion = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questionData = req.body;
    // Create the question in the database
    const addedQuestion = yield questions_1.QuestionModel.create(questionData);
    // Respond with the created question
    res.status(201).json({
        success: true,
        message: "Question added",
        data: addedQuestion,
    });
}));
exports.addQuestionsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = req.body;
        const result = yield (0, addQuestions_1.addQuestions)(questions);
        res.status(201).json({
            success: true,
            message: "Questions added",
            data: result,
        });
    }
    catch (error) {
        if (error) {
            res.status(400);
            console.error("Error in addQuestionsController:", error);
            throw error;
        }
    }
}));
