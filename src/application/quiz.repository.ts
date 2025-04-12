import { Quiz } from '../types/entities';

export interface QuizRepository {
    createQuiz(): Promise<Quiz>;
}
