import { FastifyRequest, FastifyReply } from 'fastify';
import { CapitalsQuestionService } from './capitals.question.service';
import { Quiz } from '../../../../domain/Quiz';
import { MultipleChoiceQuestion } from '../../../../domain/Question';
import { generateNumberId } from '../../../../lib/id-generator';

export class CapitalsQuizController {
    constructor(private capitalsQuestionService: CapitalsQuestionService) {}
    getEuropeanCapitals = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        const id = generateNumberId();
        const questionType = 'multiple-choice';
        const length: number = 10;
        const theme = 'european-capitals';
        const questions: MultipleChoiceQuestion[] = await Promise.all(
            Array.from({ length }, () =>
                this.capitalsQuestionService.generateEuropeanCapitalsQuestion()
            )
        );

        const quiz = new Quiz(id, questionType, questions, theme);

        reply.status(200).send(quiz);
    };
}
