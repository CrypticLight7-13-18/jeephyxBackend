"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBankMCQModel = exports.QuestionBankNumericalModel = exports.RoadmapMCQModel = exports.RoadmapNumericalModel = exports.QuestionType = exports.QUESTION_BANK_MCQ_DOCUMENT_NAME = exports.QUESTION_BANK_NUMERICAL_DOCUMENT_NAME = exports.ROADMAP_MCQ_DOCUMENT_NAME = exports.ROADMAP_NUMERICAL_DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
// Document Names and Collection Names
exports.ROADMAP_NUMERICAL_DOCUMENT_NAME = 'RoadmapNumericalQuestion';
exports.ROADMAP_MCQ_DOCUMENT_NAME = 'RoadmapMCQQuestion';
exports.QUESTION_BANK_NUMERICAL_DOCUMENT_NAME = 'QuestionBankNumericalQuestion';
exports.QUESTION_BANK_MCQ_DOCUMENT_NAME = 'QuestionBankMCQQuestion';
// Enums for Question Types
var QuestionType;
(function (QuestionType) {
    QuestionType["NUMERICAL"] = "Numerical";
    QuestionType["MCQ"] = "MCQ";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
// Schemas
const baseSchema = {
    title: { type: String, required: true },
    level: { type: Number, required: true },
    uploadTo: { type: String, required: true },
    questionType: { type: String, enum: Object.values(QuestionType), required: true },
    videoLink: { type: String, required: false },
    question: { type: String, required: true },
    solution: { type: String, required: true },
    tags: { type: [String], required: true },
    topic: { type: String, required: true },
    chapter: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
};
const numericalSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, baseSchema), { answer: { type: Number, required: true } }));
const mcqSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, baseSchema), { answer: { type: [String], required: true }, options: [
        {
            id: { type: Number, required: true },
            content: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
        },
    ] }));
// Models
exports.RoadmapNumericalModel = (0, mongoose_1.model)(exports.ROADMAP_NUMERICAL_DOCUMENT_NAME, numericalSchema, 'roadmap_numerical_questions');
exports.RoadmapMCQModel = (0, mongoose_1.model)(exports.ROADMAP_MCQ_DOCUMENT_NAME, mcqSchema, 'roadmap_mcq_questions');
exports.QuestionBankNumericalModel = (0, mongoose_1.model)(exports.QUESTION_BANK_NUMERICAL_DOCUMENT_NAME, numericalSchema, 'question_bank_numerical_questions');
exports.QuestionBankMCQModel = (0, mongoose_1.model)(exports.QUESTION_BANK_MCQ_DOCUMENT_NAME, mcqSchema, 'question_bank_mcq_questions');
