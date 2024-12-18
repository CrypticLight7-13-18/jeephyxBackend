"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModel = exports.Difficulty = exports.QuestionType = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Question";
exports.COLLECTION_NAME = "questions";
var QuestionType;
(function (QuestionType) {
    QuestionType["QuestionBank"] = "Question Bank";
    QuestionType["Roadmap"] = "Roadmap";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
var Difficulty;
(function (Difficulty) {
    Difficulty["Easy"] = "easy";
    Difficulty["Medium"] = "medium";
    Difficulty["Hard"] = "hard";
})(Difficulty || (exports.Difficulty = Difficulty = {}));
const schema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        required: true,
        enum: Difficulty,
    },
    type: { type: String, required: true, enum: QuestionType },
    videoLink: { type: String, required: false, default: "#" },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    solution: { type: String, required: true, trim: true },
    options: { type: [String], required: false },
}, {
    timestamps: true,
    versionKey: false,
    _id: true,
});
exports.QuestionModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
