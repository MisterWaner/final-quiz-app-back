import { FastifyInstance } from 'fastify';
import { quizRouter } from './quiz/index';

export async function routes(fastify: FastifyInstance) {
    fastify.register(quizRouter, { prefix: '/quiz' });
}