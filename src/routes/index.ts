import { FastifyInstance } from 'fastify';
import { quizRouter } from './quiz/index';
import { subjectRouter } from './subject.router';
import { themeRouter } from './theme.router';

export async function routes(fastify: FastifyInstance) {
    fastify.register(quizRouter, { prefix: '/quiz' });
    fastify.register(subjectRouter, { prefix: '/subjects' });
    fastify.register(themeRouter, { prefix: '/themes' });
}
