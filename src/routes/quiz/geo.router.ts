import { FastifyInstance } from 'fastify';
import { CapitalsQuizController } from '../../modules/question/geography/capitals/capitals.quiz.controller';
import { CapitalsQuestionService } from '../../modules/question/geography/capitals/capitals.question.service';
import { Quiz } from '../../domain/Quiz';

const capitalsQuestionService = new CapitalsQuestionService();
const capitalsQuizController = new CapitalsQuizController(capitalsQuestionService);

export async function geoRouter(fastify: FastifyInstance) {
    fastify.get<{ Reply: Quiz }>('/european-capitals', capitalsQuizController.getEuropeanCapitals);
}