import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { User } from '../../domain/User';
import { Session } from '../../domain/Session';

export class AuthController {
    constructor(private authService: AuthService) {}

    login = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { username, password } = request.body as User;
            const user = await this.authService.authenticateUser(
                username,
                password
            );
            if (!user) throw new Error('User not found');

            const session = await this.authService.createSession(user.id);
            reply
                .setCookie('sessionId', session.id, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: true,
                    maxAge: 60 * 60 * 24,
                }).status(200)
                .send({ message: 'Logged in successfully' });
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    meHandler = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { sessionId } = request.cookies;
            if (!sessionId) return reply.status(401).send({ message: 'Unauthorized' });

            const session = await this.authService.getSessionById(sessionId);
            if (!session) return reply.status(401).send({ message: 'Session expired' });

            reply.status(200).send({ user: session.userId });
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    logoutHandler = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { sessionId } = request.cookies;
            if (!sessionId) return reply.status(401).send({ message: 'Unauthorized' });

            await this.authService.deleteSession(sessionId);
            reply.clearCookie('sessionId').status(200).send({ message: 'Logged out successfully' });
        } catch (error) {
            reply.status(500).send(error);
        }
    };
}
