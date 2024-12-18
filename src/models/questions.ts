import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Question";
export const COLLECTION_NAME = "questions";

export enum QuestionType {
  QuestionBank = "Question Bank",
  Roadmap = "Roadmap",
}

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export default interface Question {
  _id: Types.ObjectId;
  title: string;
  difficulty: string;
  type: QuestionType;
  videoLink: string;
  question: string;
  answer: string;
  solution: string;
  options?: string[];
}

const schema = new Schema<Question>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
    _id: true,
  }
);

export const QuestionModel = model<Question>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
