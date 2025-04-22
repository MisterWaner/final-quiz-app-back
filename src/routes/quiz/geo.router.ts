import { FastifyInstance } from 'fastify';
import { CapitalsQuizController } from '../../modules/question/geography/capitals/capitals.quiz.controller';
import { FlagsQuizController } from '../../modules/question/geography/flags/flags.quiz.controller';
import { CapitalsQuestionService } from '../../modules/question/geography/capitals/capitals.question.service';
import { FlagsQuestionService } from '../../modules/question/geography/flags/flags.question.service';
import { Quiz } from '../../domain/Quiz';

const capitalsQuestionService = new CapitalsQuestionService();
const capitalsQuizController = new CapitalsQuizController(
    capitalsQuestionService
);
const flagsQuestionService = new FlagsQuestionService();
const flagsQuizController = new FlagsQuizController(flagsQuestionService);

export async function geoRouter(fastify: FastifyInstance) {
    fastify.get<{ Reply: Quiz }>(
        '/capitales-europeennes',
        capitalsQuizController.getEuropeanCapitals
    );
    fastify.get<{ Reply: Quiz }>(
        '/capitales-africaines',
        capitalsQuizController.getAfricanCapitals
    );
    fastify.get<{ Reply: Quiz }>(
        '/capitales-asiatiques',
        capitalsQuizController.getAsianCapitals
    );
    fastify.get<{ Reply: Quiz }>(
        '/capitales-americaines',
        capitalsQuizController.getAmericanCapitals
    );
    fastify.get<{ Reply: Quiz }>(
        '/capitales-oceaniques',
        capitalsQuizController.getOceanianCapitals
    );
    fastify.get<{ Reply: Quiz }>(
        '/capitales-aleatoires',
        capitalsQuizController.getRandomCapitals
    );
    fastify.get<{ Reply: Quiz }>(
        '/drapeaux-europeens',
        flagsQuizController.getEuropeanFlags
    );
    fastify.get<{ Reply: Quiz }>(
        '/drapeaux-africains',
        flagsQuizController.getAfricanFlags
    );
    fastify.get<{ Reply: Quiz }>(
        '/drapeaux-asiatiques',
        flagsQuizController.getAsianFlags
    );
    fastify.get<{ Reply: Quiz }>(
        '/drapeaux-americains',
        flagsQuizController.getAmericanFlags
    );
    fastify.get<{ Reply: Quiz }>(
        '/drapeaux-oceaniques',
        flagsQuizController.getOceanianFlags
    );
    fastify.get<{ Reply: Quiz }>(
        '/drapeaux-aleatoires',
        flagsQuizController.getRandomFlags
    );
}
