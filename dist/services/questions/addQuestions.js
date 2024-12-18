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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuestions = void 0;
const question_1 = require("../../models/question");
const addQuestions = (questions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield Promise.allSettled(questions.map((question) => __awaiter(void 0, void 0, void 0, function* () {
            const { uploadTo, questionType } = question;
            switch (uploadTo) {
                case "Roadmap":
                    return questionType === "Numerical"
                        ? yield question_1.RoadmapNumericalModel.create(question)
                        : yield question_1.RoadmapMCQModel.create(question);
                case "Question Bank":
                    return questionType === "Numerical"
                        ? yield question_1.QuestionBankNumericalModel.create(question)
                        : yield question_1.QuestionBankMCQModel.create(question);
                default:
                    throw new Error(`Invalid uploadTo value: ${uploadTo}`);
            }
        })));
        // Check for any failed creations
        const errors = results
            .filter((result) => result.status === "rejected")
            .map((result) => result.reason);
        if (errors.length > 0) {
            console.error("Some questions failed to be created:", errors);
            throw new Error("Failed to create some questions");
        }
        return results
            .map((result) => result.status === "fulfilled"
            ? result.value
            : null)
            .filter(Boolean);
    }
    catch (error) {
        console.error("Error in addQuestions:", error);
        throw error;
    }
});
exports.addQuestions = addQuestions;
