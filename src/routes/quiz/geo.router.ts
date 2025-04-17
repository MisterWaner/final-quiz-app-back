import { FastifyInstance } from 'fastify';
import { CapitalsQuizController } from '../../modules/question/geography/capitals/capitals.quiz.controller';
import { FlagsQuizController } from '../../modules/question/geography/flags/flags.quiz.controller';
import { CapitalsQuestionService } from '../../modules/question/geography/capitals/capitals.question.service';
import { FlagsQuestionService } from '../../modules/question/geography/flags/flags.question.service';
import { Quiz } from '../../domain/Quiz';

const capitalsQuestionService = new CapitalsQuestionService();
const capitalsQuizController = new CapitalsQuizController(capitalsQuestionService);
const flagsQuestionService = new FlagsQuestionService();
const flagsQuizController = new FlagsQuizController(flagsQuestionService);

export async function geoRouter(fastify: FastifyInstance) {
    fastify.get<{ Reply: Quiz }>('/european-capitals', capitalsQuizController.getEuropeanCapitals);
    fastify.get<{ Reply: Quiz }>('/african-capitals', capitalsQuizController.getAfricanCapitals);
    fastify.get<{ Reply: Quiz }>('/asian-capitals', capitalsQuizController.getAsianCapitals);
    fastify.get<{ Reply: Quiz }>('/american-capitals', capitalsQuizController.getAmericanCapitals);
    fastify.get<{ Reply: Quiz }>('/oceanian-capitals', capitalsQuizController.getOceanianCapitals);
    fastify.get<{ Reply: Quiz }>('/random-capitals', capitalsQuizController.getRandomCapitals);
    fastify.get<{ Reply: Quiz }>('/european-flags', flagsQuizController.getEuropeanFlags);
    fastify.get<{ Reply: Quiz }>('/african-flags', flagsQuizController.getAfricanFlags);
    fastify.get<{ Reply: Quiz }>('/asian-flags', flagsQuizController.getAsianFlags);
    fastify.get<{ Reply: Quiz }>('/american-flags', flagsQuizController.getAmericanFlags);
    fastify.get<{ Reply: Quiz }>('/oceanian-flags', flagsQuizController.getOceanianFlags);
    fastify.get<{ Reply: Quiz }>('/random-flags', flagsQuizController.getRandomFlags);
}