import { Schema, model, Types } from 'mongoose';

// Document Names and Collection Names
export const ROADMAP_NUMERICAL_DOCUMENT_NAME = 'RoadmapNumericalQuestion';
export const ROADMAP_MCQ_DOCUMENT_NAME = 'RoadmapMCQQuestion';
export const QUESTION_BANK_NUMERICAL_DOCUMENT_NAME = 'QuestionBankNumericalQuestion';
export const QUESTION_BANK_MCQ_DOCUMENT_NAME = 'QuestionBankMCQQuestion';

// Enums for Question Types
export enum QuestionType {
  NUMERICAL = 'Numerical',
  MCQ = 'MCQ',
}

// Base Question Interface
interface BaseQuestion {
  _id: Types.ObjectId;
  title: string;
  level: number;
  uploadTo: string;
  questionType: QuestionType;
  videoLink: string;
  question: string;
  solution: string;
  tags: string[];
  topic: string;
  chapter: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Numerical Question Interface
export interface NumericalQuestion extends BaseQuestion {
  questionType: QuestionType.NUMERICAL;
  answer: number; // Single numerical answer
}

// MCQ Question Interface
export interface MCQQuestion extends BaseQuestion {
  questionType: QuestionType.MCQ;
  answer: string[]; // Array of correct option texts
  options: { id: number; content: string; isCorrect: boolean }[]; // Options with IDs and HTML content
}

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

const numericalSchema = new Schema<NumericalQuestion>({
  ...baseSchema,
  answer: { type: Number, required: true },
});

const mcqSchema = new Schema<MCQQuestion>({
  ...baseSchema,
  answer: { type: [String], required: true },
  options: [
    {
      id: { type: Number, required: true },
      content: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

// Models
export const RoadmapNumericalModel = model<NumericalQuestion>(
  ROADMAP_NUMERICAL_DOCUMENT_NAME,
  numericalSchema,
  'roadmap_numerical_questions'
);

export const RoadmapMCQModel = model<MCQQuestion>(
  ROADMAP_MCQ_DOCUMENT_NAME,
  mcqSchema,
  'roadmap_mcq_questions'
);

export const QuestionBankNumericalModel = model<NumericalQuestion>(
  QUESTION_BANK_NUMERICAL_DOCUMENT_NAME,
  numericalSchema,
  'question_bank_numerical_questions'
);

export const QuestionBankMCQModel = model<MCQQuestion>(
  QUESTION_BANK_MCQ_DOCUMENT_NAME,
  mcqSchema,
  'question_bank_mcq_questions'
);