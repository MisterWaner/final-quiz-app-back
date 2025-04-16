import { DirectQuestion, MultipleChoiceQuestion } from "../domain/Question";

export interface MathQuestionRepository {
    generateAddition(): DirectQuestion;
    generateSubtraction(): DirectQuestion;
    generateMultiplication(): DirectQuestion;
    generateRandomOperation(): DirectQuestion;
};

export interface GeoQuestionRepository {
    generateEuropeanCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
    generateAfricanCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
    generateAsianCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
    generateAmericanCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
    generateOceanicCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
    generateRandomCapitalsQuestion(): Promise<MultipleChoiceQuestion>;
}
