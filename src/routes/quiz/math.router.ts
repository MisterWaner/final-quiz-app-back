import { FastifyInstance } from 'fastify';
import { MathQuizController } from '../../modules/question/math/math.quiz.controller';
import { MathQuestionService } from '../../modules/question/math/math.question.service';
import { Quiz } from '../../domain/Quiz';

const mathQuestionService = new MathQuestionService();
const mathQuizController = new MathQuizController(mathQuestionService);

export async function mathRouter(fastify: FastifyInstance) {
    fastify.get<{ Reply: Quiz }>(
        '/addition',
        mathQuizController.getAddition
    );

    fastify.get<{ Reply: Quiz }>(
        '/substraction',
        mathQuizController.getSubstraction
    );

    fastify.get<{ Reply: Quiz }>(
        '/multiplication',
        mathQuizController.getMultiplication
    );

    fastify.get<{ Reply: Quiz }>(
        '/random-operation',
        mathQuizController.getRandomOperation
    );
}
