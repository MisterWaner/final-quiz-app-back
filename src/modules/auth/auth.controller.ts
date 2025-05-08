import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../../domain/User';
import { Session } from '../../domain/Session';

export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}
    register = async(request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { username, password, confirmPassword } =
                request.body as User;

            if (!username || !password || !confirmPassword) {
                reply
                    .status(400)
                    .send(
                        'Username, password and confirm password are required'
                    );
                return;
            }

            if (password !== confirmPassword) {
                reply.status(400).send('Passwords do not match');
                return;
            }

            const users = await this.userService.getUsers();
            const userExists = users.find((user) => user.username === username);
            if (userExists) {
                reply.status(409).send('this username is already taken');
                return;
            }

            await this.authService.registerUser(username, password);
            reply.status(201).send('User created');
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    login = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { username, password } = request.body as User;
            const user = await this.authService.authenticateUser(
                username,
                password
            );
            if (!user) throw new Error('User not found');

            const session: Session = await this.authService.createSession(user.id);
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
