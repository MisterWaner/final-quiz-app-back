import { FastifyInstance } from 'fastify';
import { AuthController } from '../modules/auth/auth.controller';
import { AuthService } from '../modules/auth/auth.service';

const authService = new AuthService();
const authController = new AuthController(authService);

export async function authRouter(fastify: FastifyInstance) {
    fastify.post<{ Body: { username: string; password: string } }>(
        '/login',
        authController.login
    );
    fastify.get('/me', authController.meHandler);
    fastify.post('/logout', authController.logoutHandler);
}