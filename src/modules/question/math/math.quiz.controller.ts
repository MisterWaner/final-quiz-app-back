import { FastifyRequest, FastifyReply } from 'fastify';
import { MathQuestionService } from './math.question.service';
import { Question, Quiz } from '../../../types/entities';
import { generateNumberId } from '../../../lib/id-generator';

export class MathQuizController {
    constructor(private mathQuestionService: MathQuestionService) {}

    getAddition = async (
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<Quiz> => {
        const id = generateNumberId();
        const length = 10;
        const subject = 'Mathématiques';
        const theme = 'Addition';
        const questions: Question[] = Array.from({ length }, () =>
            this.mathQuestionService.generateAddition()
        );

        return {
            id,
            questions,
            subject,
            theme,
        };
    };
}
