import {
    RoadmapNumericalModel,
    RoadmapMCQModel,
    QuestionBankNumericalModel,
    QuestionBankMCQModel,
    NumericalQuestion,
    MCQQuestion,
  } from "../../models/question";
  
  export const addQuestions = async (
    questions: (NumericalQuestion | MCQQuestion)[]
  ) => {
    try {
      const results = await Promise.allSettled(
        questions.map(async (question) => {
          const { uploadTo, questionType } = question;
  
          switch (uploadTo) {
            case "Roadmap":
              return questionType === "Numerical"
                ? await RoadmapNumericalModel.create(question)
                : await RoadmapMCQModel.create(question);
  
            case "Question Bank":
              return questionType === "Numerical"
                ? await QuestionBankNumericalModel.create(question)
                : await QuestionBankMCQModel.create(question);
  
            default:
              throw new Error(`Invalid uploadTo value: ${uploadTo}`);
          }
        })
      );
  
      // Check for any failed creations
      const errors = results
        .filter((result) => result.status === "rejected")
        .map((result) => (result as PromiseRejectedResult).reason);
  
      if (errors.length > 0) {
        console.error("Some questions failed to be created:", errors);
        throw new Error("Failed to create some questions");
      }
  
      return results
        .map((result) =>
          result.status === "fulfilled"
            ? (result as PromiseFulfilledResult<any>).value
            : null
        )
        .filter(Boolean);
    } catch (error) {
      console.error("Error in addQuestions:", error);
      throw error;
    }
  };