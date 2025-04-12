import { Question } from '../types/entities';

export interface MathQuestionRepository {
    generateAddition(): Question;
    generateSubtraction(): Question;
    generateMultiplication(): Question;
    generateRandomOperation(): Question;
}
