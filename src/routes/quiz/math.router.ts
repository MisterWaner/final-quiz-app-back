import { FastifyInstance } from 'fastify';
import { MathQuizController } from '../../modules/question/math/math.quiz.controller';
import { MathQuestionService } from '../../modules/question/math/math.question.service';
import { Quiz } from '../../types/entities';

const mathQuestionService = new MathQuestionService();
const mathQuizController = new MathQuizController(mathQuestionService);

export async function mathRouter(fastify: FastifyInstance) {
    fastify.get<{ Reply: Quiz }>(
        '/addition',
        mathQuizController.getAddition
    );
}
