import fp from 'fastify-plugin';
import fastifyCookie from '@fastify/cookie';
import { randomBytes } from 'crypto';

export default fp(async (fastify) => {
    fastify.register(fastifyCookie, {
        secret: randomBytes(32).toString('hex')
    });
})