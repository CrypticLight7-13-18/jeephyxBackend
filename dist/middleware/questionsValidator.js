"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddQuestions = void 0;
const joi_1 = __importDefault(require("joi"));
const validateAddQuestions = (req, res, next) => {
    const schema = joi_1.default.array().items(joi_1.default.object({
        title: joi_1.default.string().required(),
        level: joi_1.default.number().integer().min(1).max(10).required(),
        uploadTo: joi_1.default.string().required(),
        questionType: joi_1.default.string().valid('Numerical', 'MCQ').required(),
        videoLink: joi_1.default.string().uri().optional(),
        question: joi_1.default.string().required(),
        solution: joi_1.default.string().required(),
        tags: joi_1.default.array().items(joi_1.default.string()).required(),
        topic: joi_1.default.string().required(),
        chapter: joi_1.default.string().required(),
        answer: joi_1.default.alternatives().conditional('questionType', {
            is: 'Numerical',
            then: joi_1.default.number().required(),
            otherwise: joi_1.default.array().items(joi_1.default.string()).required(),
        }),
        options: joi_1.default.when('questionType', {
            is: 'MCQ',
            then: joi_1.default.array()
                .items(joi_1.default.object({
                id: joi_1.default.number().required(),
                content: joi_1.default.string().required(),
                isCorrect: joi_1.default.boolean().required(),
            }))
                .required(),
            otherwise: joi_1.default.forbidden(),
        }),
    }));
    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        return next(new Error(error.details[0].message));
    }
    next();
};
exports.validateAddQuestions = validateAddQuestions;
