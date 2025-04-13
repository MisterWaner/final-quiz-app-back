import { DirectQuestion } from "../domain/Question";

export interface MathQuestionRepository {
    generateAddition(): DirectQuestion;
    generateSubtraction(): DirectQuestion;
    generateMultiplication(): DirectQuestion;
    generateRandomOperation(): DirectQuestion;
}
